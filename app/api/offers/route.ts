import { NextResponse } from 'next/server';
import { calculateRepairs, calculateTopTierARV, calculateAverageRent, calculateFinalOffer, } from '@/lib/offer-calculations';

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { address } = body;
        // JSON.stringify(NaN) → null, so guard against null explicitly
        const conditionScale = body.conditionScale != null ? body.conditionScale : 3;

        if (!address) {
            return NextResponse.json({ error: 'Por favor ingresa una dirección.' }, { status: 400 });
        }

        // Validamos que conditionScale sea un número entre 0 y 5
        const validCondition = Math.max(0, Math.min(5, Number(conditionScale)));

        const RENTCAST_KEY = process.env.RENTCAST_API_KEY;
        if (!RENTCAST_KEY) {
            return NextResponse.json({ error: 'Falta la clave de API de RentCast.' }, { status: 500 });
        }

        const headers = {
            'X-Api-Key': RENTCAST_KEY,
            'accept': 'application/json'
        };

        const encodedAddress = encodeURIComponent(address);

        // 1. Ejecutar llamadas a la API en PARALELO
        const propPromise = fetch(`https://api.rentcast.io/v1/properties?address=${encodedAddress}`, { headers });
        const avmPromise = fetch(`https://api.rentcast.io/v1/avm/value?address=${encodedAddress}`, { headers });
        const rentPromise = fetch(`https://api.rentcast.io/v1/avm/rent/long-term?address=${encodedAddress}`, { headers });

        const [propRes, avmRes, rentRes] = await Promise.all([propPromise, avmPromise, rentPromise]);

        const propData = propRes.ok ? await propRes.json() : {};
        const avmData = avmRes.ok ? await avmRes.json() : {};
        const rentData = rentRes.ok ? await rentRes.json() : {};

        // 2. Procesar datos físicos de la propiedad
        const record = Array.isArray(propData) ? propData[0] : (propData.property || propData.properties?.[0] || {});

        const sqft = Number(record.squareFootage) || 1500;
        const yearBuilt = Number(record.yearBuilt) || 0;
        const propertyType = record.propertyType || "Single Family";
        const bedrooms = Number(record.bedrooms) || 3;
        const bathrooms = Number(record.bathrooms) || 2;

        const lotSize = Number(record.lotSize) || 0;
        const garage = Number(record.garageSpaces) || 0;

        const baseAvmPrice = Number(avmData.price) || 0;
        const baseAvmRent = Number(rentData.rent) || 0;

        const salesComps = avmData.comparables || [];
        const rentComps = rentData.comparables || [];

        const arv = calculateTopTierARV(salesComps, sqft, baseAvmPrice);
        const estimatedRent = calculateAverageRent(rentComps, baseAvmRent);

        // Lógica de impuestos y seguros
        let annualTaxes = Number(record.propertyTaxes) || 0;
        if (annualTaxes === 0 && arv > 0) annualTaxes = arv * 0.02;
        const taxesMonthly = Math.round(annualTaxes / 12);

        let insuranceAnnual = Number(record.propertyInsurance) || 0;
        if (insuranceAnnual === 0 && arv > 0) insuranceAnnual = arv * 0.005;

        const repairs = calculateRepairs(sqft, yearBuilt, propertyType, validCondition);
        const lastSalePrice = Number(record.lastSalePrice) || null;
        const isDistressed = (lastSalePrice && arv > 0 && lastSalePrice < arv * 0.65) || (yearBuilt > 0 && yearBuilt < 1978);

        console.log('Offer calc (server):', {
            baseAvmPrice,
            repairCosts: repairs.total,
            netBefore70: baseAvmPrice - repairs.total,
            cashOffer: calculateFinalOffer(baseAvmPrice, repairs.total),
        });

        return NextResponse.json({
            address: record.formattedAddress || address,
            propertyType,
            bedrooms,
            bathrooms,
            sqft,
            yearBuilt,
            lotSize,
            garage,
            arv,
            baseAvmPrice,
            estimatedRent,
            repairCosts: repairs.total,
            taxesMonthly,
            annualTaxes,
            insuranceAnnual,
            isDistressed,
            conditionScale: validCondition,
            cashOffer: calculateFinalOffer(baseAvmPrice, repairs.total),
            salesCompsCount: salesComps.length,
            rentCompsCount: rentComps.length,
            recentSales: salesComps
                .filter((c: any) => c.price > 0)
                .map((c: any) => ({
                    address: c.formattedAddress || c.addressLine1 || 'Dirección no disponible',
                    price: c.price
                }))
                .slice(0, 10)
        });

    } catch (error) {
        console.error("Error en la API de análisis:", error);
        return NextResponse.json({ error: 'Ocurrió un error al analizar la propiedad desde el servidor.' }, { status: 500 });
    }
}
