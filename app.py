import os
import urllib.parse
from datetime import datetime
from typing import Any, Dict, Optional, Tuple

import requests
from dotenv import load_dotenv
from flask import Flask, Response, jsonify, render_template, request

try:
    load_dotenv()
except (PermissionError, OSError):
    # Fall back to existing environment variables if .env is not readable.
    pass

RENTCAST_PROPERTIES_URL = "https://api.rentcast.io/v1/properties"
RENTCAST_AVM_VALUE_URL = "https://api.rentcast.io/v1/avm/value"
RENTCAST_AVM_RENT_URL = "https://api.rentcast.io/v1/avm/rent/long-term"
CENSUS_API_URL = "https://api.census.gov/data/2021/acs/acs5"


def get_street_view_url(address: Optional[str]) -> Optional[str]:
    if not address:
        return None
    encoded = urllib.parse.quote(address)
    return (
        "https://maps.googleapis.com/maps/api/streetview"
        f"?size=600x300&location={encoded}&key={os.environ.get('GOOGLE_API_KEY')}"
    )


def get_census_zip(zip_code: str, census_key: str) -> Dict[str, Any]:
    if not zip_code or not census_key:
        return {}
    url = (
        f"{CENSUS_API_URL}"
        f"?get=B19013_001E,B25077_001E,B01003_001E,B25002_001E,B25003_001E,"
        f"B25064_001E,B25035_001E"
        f"&for=zip%20code%20tabulation%20area:{zip_code}"
        f"&key={census_key}"
    )
    try:
        resp = requests.get(url, timeout=10)
        data = resp.json()
        if len(data) < 2:
            return {}
        row = data[1]

        def safe_int(value: str) -> Optional[int]:
            return None if value == "-666666666" else int(value)

        census = {
            "medianHouseholdIncome": safe_int(row[0]),
            "medianHomeValue": safe_int(row[1]),
            "population": safe_int(row[2]),
            "totalHousingUnits": safe_int(row[3]),
            "ownerOccupiedUnits": safe_int(row[4]),
            "medianGrossRent": safe_int(row[5]),
            "medianYearBuilt": safe_int(row[6]),
        }
        if census["ownerOccupiedUnits"] and census["totalHousingUnits"]:
            census["ownerOccupancyRate"] = round(
                census["ownerOccupiedUnits"] / census["totalHousingUnits"] * 100, 1
            )
        return census
    except (requests.RequestException, ValueError, TypeError):
        return {}


def get_comparables(
    address: str,
    property_type: str,
    bedrooms: int,
    bathrooms: float,
    square_footage: int,
) -> list:
    headers = {"X-Api-Key": os.environ.get("RENTCAST_API_KEY")}
    search_configs = [
        {"maxRadius": 1, "daysOld": 180, "compCount": 10},
        {"maxRadius": 3, "daysOld": 365, "compCount": 10},
        {"maxRadius": 5, "daysOld": 730, "compCount": 10},
    ]
    for config in search_configs:
        try:
            params = {
                "address": address,
                "propertyType": property_type,
                "bedrooms": bedrooms,
                "bathrooms": bathrooms,
                "squareFootage": square_footage,
                "compCount": config["compCount"],
                "maxRadius": config["maxRadius"],
                "daysOld": config["daysOld"],
            }
            response = requests.get(
                RENTCAST_AVM_VALUE_URL, headers=headers, params=params, timeout=10
            )
            data = response.json()
            comps = data.get("comparables", [])
            if len(comps) >= 2:
                scored = []
                for comp in comps:
                    score = 0
                    if comp.get("bedrooms") == bedrooms:
                        score += 30
                    if comp.get("bathrooms") == bathrooms:
                        score += 20
                    comp_sqft = comp.get("squareFootage", 0)
                    if comp_sqft and square_footage:
                        diff = abs(comp_sqft - square_footage) / square_footage
                        if diff <= 0.10:
                            score += 30
                        elif diff <= 0.20:
                            score += 15
                    days_old = comp.get("daysOld", 999)
                    if days_old <= 90:
                        score += 20
                    elif days_old <= 180:
                        score += 10
                    comp["matchScore"] = score
                    comp["streetViewUrl"] = get_street_view_url(
                        comp.get("formattedAddress", "")
                    )
                    if comp.get("price") and comp.get("squareFootage"):
                        comp["pricePerSqft"] = round(
                            comp["price"] / comp["squareFootage"]
                        )
                    scored.append(comp)
                scored.sort(key=lambda x: x["matchScore"], reverse=True)
                return scored[:5]
        except Exception as exc:
            print(f"Comps error ({config['maxRadius']}mi): {exc}")
            continue
    return []


def get_rent_estimate(
    address: str,
    property_type: str,
    bedrooms: int,
    bathrooms: float,
    square_footage: int,
) -> Dict[str, Optional[float]]:
    headers = {"X-Api-Key": os.environ.get("RENTCAST_API_KEY")}
    try:
        params = {
            "address": address,
            "propertyType": property_type,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "squareFootage": square_footage,
        }
        response = requests.get(
            RENTCAST_AVM_RENT_URL, headers=headers, params=params, timeout=10
        )
        data = response.json()
        return {
            "rent": data.get("rent"),
            "rentLow": data.get("rentRangeLow"),
            "rentHigh": data.get("rentRangeHigh"),
        }
    except Exception as exc:
        print(f"Rent error: {exc}")
        return {"rent": None, "rentLow": None, "rentHigh": None}


def _calculate_repairs(
    square_footage: int,
    year_built: int,
    property_type: str,
    condition_level: int = 3,
) -> Tuple[int, float]:
    if year_built < 1950:
        base_cost = 75
    elif year_built < 1978:
        base_cost = 60
    elif year_built < 1990:
        base_cost = 40
    elif year_built < 2000:
        base_cost = 25
    else:
        base_cost = 15

    type_multipliers = {
        "Single Family": 1.0,
        "Multi-Family": 1.3,
        "Apartment": 1.3,
        "Condo": 0.6,
        "Townhouse": 0.8,
        "Mobile Home": 1.5,
        "Land": 0.0,
    }
    type_mult = type_multipliers.get(property_type, 1.0)

    condition_multipliers = {1: 0.40, 2: 0.70, 3: 1.00, 4: 1.35, 5: 1.75}
    condition_mult = condition_multipliers.get(condition_level, 1.0)

    repair_per_sqft = base_cost * type_mult * condition_mult
    total_repairs = square_footage * repair_per_sqft
    return round(total_repairs), round(repair_per_sqft, 2)


def _calculate_cash_offer(
    arv: float,
    arv_low: Optional[float],
    arv_high: Optional[float],
    repairs: float,
    property_type: str,
    year_built: int,
    last_sale_price: Optional[float],
    listing_price: Optional[float],
) -> Dict[str, Any]:
    is_distressed = (
        (last_sale_price and last_sale_price < arv * 0.65)
        or (listing_price and listing_price < arv * 0.65)
        or year_built < 1978
    )

    if property_type == "Land":
        offer = arv * 0.60
        offer_low = (arv_low * 0.60) if arv_low else offer * 0.90
        offer_high = (arv_high * 0.60) if arv_high else offer * 1.10
        strategy = "Land — Development Play"
        margin = 0.60
    elif property_type in ["Multi-Family", "Apartment"]:
        offer = (arv - repairs) * 0.70
        offer_low = ((arv_low or arv) - repairs) * 0.70
        offer_high = ((arv_high or arv) - repairs) * 0.70
        strategy = "Buy & Hold — Multi Family"
        margin = 0.70
    elif property_type == "Condo":
        offer = (arv - repairs) * 0.75
        offer_low = ((arv_low or arv) - repairs) * 0.75
        offer_high = ((arv_high or arv) - repairs) * 0.75
        strategy = "Buy & Hold — Condo"
        margin = 0.75
    elif is_distressed:
        offer = (arv - repairs) * 0.65
        offer_low = ((arv_low or arv) - repairs) * 0.65
        offer_high = ((arv_high or arv) - repairs) * 0.65
        strategy = "Fix & Flip — Distressed Property"
        margin = 0.65
    else:
        offer = (arv - repairs) * 0.70
        offer_low = ((arv_low or arv) - repairs) * 0.70
        offer_high = ((arv_high or arv) - repairs) * 0.70
        strategy = "Fix & Flip or Buy & Hold"
        margin = 0.70

    return {
        "cashOffer": max(0, round(offer)),
        "cashOfferLow": max(0, round(offer_low)),
        "cashOfferHigh": max(0, round(offer_high)),
        "strategy": strategy,
        "offerFormula": f"(ARV - Repairs) × {int(margin * 100)}%",
        "isDistressed": bool(is_distressed),
    }


app = Flask(__name__)


@app.get("/")
def index() -> Any:
    return render_template("index.html")


@app.get("/streetview")
def streetview() -> Any:
    address = (request.args.get("address") or "").strip()
    if not address:
        return "", 400

    google_key = os.getenv("GOOGLE_API_KEY", "").strip()
    if not google_key:
        return "", 404

    encoded = urllib.parse.quote(address)
    url = (
        f"{GOOGLE_STREET_VIEW_URL}?size=800x400&location={encoded}"
        f"&key={google_key}&return_error_codes=true"
    )
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        return "", response.status_code
    content_type = response.headers.get("Content-Type", "image/jpeg")
    return Response(response.content, content_type=content_type)


@app.post("/analyze")
def analyze() -> Any:
    payload = request.get_json(silent=True) or {}
    address = (payload.get("address") or "").strip()
    if not address:
        return jsonify({"error": "Please enter an address to analyze."}), 400

    rentcast_key = os.getenv("RENTCAST_API_KEY", "").strip()
    google_key = os.getenv("GOOGLE_API_KEY", "").strip()
    census_key = os.getenv("CENSUS_API_KEY", "").strip()
    if not rentcast_key:
        return jsonify({"error": "Missing RENTCAST_API_KEY"}), 500

    headers = {"X-Api-Key": rentcast_key, "accept": "application/json"}

    property_payload = requests.get(
        RENTCAST_PROPERTIES_URL, headers=headers, params={"address": address}, timeout=10
    ).json()
    record = (
        (property_payload.get("property") or property_payload.get("properties") or [{}])[0]
        if isinstance(property_payload, dict)
        else (property_payload[0] if property_payload else {})
    )

    formatted_address = record.get("formattedAddress") or record.get("address") or address
    property_type = record.get("propertyType") or "Single Family"
    bedrooms = record.get("bedrooms") or 0
    bathrooms = record.get("bathrooms") or 0
    square_footage = record.get("squareFootage") or 0
    year_built = record.get("yearBuilt") or 0
    last_sale_price = record.get("lastSalePrice")
    zip_code = record.get("zipCode") or ""

    avm_params = {
        "address": address,
        "propertyType": property_type,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "squareFootage": square_footage,
        "compCount": 10,
        "maxRadius": 1,
        "daysOld": 180,
    }
    avm_payload = requests.get(
        RENTCAST_AVM_VALUE_URL, headers=headers, params=avm_params, timeout=10
    ).json()

    arv = avm_payload.get("price")
    arv_low = avm_payload.get("priceRangeLow")
    arv_high = avm_payload.get("priceRangeHigh")

    rent_data = get_rent_estimate(
        address, property_type, bedrooms, bathrooms, square_footage
    )
    estimated_rent = rent_data.get("rent")
    rent_low = rent_data.get("rentLow")
    rent_high = rent_data.get("rentHigh")

    repair_costs, repair_per_sqft = _calculate_repairs(
        int(square_footage or 0), int(year_built or 0), property_type, 3
    )

    offer_data = _calculate_cash_offer(
        float(arv or 0),
        arv_low,
        arv_high,
        float(repair_costs),
        property_type,
        int(year_built or 0),
        last_sale_price,
        None,
    )

    street_view_url = get_street_view_url(formatted_address)
    census = get_census_zip(zip_code, census_key)
    comparables = get_comparables(
        address, property_type, bedrooms, bathrooms, square_footage
    )

    return jsonify(
        {
            "address": formatted_address,
            "propertyType": property_type,
            "isDistressed": offer_data["isDistressed"],
            "streetViewUrl": street_view_url,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "squareFootage": square_footage,
            "yearBuilt": year_built,
            "arv": arv,
            "arvLow": arv_low,
            "arvHigh": arv_high,
            "repairCosts": repair_costs,
            "repairPerSqft": repair_per_sqft,
            "estimatedRent": estimated_rent,
            "rentLow": rent_low,
            "rentHigh": rent_high,
            "cashOffer": offer_data["cashOffer"],
            "cashOfferLow": offer_data["cashOfferLow"],
            "cashOfferHigh": offer_data["cashOfferHigh"],
            "strategy": offer_data["strategy"],
            "offerFormula": offer_data["offerFormula"],
            "comparables": comparables,
            "census": census,
        }
    )


if __name__ == "__main__":
    app.run(
        debug=False,
        use_reloader=False,
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "5000")),
    )


