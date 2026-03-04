// ─── Types ────────────────────────────────────────────────────────────────────

export interface CityFaq {
    q: string
    a: string
}

export interface CitySituation {
    title: string
    description: string
}

export interface CityData {
    /** Display name used in headings and nav */
    name: string
    /** URL segment — lowercase, hyphens only. e.g. "horn-lake" */
    slug: string
    /** Full SEO <title> tag */
    seoTitle: string
    /** Meta description (keep under 160 chars) */
    seoDescription: string
    /** Main H1 on the hero */
    heroTitle: string
    /** Paragraph below the H1 */
    heroSubtitle: string
    /**
     * Optional longer introductory paragraph shown in the hero.
     * If omitted a generic default is shown.
     */
    intro?: string
    /**
     * Bullet benefits shown in the benefits section.
     * If omitted the generic site-wide benefits are used.
     */
    benefits?: string[]
    /**
     * Situation cards (e.g. "Damaged home", "Problem tenants").
     * If omitted the generic default situations are used.
     */
    situations?: CitySituation[]
    /**
     * City-specific FAQ items.
     * If omitted a set of sensible defaults is shown.
     */
    faqs?: CityFaq[]
    /**
     * "Why Choose Us" bullet cards.
     * Each has a title and short description.
     * If omitted, generic defaults are used.
     */
    whyChooseUs?: { title: string; description: string }[]
    /**
     * "How We're Different" feature cards.
     * If omitted, generic defaults are used.
     */
    differences?: { title: string; description: string }[]
    /**
     * Step-by-step process cards (Initial Consultation → Closing).
     * If omitted, a 4-step default is shown.
     */
    processSteps?: { title: string; description: string }[]
    /**
     * Image shown in the right column of the benefits section.
     * Use a path relative to /public, e.g. "/images/memphis-house.jpg".
     * If omitted, no image is rendered.
     */
    benefitsImage?: string
}

export interface StateData {
    state: string
    stateSlug: string
    cities: CityData[]
}

// ─── Data ────────────────────────────────────────────────────────────────────
// To add a new city: add a CityData object inside the matching state's
// `cities` array (or create a new StateData object for a new state).
// The route /we-serve/[stateSlug]/[slug]/ resolves and generates automatically.

export const citiesData: StateData[] = [
    {
        state: "Tennessee",
        stateSlug: "tennessee",
        cities: [
            {
                name: "Bartlett",
                slug: "bartlett",
                seoTitle: "Sell My House Fast In Bartlett For Cash | Spencer Buys Houses",
                seoDescription:
                    "Get a fair cash offer from a trusted cash home buyer in Bartlett. Fast closings, no fees, sell as-is. Call (901) 621-8799.",
                heroTitle: "Sell Your House Fast In Bartlett — For Cash, No Hassle, No Fees",
                heroSubtitle:
                    "We buy houses in Bartlett for cash – same-day offers, 7-day closings, and zero commissions.",
                intro: `Whether you are stressed about a slow sale or facing a tough situation, Spencer Buys Houses offers a fast, fair solution. Spencer Buys Houses is a trusted Memphis-area home buyer serving Bartlett homeowners. We provide same-day cash offers to eliminate delays and sell your house in as little as 7 days. There are no realtor fees, no hidden costs, and no last-minute surprises – you keep 100% of the cash. As your local Bartlett, TN cash home buyers, we know the community and the market inside-out so you can be confident in our straightforward, stress-free process.`,
                benefits: [
                    "Same-day cash offers — no waiting weeks for a response.",
                    "Close in as little as 7 days — or on your own schedule.",
                    "No fees, no commissions — keep 100% of the proceeds.",
                    "Sell as-is — no repairs, cleaning, or staging required.",
                    "Local Bartlett & Memphis market expertise.",
                    "Guaranteed cash sale — no financing fall-throughs.",
                ],
                situations: [
                    {
                        title: "Damaged or distressed home",
                        description: "Fire, flood, mold, or storm damage? We buy your house as-is — no matter the condition.",
                    },
                    {
                        title: "Problem tenants or squatters",
                        description: "We take properties with difficult tenants or squatters off your hands — solving landlord headaches fast.",
                    },
                    {
                        title: "Facing foreclosure",
                        description: "Behind on payments or facing auction? A quick cash sale can stop foreclosure in its tracks.",
                    },
                    {
                        title: "Inherited property",
                        description: "Dealing with a probate home you don't want to manage? We make it simple and fast.",
                    },
                ],
                benefitsImage: "/var-a-exterior.jpg",
                faqs: [
                    {
                        q: "Will I have to move out immediately after the sale?",
                        a: "Not necessarily. We are flexible — you choose a move-out date that works for you.",
                    },
                    {
                        q: "Can you help if I'm behind on taxes or mortgage payments?",
                        a: "Absolutely. Many homeowners reach out when struggling financially. We step in quickly, without judgment.",
                    },
                    {
                        q: "What types of properties do you buy in Bartlett, TN?",
                        a: "We buy single-family homes, duplexes, inherited properties, vacant homes, fire-damaged houses, and more.",
                    },
                ],
            },
        ],
    },
    {
        state: "Mississippi",
        stateSlug: "mississippi",
        cities: [
            {
                name: "Hernando",
                slug: "hernando",
                seoTitle: "Sell My House Fast In Hernando For Cash | Spencer Buys Houses",
                seoDescription:
                    "Get a fair cash offer from a trusted cash home buyer in Hernando. Fast closings, no fees, sell as-is. Call (901) 621-8799.",
                heroTitle: "Sell Your House Fast In Hernando — For Cash, No Hassle, No Fees",
                heroSubtitle:
                    "We buy houses in Hernando for cash – same-day offers, 7-day closings, and zero commissions.",
                intro: `Whether you are stressed about a slow sale or facing a tough situation, Spencer Buys Houses offers a fast, fair solution. Spencer Buys Houses is a trusted Memphis-area home buyer serving Bartlett homeowners. We provide same-day cash offers to eliminate delays and sell your house in as little as 7 days. There are no realtor fees, no hidden costs, and no last-minute surprises – you keep 100% of the cash. As your local Bartlett, TN cash home buyers, we know the community and the market inside-out so you can be confident in our straightforward, stress-free process.`,
                benefits: [
                    "Same-day cash offers — no waiting weeks for a response.",
                    "Close in as little as 7 days — or on your own schedule.",
                    "No fees, no commissions — keep 100% of the proceeds.",
                    "Sell as-is — no repairs, cleaning, or staging required.",
                    "Local Bartlett & Memphis market expertise.",
                    "Guaranteed cash sale — no financing fall-throughs.",
                ],
                situations: [
                    {
                        title: "Damaged or distressed home",
                        description: "Fire, flood, mold, or storm damage? We buy your house as-is — no matter the condition.",
                    },
                    {
                        title: "Problem tenants or squatters",
                        description: "We take properties with difficult tenants or squatters off your hands — solving landlord headaches fast.",
                    },
                    {
                        title: "Facing foreclosure",
                        description: "Behind on payments or facing auction? A quick cash sale can stop foreclosure in its tracks.",
                    },
                    {
                        title: "Inherited property",
                        description: "Dealing with a probate home you don't want to manage? We make it simple and fast.",
                    },
                ],
                benefitsImage: "/var-a-exterior.jpg",
                faqs: [
                    {
                        q: "Will I have to move out immediately after the sale?",
                        a: "Not necessarily. We are flexible — you choose a move-out date that works for you.",
                    },
                    {
                        q: "Can you help if I'm behind on taxes or mortgage payments?",
                        a: "Absolutely. Many homeowners reach out when struggling financially. We step in quickly, without judgment.",
                    },
                    {
                        q: "What types of properties do you buy in Bartlett, TN?",
                        a: "We buy single-family homes, duplexes, inherited properties, vacant homes, fire-damaged houses, and more.",
                    },
                ],
            },
        ],
    },
]

export function findCity(stateSlug: string, citySlug: string) {
    const state = citiesData.find((s) => s.stateSlug === stateSlug)
    if (!state) return null
    const city = state.cities.find((c) => c.slug === citySlug)
    if (!city) return null
    return { state, city }
}

/** Returns every [state, city] slug pair — consumed by generateStaticParams */
export function getAllCitySlugs() {
    return citiesData.flatMap((s) =>
        s.cities.map((c) => ({ state: s.stateSlug, city: c.slug }))
    )
}
