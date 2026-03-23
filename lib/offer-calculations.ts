/**
 * offer-calculations.ts
 *
 * Single source of truth for every calculation that produces a cash offer.
 * Both the API route (offers/route.ts) and the client form import from here,
 * so any formula change only needs to happen in one place.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Comparable {
    price: number;
    squareFootage?: number;
    [key: string]: unknown;
}

export interface RepairResult {
    /** Total estimated repair cost in dollars */
    total: number;
    /** Cost per square foot used */
    perSqft: number;
}

// ---------------------------------------------------------------------------
// Repair cost calculation
// conditionScale: 0 = Move-in ready / just remodeled  →  5 = Major rehab
// ---------------------------------------------------------------------------

export function calculateRepairs(
    sqft: number,
    yearBuilt: number,
    propertyType: string,
    conditionScale: number = 3
): RepairResult {
    let baseCost = 15; // base cost per sqft

    if (yearBuilt > 0) {
        if (yearBuilt < 1950) baseCost = 75;
        else if (yearBuilt < 1978) baseCost = 60;
        else if (yearBuilt < 1990) baseCost = 40;
        else if (yearBuilt < 2000) baseCost = 25;
    }

    const typeMultipliers: Record<string, number> = {
        "Single Family": 1.0,
        "Multi-Family": 1.3,
        Apartment: 1.3,
        Condo: 0.6,
        Townhouse: 0.8,
        "Mobile Home": 1.5,
        Land: 0.0,
    };

    // 0 = No repairs  |  3 = Average wear & tear (base)  |  5 = Full gut rehab
    const conditionMultipliers: Record<number, number> = {
        0: 0.0,  // Move-in ready / recently remodeled
        1: 0.3,  // Light cosmetic (paint, touch-ups)
        2: 0.6,  // Minor repairs (carpet, fixtures)
        3: 1.0,  // Average / normal wear — base multiplier
        4: 1.5,  // Heavy work (kitchen/bath, roof)
        5: 2.0,  // Major rehab / structural / gut
    };

    const typeMult = typeMultipliers[propertyType] ?? 1.0;
    const conditionMult =
        conditionMultipliers[conditionScale] !== undefined
            ? conditionMultipliers[conditionScale]
            : 1.0;

    const repairPerSqft = baseCost * typeMult * conditionMult;

    return {
        total: Math.round(sqft * repairPerSqft),
        perSqft: Number(repairPerSqft.toFixed(2)),
    };
}

// ---------------------------------------------------------------------------
// ARV — uses top-tier (top 25 %, max 3) sold comparables
// ---------------------------------------------------------------------------

export function calculateTopTierARV(
    comparables: Comparable[],
    subjectSqft: number,
    fallbackPrice: number
): number {
    if (!comparables || comparables.length === 0 || subjectSqft === 0)
        return fallbackPrice;

    const validComps = comparables
        .filter((c) => c.price > 0 && (c.squareFootage ?? 0) > 0)
        .map((c) => ({ ...c, pricePerSqft: c.price / c.squareFootage! }));

    if (validComps.length === 0) return fallbackPrice;

    validComps.sort((a, b) => b.pricePerSqft - a.pricePerSqft);

    const topCount = Math.max(1, Math.min(3, Math.ceil(validComps.length * 0.25)));
    const topComps = validComps.slice(0, topCount);

    const avgTopPricePerSqft =
        topComps.reduce((acc, c) => acc + c.pricePerSqft, 0) / topComps.length;

    return Math.round(avgTopPricePerSqft * subjectSqft);
}

// ---------------------------------------------------------------------------
// Rent estimate — simple average of rent comparables
// ---------------------------------------------------------------------------

export function calculateAverageRent(
    comparables: Comparable[],
    fallbackRent: number
): number {
    if (!Array.isArray(comparables) || comparables.length === 0)
        return fallbackRent;

    const validRents = comparables
        .map((c) => Number(c?.price))
        .filter((p) => !isNaN(p) && p > 0);

    if (validRents.length === 0) return fallbackRent;

    return Math.round(validRents.reduce((acc, p) => acc + p, 0) / validRents.length);
}

// ---------------------------------------------------------------------------
// Final cash offer  →  70% rule:  (RentCast AVM price − repairs) × 0.70
// ---------------------------------------------------------------------------

export function calculateFinalOffer(avmPrice: number, repairCosts: number): number {
    return Math.max(0, Math.round((avmPrice - repairCosts) * 0.7));
}
