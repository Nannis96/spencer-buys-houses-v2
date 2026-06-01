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
    /**
     * Image used in the hero/background for this city page.
     * Path is relative to `/public`, e.g. "/background-we-serve.webp".
     * If omitted a per-page fallback can be used.
     */
    heroImage?: string
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
                name: "Germantown",
                slug: "germantown",
                seoTitle: "Sell Your House Fast In Germantown For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Gemantown!",
                heroTitle: "Sell Your House Fast In Germantown For Cash",
                heroSubtitle: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Gemantown!",
                intro: "If you’re looking to sell your house fast in Germantown, Spencer Buys Houses is your trusted local solution. We understand that selling a home can be stressful and time-consuming, but it doesn’t have to be. As experienced cash home buyers in Memphis and Germantown, we make the process quick and easy, offering a fair cash price for your property, no matter its condition.",
                benefits: [
                    "Fast and simple procedure: Skip the existing old way of selling homes. Our process is simple and fast. There is no need to list, platform, or wait for buyers.",
                    "No repair or renewal: We buy a house in Germantown for cash, as you save time and money on repairs.",
                    "Avoid Realtor Fees and Commissions: One of the benefits of selling your house to Spencer Buys Homes is that there are no hidden fees or agent commissions.",
                    "Local expertise and market knowledge: As a local company, we understand the Germantown and Memphis Housing Markets. Our extensive knowledge allows us to make competitive, fair proposals based on existing market conditions.",
                    "No fee or commission: Unlike traditional home sales, we do not charge any fee or commission. You will get the full cash proposal amount without deduction or hidden costs",
                    "Family-owned, customer-focused service: Being a family-owned business means that we care about our community. We treat the owner of every household with respect and work to provide personal solutions to your unique situation.",
                    "Simple Contract: We make selling easy with easy paperwork. At Spencer Buys Houses, we give you a clear and easy-to-understand agreement."
                ],
                situations: [
                    {
                        title: "Inherited Property? No Problem",
                        description: "If you have inherited any property that you do not want to sell, we will buy it quickly for cash and make this process easy."
                    },
                    {
                        title: "Facing Foreclosure or Financial Hardship",
                        description: "We work with the owners of the households that need to avoid financial conditions. A quick cash sales can help you gain control."
                    },
                    {
                        title: "Selling Due to Divorce or Relocation",
                        description: "If you need to sell your house fast due to a divorce or job relocation, Spencer Buys Houses can offer you a quick cash offer for your house."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_1.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "How can I sell my house fast in Germantown?",
                        a: "You can sell your home fast in Germantown easily with Spencer Buys We provide a quick and easy procedure that includes a free walk-through, no-objection cash offer, and rapid closing within a few days."
                    },
                    {
                        q: "Why should I choose Spencer Buys Houses over other cash buyers?",
                        a: "We are a local, family-owned company with knowledge of the Germantown and Memphis markets. We provide fair cash offers, handle all the paperwork, and never charge fees or commissions."
                    },
                    {
                        q: "What types of properties does Spencer Buys Houses purchase?",
                        a: "We buy all types of properties, including single-family homes, multi-family units, townhomes, and condos. We buy houses in any condition, whether they need repairs or are move-in ready."
                    },
                    {
                        q: "How quickly can I close on my house sale?",
                        a: "We can close in as little as 7 days, depending on your schedule and needs."
                    },
                    {
                        q: "Can Spencer Buys Houses help if I’m facing foreclosure?",
                        a: "Yes, we specialize in helping homeowners avoid foreclosure by offering a fast cash sale solution."
                    }
                ]
            },
            {
                name: "Hickory Hill",
                slug: "hickory-hill",
                seoTitle: "Sell My House Fast In Hickory Hill For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House for Cash in Hickory Hill with Spencer Buys Houses",
                heroSubtitle: "Spencer Buys Houses is a family-owned real estate expert who helps owners sell their houses for cash and without any stress.",
                intro: "Spencer Buys Houses is a family-owned real estate expert who helps owners sell their houses for cash and without any stress. We understand the Hickory Hill and Memphis real estate markets from the past many years. At Spencer Buys Houses, we purchase houses in any condition whether it is an old mom’s house, fire damaged, or want to sell due to job transfer. We can provide you with an honest price based on the current market condition.",
                benefits: [
                    "Sell ​​as is: We buy a house under any circumstances-no repair or cleaning is required.",
                    "Flexible closing: You choose the closing date that suits your schedule.",
                    "No demonstrations or open houses: Leave trouble and enjoy private sales without any interruption.",
                    "Local market knowledge and competitive offer: As a local market expert in Hickory Hill we understand the homeowner’s problems while selling their inherited house. We provide honest, competitive cash offers primarily based on actual marketplace value.",
                    "Family-Owned and Customer-Focused: As a family-owned business, we value relationships. Our purpose is to offer personalized support and solutions that give you the results you want.",
                    "No agent costs, no hidden prices: Selling with us makes the process easy for homeowners, we do not charge fees or commissions.",
                    "Easy and Transparent Process : We keep things easy with clear contracts and a trouble-free method. Spencer Buys Houses makes promoting your house short and clean."
                ],
                situations: [
                    {
                        title: "Inherited assets",
                        description: "If you’re dealing with financial issues, have inherited assets you don’t want, or just need to promote rapidly, we’re here to help."
                    },
                    {
                        title: "Water or fire damage",
                        description: "No need to fix anything weather it’s water damage or fire damage— we make the procedure easy."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_2.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Do I need to make any repairs before selling my house in Hickory Hill?",
                        a: "No! At Spencer Buys Houses, we buy houses in Hickory Hill as-is — no repairs, no cleaning, no hassle. Whether your house has water damage, fire damage, or structural issues, we’ll handle it."
                    },
                    {
                        q: "Why Are Cash Offers Better with Spencer Buys Houses?",
                        a: "With Spencer Buys Houses, you can close in as little as 7 days or choose a date that works best for you. We handle the paperwork to make the process smooth and simple."
                    },
                    {
                        q: "How is the cash offer amount determined?",
                        a: "We completely check your property based on its condition, location, and current market price. After checking each prospect we will provide a fair and competitive offer."
                    },
                    {
                        q: "What is the best way to sell a house by owner?",
                        a: "To sell a house by owner, first of all, set a fair price by checking similar homes in your area. Take clear photos list your home online and share it on social media so that buyers can find that listing easily."
                    },
                    {
                        q: "Do I need a lawyer if I sell my house for cash in Hickory Hill?",
                        a: "Yes, we specialize in helping homeowners avoid foreclosure by offering a fast cash sale solution."
                    }
                ]
            },
            {
                name: "Cordova",
                slug: "cordova",
                seoTitle: "Sell Your House Fast In Cordova For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House Fast In Cordova For Cash, with Spencer Buys Houses",
                heroSubtitle: "Hey, I’m Spencer, We buy houses in Cordova for cash.",
                intro: "Hey, I’m Spencer, We buy houses in Cordova for cash. If you are in a situation where you need to sell quickly, maybe the house needs repairs, you have inherited a property you don’t want, or life just threw you a curveball, we get it. Things happen. I have helped a lot of people in the same boat. Cordova isn’t just a place I work, it’s home. We know how stressful it can feel when your house is just sitting there, costing you time and money. The good news? You don’t need to fix anything, clean it up, or even deal with realtors. If you want to sell fast, I’ll make a fair cash offer and take care of the rest.",
                benefits: [
                    "Local Connections in Cordova: Being part of the Cordova community means we understand the local market and your needs.",
                    "Stress-Free Process: Forget repairs, cleaning, or staging — we buy houses as-is, no questions asked.",
                    "Reliable Cash Offers: Our fair offers are based on market value and local knowledge.",
                    "Flexible Closing Dates: Whether you’re ready to move now or need more time, we adapt to your schedule."
                ],
                situations: [
                    {
                        title: "House needs repairs",
                        description: "If you are in a situation where you need to sell quickly, maybe the house needs repairs..."
                    },
                    {
                        title: "Inherited property",
                        description: "...you have inherited a property you don’t want, or life just threw you a curveball, we get it."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_3.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Is Spencer Buys Houses a local Cordova company?",
                        a: "Yes! We’re rooted in Frayser and deeply understand the local market, ensuring a personalized and efficient process."
                    },
                    {
                        q: "How do I start the process of selling my house fast?",
                        a: "Simply call (901)-979-9848 or visit spencerbuyshouses.com for a no-obligation cash offer. We’ll guide you every step of the way!"
                    }
                ]
            },
            {
                name: "Whitehaven",
                slug: "whitehaven",
                seoTitle: "Sell My House Fast In Whitehaven For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Whitehaven!",
                heroTitle: "Sell Your House Fast in Whitehaven – No Strings Attached",
                heroSubtitle: "We’ll Buy Your House Fast in Whitehaven – No Strings Attached",
                intro: "Got a house that’s been sitting on the market? Behind on payments? Dealing with a tough life change? We’ll pay cash, cover every fee , and close in 7 days or less , guaranteed. Whether you’re facing foreclosure, dealing with probate, or just ready to move on, Spencer Buys Houses is here to help you sell fast, for cash, without the stress.",
                benefits: [
                    "Same-day cash offers (no waiting around)",
                    "Zero fees, zero commissions (keep more of your money).",
                    "Local experts who know Whitehaven’s market inside out",
                    "7-day closings (or whenever you need to move)",
                    "We buy houses as-is, no matter the condition or reason you’re selling."
                ],
                situations: [
                    {
                        title: "Facing foreclosure",
                        description: "Life doesn’t always go as planned, and sometimes you need a quick solution."
                    },
                    {
                        title: "Going through a divorce",
                        description: "We get it , selling a house in Whitehaven when you are already drowned seems like one more thing on your plate."
                    },
                    {
                        title: "Dealing with probate or inherited properties",
                        description: "That’s why we are here. No judgment, no pressure, just a suitable offer and faster off."
                    },
                    {
                        title: "Experiencing job loss or relocation",
                        description: "Life doesn’t always go as planned, and sometimes you need a quick solution."
                    },
                    {
                        title: "Struggling with problem tenants or squatters",
                        description: "We work with homeowners in all kinds of situations..."
                    },
                    {
                        title: "Behind on taxes, mortgage payments, or HOA fees",
                        description: "We get it , selling a house in Whitehaven when you are already drowned seems like one more thing on your plate."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_4.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Are there any fees or commissions?",
                        a: "Absolutely not. When you sell to Spencer Buys Houses, there are no hidden fees, commissions, or closing costs. The price we offer is exactly what you’ll receive—no surprises, no deductions."
                    },
                    {
                        q: "How soon can I sell my house?",
                        a: "We can close at your home for 7 days, but we are flexible. If you need more time, we can work with your schedule whenever you are most convenient for you. Our goal is to make the process as fast and stress-free as possible."
                    },
                    {
                        q: "How do I know that your proposal is appropriate?",
                        a: "Our offers are based on the current market value of your property, taking into account its location, size, and position. As a Memphis native, we have a deep understanding of the local market, which allows us to provide competitive and fair proposals. We encourage you to do our research or compare our proposal with others to feel confident in your decision."
                    },
                    {
                        q: "What types of properties do you buy?",
                        a: "We buy all types of residential properties, including single-family homes, townhouses, condos, and multi-family units. Whether your house is occupied, vacant, or needs repairs, we’re interested."
                    },
                    {
                        q: "How long have you been buying houses in Whitehaven, Memphis?",
                        a: "For a decade, Spencer Buys Houses has been helping homeowners in Whitehaven navigate tough situations by providing fast, fair cash offers for their properties. Our local expertise and experience in the Memphis market ensure a smooth and efficient selling process."
                    }
                ]
            },
            {
                name: "Berclair",
                slug: "berclair",
                seoTitle: "Sell My House Fast In Berclair For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House Fast in Berclair for Cash – For Cash, No Hassle",
                heroSubtitle: "We buy houses in Berclair – as-is, for cash, no strings attached.",
                intro: "If you are looking to get out from under pressure whether it’s because of foreclosure, divorce, job loss, or just plain frustration we are here to help. No repairs. No fees. Just a fair offer and a fast, simple process. Spencer Buys Houses is a local Memphis company that cuts through the red tape and buys houses directly for cash. No middlemen. No months of waiting. Just a fair offer and a fast sale, no matter what shape your house is in.",
                benefits: [
                    "No Closing Costs or Commissions: We pay those, not you.",
                    "Locally Owned and Operated: We know Berclair. We care about our neighbors.",
                    "Zero Pressure, Always Honest: If we’re not your best option, we’ll tell you straight up.",
                    "STEP 3: You Pick the Closing Day: We work on your schedule. Want to close in 7 days? We can do that."
                ],
                situations: [
                    {
                        title: "Behind on taxes or mortgage",
                        description: "Many of the homeowners we help are behind on payments, facing foreclosure, or unsure where to turn next. We step in and take care of everything so you can get relief fast."
                    },
                    {
                        title: "Squatters or tenant issues",
                        description: "We’ve helped people sell homes with eviction issues, trouble tenants, and even squatters. We’ll handle the property and give you a clean, fresh start."
                    },
                    {
                        title: "Inherited property",
                        description: "Inherited property can be a burden, especially if it needs repairs or is costing you money. We buy inherited homes fast and for cash, so you can walk away without lifting a finger."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_5.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Do you buy houses in Berclair?",
                        a: "Yes, we do — and we’re right here in Memphis. We specialize in buying homes in Berclair and the surrounding areas. Whether your house needs work, you’re behind on payments, or you just want out fast, we can help."
                    },
                    {
                        q: "Can you still buy my house if I’m behind on taxes or mortgage?",
                        a: "Yes, we can. Many of the homeowners we help are behind on payments, facing foreclosure, or unsure where to turn next. We step in and take care of everything so you can get relief fast."
                    },
                    {
                        q: "What if my house has squatters or tenant issues?",
                        a: "That’s more common than you’d think, especially in Berclair. We’ve helped people sell homes with eviction issues, trouble tenants, and even squatters. We’ll handle the property and give you a clean, fresh start."
                    },
                    {
                        q: "Can you help if I inherited a house in Berclair but don’t want it anymore?",
                        a: "Of course. Inherited property can be a burden, especially if it needs repairs or is costing you money. We buy inherited homes fast and for cash, so you can walk away without lifting a finger."
                    }
                ]
            },
            {
                name: "Bartlett",
                slug: "bartlett",
                seoTitle: "Sell My House Fast In Bartlett For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Bartlett!",
                heroTitle: "Sell Your House Fast in Bartlett — For Cash, No Hassle, No Fees",
                heroSubtitle: "We buy houses in Bartlett for cash – same-day offers, 7-day closings, and zero commissions",
                intro: "Whether you are stressed about a slow sale or facing a tough situation, Spencer Buys Houses offers a fast, fair solution. Spencer Buys Houses is a trusted Memphis-area home buyer serving Bartlett homeowners. We provide same-day cash offers to eliminate delays and sell your house in as little as 7 days. There are no realtor fees, no hidden costs, and no last-minute surprises – you keep 100% of the cash. As your local Bartlett, TN cash home buyers, we know the community and the market inside-out so you can be confident in our straightforward, stress-free process.",
                benefits: [
                    "Get Cash Fast. We specialize in quick closings – often in 7 days or less. Unlike listing your home (which can take months), you get cash and move on in days.",
                    "No Fees or Commissions. Sell directly to us and keep every dollar. We charge zero realtor commissions or hidden fees.",
                    "Sell As-Is. Don’t stress about repairs, upgrades, or cleaning. We buy houses in any condition.",
                    "Local Expertise. We’re Bartlett/Memphis locals who understand the market. We give competitive, transparent cash offers based on real local data; you won’t get lowballed.",
                    "Stress-Free Process. No open houses, no waiting, no hassle. We handle all the paperwork, clean-up, and details, so you don’t have to.",
                    "Guaranteed Cash Sale. Once you accept our offer, it’s a done deal. No financing fall-through risk or negotiations – you get 100% of the cash on closing day."
                ],
                situations: [
                    {
                        title: "Damaged or distressed home",
                        description: "Fire, flood, mold, or other damage? We still buy your house for cash, no matter the condition or needed repairs."
                    },
                    {
                        title: "Problem tenants or squatters",
                        description: "We take properties with difficult tenants or squatters off your hands, solving landlord headaches."
                    },
                    {
                        title: "Financial hardship",
                        description: "If you’re behind on payments or getting notice of an auction, we can stop the foreclosure with a cash sale."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_6.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Will I have to move out immediately after the sale?",
                        a: "Not necessarily. We’re flexible. You can choose your move-out date — whether it’s right away or a few weeks later — whatever works best for you."
                    },
                    {
                        q: "Can you help if I’m behind on taxes or mortgage payments?",
                        a: "Absolutely. Many homeowners reach out when they’re struggling financially. We step in to make sure you get the cash you need, fast, without judgment."
                    },
                    {
                        q: "What types of properties do you buy in Bartlett, TN?",
                        a: "We buy all types of residential properties – single-family homes, duplexes, inherited properties, vacant homes, fire-damaged houses, and more. If you’ve got a house in Bartlett you want to sell, we want to make an offer"
                    }
                ]
            },
            {
                name: "Collierville",
                slug: "collierville",
                seoTitle: "Sell My House Fast In Collierville For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your Collierville Home Fast for Cash – Get Cash for Your Collierville Home",
                heroSubtitle: "Get a Same-Day Cash Offer from a Local Team You Can Trust. Close in 7 Days—Or When You’re Ready.",
                intro: "We are a Memphis-based team that originated in the mid-south and grew up, and we know how to face hard moments. Whether it is a house that you have inherited or a property you cannot keep. We are here to help the owners of the house in Collierville and the Greater Memphis area find a way. We buy a cash house, offering cash offers on the same day and faster than 7 days. No real commission, no hidden fees, just a direct solution that puts cash in your pocket and lets you move forward.",
                benefits: [
                    "Speedy Process: We move fast, so you can move on. Offers in hours, closings in days.",
                    "Zero Costs: No realtor fees, no commissions, no closing costs. You keep more of your money.",
                    "Local Know-How: We’re Memphis locals who understand Collierville’s neighborhoods and challenges.",
                    "We’ve Been There For Guidance: Spencer’s team has helped hundreds of Memphis families through tough times, and we’ll help you, too.",
                    "We Show Up: Unlike online ‘We Buy Houses in Collierville’ scams, we’re local, trusted real estate consultants who were featured on WREG Live at 9."
                ],
                situations: [
                    {
                        title: "I’m drowning in bills",
                        description: "Are you behind on payments or taxes? We’ll take it off your hands—no questions asked."
                    },
                    {
                        title: "This house is a headache",
                        description: "Fire damage? Mold? Tenants from hell? We buy “as-is."
                    },
                    {
                        title: "I just want to know",
                        description: "Divorce, job loss, or relocation? Let’s free you from the burden."
                    },
                    {
                        title: "It’s not even mine",
                        description: "Inherited property? Probate stress? We’ll handle the legal knots."
                    },
                    {
                        title: "No one’s buying",
                        description: "Expired listing? Vacant? We’ll pay cash where others won’t."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_7.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Can you help if I’m facing foreclosure in Collierville or Whitehaven?",
                        a: "Foreclosure notices from Shelby County courts can feel like a ticking clock. We’ve helped homeowners from Cordova to South Memphis stop foreclosure in its tracks with quick cash offers. If you’re behind on payments on a house off Poplar Pike or Millbranch Road, we can buy your home fast, helping you settle debts and protect your credit. Let’s talk before the stress piles up."
                    },
                    {
                        q: "What types of homes do you buy in the Memphis area?",
                        a: "We buy all kinds of properties across the 901—single-family homes in Collierville’s Schilling Farms, condos near Overton Square, townhomes in Whitehaven, or even multi-family units in Frayser. Vacant, tenant-occupied, or damaged by Memphis’s humid summers? We’re interested, whether it’s off Getwell Road or near the Germantown border."
                    },
                    {
                        q: "How do you decide on a cash offer for my Collierville or Memphis home?",
                        a: "We’re steeped in the Memphis market, from the upscale homes of Collierville’s Bray Station to the working-class neighborhoods of Whitehaven. We look at your home’s condition, its spot (like ZIP codes 38017 or 38116), and local trends, like how fast homes move near Houston Levee or Holmes Road. Our offers are fair, straightforward, and built for the 901."
                    },
                    {
                        q: "What if I have tenants or squatters in my Whitehaven or Memphis property?",
                        a: "Problem tenants or squatters in areas like Orange Mound or South Memphis can turn homeownership into a headache. We buy properties as-is, even with folks still inside. You won’t need to deal with evictions or tenant disputes on a house off Winchester Road or Park Avenue—we handle it all after closing."
                    }
                ]
            },
            {
                name: "Millington",
                slug: "millington",
                seoTitle: "Sell My House Fast In Millington For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House Fast in Millington – Without the Stress",
                heroSubtitle: "We buy houses for cash Memphis, no matter the condition. Skip the hassle, agents, or repairs.",
                intro: "Need to sell your home fast in Millington? Whether you are behind payments, dealing with hard life changes, or simply ready to move forward, we are here to make the process simple, respectable, and fast. At Spencer Buys Homes, we buy houses for cash in Millington and more and more Memphis area – no matter whether the situation or your situation. We are a family-run business right here in Memphis, Tennessee, with deep roots in Millington and the Mid-South.",
                benefits: [
                    "A same-day cash offer, no fees or commissions",
                    "Closing as fast as 7 days",
                    "We buy your Millington home as-is",
                    "Real people who understand the stress you’re facing",
                    "Sell It As-Is: Leaky roof or busted pipes? We buy Millington homes in any condition, so you don’t have to touch a hammer.",
                    "No Money Out of Pocket: Zero fees, zero commissions. The cash offer we give you is what you take home.",
                    "Millington Homeowner Experts: From Navy Road to Singleton Parkway, we know Millington’s market and what makes this town tick."
                ],
                situations: [
                    {
                        title: "Foreclosure Pressure",
                        description: "Bank notices piling up? We’ll buy your Millington home fast to stop foreclosure in its tracks."
                    },
                    {
                        title: "Inherited Property",
                        description: "Stuck with a house you don’t want? We’ll take it off your hands, probate and all, in Memphis or Millington."
                    },
                    {
                        title: "Job Loss or Relocation",
                        description: "New job in another state, or hit a financial rough patch? We’ll get you cash to move on from Millington."
                    },
                    {
                        title: "Fire Damage or Mold",
                        description: "Are repairs too expensive? We buy Millington homes as-is, no matter the damage."
                    },
                    {
                        title: "Behind on Payments or Taxes",
                        description: "Feeling the squeeze? Our cash offer can help you catch up and breathe easier."
                    },
                    {
                        title: "Expired Listings",
                        description: "Realtor couldn’t sell your Millington house? We’ll step in with a fast, fair cash deal."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_8.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "Can you help if I’m facing foreclosure in Millington?",
                        a: "Foreclosure notices from Shelby County courts can feel like a ticking clock. We’ve helped homeowners from Cordova to South Memphis stop foreclosure in its tracks with quick cash offers. If you’re behind on payments on a house off Poplar Pike or Millbranch Road, we can buy your home fast, helping you settle debts and protect your credit. Let’s talk before the stress piles up."
                    },
                    {
                        q: "What types of homes do you buy in the Memphis area?",
                        a: "We buy all kinds of properties across the 901—single-family homes in Collierville’s Schilling Farms, condos near Overton Square, townhomes in Whitehaven, or even multi-family units in Frayser. Vacant, tenant-occupied, or damaged by Memphis’s humid summers? We’re interested, whether it’s off Getwell Road or near the Germantown border."
                    },
                    {
                        q: "How do you decide on a cash offer for my Collierville or Memphis home?",
                        a: "We’re steeped in the Memphis market, from the upscale homes of Collierville’s Bray Station to the working-class neighborhoods of Whitehaven. We look at your home’s condition, its spot (like ZIP codes 38017 or 38116), and local trends, like how fast homes move near Houston Levee or Holmes Road. Our offers are fair, straightforward, and built for the 901."
                    },
                    {
                        q: "What if I have tenants or squatters in my Whitehaven or Memphis property?",
                        a: "Problem tenants or squatters in areas like Orange Mound or South Memphis can turn homeownership into a headache. We buy properties as-is, even with folks still inside. You won’t need to deal with evictions or tenant disputes on a house off Winchester Road or Park Avenue—we handle it all after closing."
                    }
                ]
            },
            {
                name: "Somerville",
                slug: "somerville",
                seoTitle: "Sell Your House Fast In Somerville For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Somerville!",
                heroTitle: "Sell Your House Fast in Somerville – With a Fair Cash Offer",
                heroSubtitle: "We buy houses for cash Somerville. A Fair Cash Offer Today, Closed in as Little as 7 Days—No Fees, No Stress",
                intro: "We are Spencer Buys Houses, a team of folks right here in Memphis who help homeowners like you sell their houses fast for cash in Somerville. Life can get messy, maybe you’re staring down foreclosure, sorting out a divorce, or just tired of dealing with a property you inherited that’s more hassle than it’s worth. We get it, and we’re here to lighten the load. Being Memphians ourselves, we know this area like the back of our hands. We’ve worked with tons of neighbors in Somerville and all around the Mid-South to get their houses sold quick and easy.",
                benefits: [
                    "Say hello: Drop us a line or fill out our short online form with a few details about your place.",
                    "Hear our offer: We’ll check it out and get back to you with a fair cash offer in 24 hours—no pressure, no catch.",
                    "Close when you’re ready: If it feels right, we’ll take care of the paperwork and close in as little as 7 days—or on your timeline.",
                    "Fast track: We can close in a week—or even sooner if you’re in a crunch.",
                    "No sweat: Three easy steps, and we handle the heavy lifting.",
                    "As-is? No problem: Skip the repairs and cleaning—we’ll take it off your hands just as it is."
                ],
                situations: [
                    {
                        title: "Sudden changes",
                        description: "Sudden job changes or a big move."
                    },
                    {
                        title: "Inherited home",
                        description: "An inherited home you don’t want to keep."
                    },
                    {
                        title: "Repairs",
                        description: "Repairs too big to handle, like water damage or worse."
                    },
                    {
                        title: "Payments or taxes",
                        description: "Payments or taxes are creeping up."
                    },
                    {
                        title: "Tenants",
                        description: "Tenants are causing headaches."
                    },
                    {
                        title: "Listings",
                        description: "Listings that didn’t pan out."
                    },
                    {
                        title: "Divorce or loss",
                        description: "Divorce or losing someone close."
                    },
                    {
                        title: "Empty houses",
                        description: "Empty houses just sitting there."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_10.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "How quickly can I sell my house in Somerville?",
                        a: "In many cases, we can make you a fair cash offer the same day you contact us—and close the deal in as little as 7 days, or on your preferred schedule. There’s no waiting for bank approvals or inspections."
                    },
                    {
                        q: "Can I sell if I have tenants or squatters?",
                        a: "Absolutely. We know dealing with tenants or squatters can be a real pain. We’ll work with you to find a way out that’s quick and fair, so you can move on."
                    },
                    {
                        q: "How do you determine the offer price?",
                        a: "We look at a few things: the condition of your house, what similar homes in your area are selling for, and recent sales nearby. Our goal is to make you a fair offer that makes sense for both of us. No lowballing, just an honest deal."
                    },
                    {
                        q: "What areas do you serve?",
                        a: "We’re Memphis folks through and through, so we know Somerville and the greater Memphis area like the back of our hand. If you’re in the Mid-South, we’re your neighbors, and we’re here to help."
                    },
                    {
                        q: "How do I get started?",
                        a: "Just reach out! Call us or head over to https://www.spencerbuyshouses.com/get-paid/ to get the ball rolling. You can even get paid for referring someone. We’re here to help, so don’t hesitate to ask if you’ve got more questions."
                    }
                ]
            },
            {
                name: "Raleigh",
                slug: "raleigh",
                seoTitle: "Sell My House Fast In Raleigh For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House for Cash in Raleigh, Tennessee, with Spencer Buys Houses",
                heroSubtitle: "Discover the charm and character of Raleigh, a pleasant community situated in the heart of Tennessee.",
                intro: "At Spencer Buys Houses, we are proud to be one of the most trusted companies that buy houses Raleigh residents guide for fast, fair, and hassle-free transactions. Whether you are selling a family home, an old mom house, or an inherited property, we streamline the process so that homeowners can focus on what matters most. At Spencer Buys Houses, we understand that life is unpredictable, and sometimes you need to sell your home quickly in Raleigh.",
                benefits: [
                    "Personalized Plan: Share your goals with Spencer Buys Houses, and we’ll craft a tailored plan to meet your unique needs.",
                    "Fast and Fair Offers: Our mission is to buy your Raleigh home quickly, providing a fair cash deal in the shortest time possible.",
                    "Stress-Free Experience: We ensure a smooth, hassle-free process from start to finish, making your home-selling journey seamless.",
                    "More Than a Transaction: At Spencer Buys Houses, we understand that selling your home is a step toward a brighter future.",
                    "Expert Service: We are committed to providing professional, knowledgeable service that brings real value to your experience."
                ],
                situations: [
                    {
                        title: "Any Situation",
                        description: "Whether facing financial difficulties, relocating, downsizing, or seeking a fresh start, Spencer Buys Houses is here to assist."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_11.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "How does Spencer Buys Houses work to sell my home fast in Raleigh?",
                        a: "At Spencer Buys Houses, we streamline the process: We handle all paperwork and pay zero fees or commissions. Share basic details about your property (no obligations). Choose your closing date (as fast as 7 days). Receive a fair cash offer within 24 hours."
                    },
                    {
                        q: "Is Spencer Buys Houses a local company?",
                        a: "Yes! We’re deeply rooted in Raleigh and understand the community’s needs. Our local expertise ensures a smooth, personalized process."
                    },
                    {
                        q: "How do I start the process of selling my house fast?",
                        a: "Simply call (901) 979 -9848 or visit spencerbuyshouses.com for a no-obligation cash offer. We’ll guide you every step of the way!"
                    }
                ]
            },
            {
                name: "Arlington",
                slug: "arlington",
                seoTitle: "Sell My House Fast In Arlington For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House for Cash in Arlington, Tennessee, Get Cash for Your Arlington House Fast",
                heroSubtitle: "If your Arlington house feels like an anchor weighing you down, we are here to lift that burden.",
                intro: "Maybe you are staring at a foreclosure notice, sorting through an inherited property, or just need to sell fast because life’s throwing curveballs. At Spencer Buys Houses, we make selling your home simple, fair, and fast with a same-day cash offer—no repairs, no realtor fees, no waiting around. We are not just another real estate business; we are your neighbors in Memphis, and we get it.",
                benefits: [
                    "Lightning-Fast Offers: We don’t make you wait—cash offers are made the same day, and closings occur in as little as a week.",
                    "No Fix-Ups Needed: From cracked foundations to outdated kitchens, we buy it as-is.",
                    "Drama-Free: No back-and-forth with buyers, no last-minute deal breakers—just a smooth sale.",
                    "No Costs, Period: What we offer is what you keep. No commissions, no closing fees."
                ],
                situations: [
                    {
                        title: "Foreclosure",
                        description: "Stop the bank from taking your house."
                    },
                    {
                        title: "Probate/Inheritance",
                        description: "Selling a loved one’s home shouldn’t be a headache."
                    },
                    {
                        title: "Divorce",
                        description: "Split the assets cleanly and move on."
                    },
                    {
                        title: "Job Loss or Relocation",
                        description: "Need cash fast? We’ve got you."
                    },
                    {
                        title: "Fire or Water Damage",
                        description: "Don’t pour money into repairs—sell as-is."
                    },
                    {
                        title: "Trouble Tenants or Squatters",
                        description: "We’ll take the problem off your hands."
                    },
                    {
                        title: "Expired Listings",
                        description: "Tired of waiting for a buyer who won’t commit?"
                    },
                    {
                        title: "Behind on Taxes or Payments",
                        description: "Avoid the stress and sell now."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_14.webp",
                heroImage: "/hickory-hill-memphis-tn-2-neighborhoodphoto.webp",
                faqs: [
                    {
                        q: "How do I sell my Arlington, TN, house to Spencer Buys Houses?",
                        a: "It’s super easy. Call us or go to spencerbuyshouses.com/get-paid and tell us about your Arlington house—whether it’s near Highway 70 or by Arlington High. We’ll check it out (no need to clean) and give you a cash offer that day. You choose when to close—as fast as 7 days or whenever you want—and get your cash."
                    },
                    {
                        q: "How quickly can I sell my Arlington, TN house?",
                        a: "Really, Fast. We can offer cash the same day you call about your Arlington home and finish the sale in 7 days. If you need more time, we’ll go at your pace."
                    },
                    {
                        q: "What kinds of Arlington houses do you buy?",
                        a: "Any kind. From beat-up homes near Forest Hill to rentals with bad tenants on Milton Wilson, we buy them all. Dealing with probate, squatters, or a failed sale in Arlington? We can help."
                    },
                    {
                        q: "How do you figure out the cash offer for my Arlington home?",
                        a: "We look at your Arlington home’s condition, where it’s at, like Shadowlawn or Village Green, and what’s happening in Arlington’s market. We give you a fair offer that fits your situation, no tricks."
                    },
                    {
                        q: "Why pick Spencer Buys Houses over an Arlington realtor?",
                        a: "Selling with a realtor in Arlington means waiting months, fixing stuff, and paying big fees. With us, you skip all that. No cleaning your Arlington home, no buyer hassles, no costs. We’re Arlington locals who know the area and want to help you fast."
                    }
                ]
            },
        ],
    },
    {
        state: "Mississippi",
        stateSlug: "mississippi",
        cities: [
            {
                name: "Byhalia",
                slug: "byhalia",
                seoTitle: "Sell My House Fast In Byhalia For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Byhalia!",
                heroTitle: "Sell Your House for Cash in Byhalia with Spencer Buys Houses",
                heroSubtitle: "Are you looking to sell your home quickly in Byhalia? If so, you are in the right place! Spencer Buys Houses, specializes in helping homeowners like you who need to sell their homes for cash in Byhalia.",
                intro: "We are here to give you a quick and easy solution. Selling your home does not have to be complicated, and we are dedicated to making the process stress-free. Call us at (901)-979-9848 or fill in our form. You can simple tell us about your property and we will ensure a quick visit to your convenience.! At Spencer Buys Houses, we sell your house fast in Byhalia, Mississippi.",
                benefits: [
                    "Local Experts in Byhalia: At Spencer Buys Houses, we focus on your needs. Whether you are selling an inherited property, an aging parent’s home, or a property due to divorce, we listen and treat you like family—not a number.",
                    "Simplified Selling Process: Skip repairs, showings, and stress. Sell your house as-is with our hassle-free approach. No fees, and no delays—just a fast, fair sale.",
                    "Flexible Closing Dates: Need to close in a week or a month? We adjust to your timeline. You’re in control, always.",
                    "Direct & Dedicated: Skip corporate bureaucracy. Our team works personally with you to craft flexible, fast solutions.",
                    "Smooth Sailing: From start to finish, we eliminate red tape, paperwork, and stress, delivering a closing that fits your life.",
                    "Ethics First: Our integrity-driven approach means we will never undervalue your home. You get transparent, competitive pricing guaranteed."
                ],
                situations: [
                    {
                        title: "Facing foreclosure, divorce, or inheriting a house?",
                        description: "We work with you, no stress."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_16.webp",
                heroImage: "/background-we-serve.webp",
                faqs: [
                    {
                        q: "Are there any hidden fees?",
                        a: "No, there are no hidden fees or commissions when you sell your house to us. The cash offer you receive is what you’ll get at closing."
                    },
                    {
                        q: "What if I’m behind on mortgage payments?",
                        a: "We can help you avoid foreclosure and settle debts."
                    },
                    {
                        q: "Do you buy rental properties or inherited homes?",
                        a: "Yes! We purchase all property types, regardless of tenants or probate."
                    }
                ]
            },
            {
                name: "Hernando",
                slug: "hernando",
                seoTitle: "Sell Your House Fast In Hernando For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Hernando!",
                heroTitle: "Sell Your House Fast in Hernando, Mississippi – We Buy Houses for Cash!",
                heroSubtitle: "Life can change unexpectedly and make selling your home a challenge in Hernando.",
                intro: "Whether you are in the middle of an unexpected shift due to a job, have financial problems, or need to sell fast in Hernando, Spencer Buys Houses will help. We are a trusted local home buyer in Hernando, Mississippi, and we take the hassle out of selling your house by making the process quick and easy for you. Let us give you a fair cash offer on your house—no repairs, no hassle. With years of experience buying homes in Hernando, Spencer Buys Houses is here to help homeowners like you. We buy houses in any condition and help you move on, on your terms.",
                benefits: [
                    "100% Cash to You: You keep 100% of the cash offer—no commissions, no hidden charges.",
                    "No Cleanup Required: We take care of repairs and updates, so you don’t have to.",
                    "Control the Process: Choose your closing date and walk away free, because we are local & Trusted home buyers.",
                    "Higher Price Offers: Local buyers, especially buyers who want to remain in the area, might be willing to pay a higher price for a home they want to live in, compared to an investor, who wants to fix it up and sell it after the repairs.",
                    "Easier Process: Local buyers, unlike remote, out-of-town buyers, will likely have some familiarity with Hernando, local regulations, and the local market, which can lead to a seamless and more efficient transaction.",
                    "Quicker Closings: Selling your house to us is simple. There are no real estate agents, no closing costs, and no hidden fees. You get a fair cash offer with no extra costs.",
                    "Investment in the Community: Selling to a local buyer instead of an investor or someone from out of town is an investment in the community."
                ],
                situations: [
                    {
                        title: "Vacant houses",
                        description: "Stop paying for an empty home."
                    },
                    {
                        title: "Houses needing repairs",
                        description: "Sell as-is—no need for repairs."
                    },
                    {
                        title: "Rental problems",
                        description: "Get rid of bad tenants and avoid costly fixes."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_19.webp",
                heroImage: "/background-we-serve.webp",
                faqs: [
                    {
                        q: "What if I need to sell my house quickly in Hernando due to life changes??",
                        a: "We understand life can be unpredictable. Whether it’s foreclosure, divorce, or a sudden relocation, we’re here to help you sell fast and move forward."
                    },
                    {
                        q: "Is Spencer Buys Houses a reputable company in Hernando?",
                        a: "Yes! We are a local, family-owned business dedicated to helping homeowners in Hernando. Our experienced team has a proven track record of successful transactions."
                    },
                    {
                        q: "Can I choose my closing date?",
                        a: "Yes! You have the flexibility to choose a closing date that suits your schedule, making the process as convenient as possible for you."
                    },
                    {
                        q: "What types of properties do you buy in Hernando, Mississippi?",
                        a: "Spencer Buys Houses makes selling your home in Hernando, Mississippi, easy and streWe buy houses in any condition, whether they need repairs, are vacant, or have tenants. There are no specific criteria—just let us know about your property!"
                    }
                ]
            },
            {
                name: "Horn Lake",
                slug: "horn-lake",
                seoTitle: "Sell Your House Fast In Horn Lake For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer in Horn Lake!",
                heroTitle: "Sell Your House for Cash in Horn Lake with Spencer Buys Houses",
                heroSubtitle: "At Spencer Buys Houses, we are real estate investors in Horn Lake, Mississippi.",
                intro: "We help locals in Horn Lake who want to sell their house fast. We pay cash for the houses we purchase and then fix the minor, and sell them. We help the house owners who want to sell their houses who want to sell their houses due to relocation. If you’re looking to sell your house fast in Horn Lake contact us for a smooth and successful transaction! At Spencer Buys Houses, we sell your house fast in Horn Lake, Mississippi.",
                benefits: [
                    "Local Expertise: We know the Horn Lake market inside and out, ensuring you get a fair price.",
                    "Decades of Experience: We have helped homeowners in Mississippi for years, solving problems like foreclosure, inherited homes, and urgent relocations.",
                    "Trusted Reputation: Check our 5-star reviews from happy sellers who’ve moved on with cash in hand.",
                    "Compassionate Support: Our team at Spencer Buys Houses provides compassionate support to guide homeowners through this process, ensuring you feel comfortable and informed.",
                    "Customized Solutions: Every homeowner’s situation is different. We pride ourselves on offering customized solutions that meet your specific needs, whether you’re looking for speed, convenience, or maximum value.",
                    "Sell in Any Condition: We buy houses in Horn Lake in any condition—old, new, damaged, or even with tenants."
                ],
                situations: [
                    {
                        title: "Relocation",
                        description: "We help the house owners who want to sell their houses who want to sell their houses due to relocation."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_21.webp",
                heroImage: "/background-we-serve.webp",
                faqs: [
                    {
                        q: "What if my house needs major repairs?",
                        a: "We buy houses in Horn Lake, Mississippi, and nearby areas like Olive Branch and DeSoto County."
                    },
                    {
                        q: "Is there any pressure to accept the offer?",
                        a: "Not at all! Our cash offer comes with no obligations, and you are free to think it over."
                    },
                    {
                        q: "What if homeowners are facing foreclosure?",
                        a: "When you sell your house to Spencer Buys Houses, we can provide a cash offer within 24 hours and close in as little as seven days if required."
                    }
                ]
            },
            {
                name: "Olive Branch",
                slug: "olive-branch",
                seoTitle: "Sell My House Fast In Olive Branch For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House for Cash in Olive Branch, with Spencer Buys Houses",
                heroSubtitle: "Life can bring unexpected changes, and if you need to sell your house quickly in Olive Branch, Spencer Buys Houses is here to help.",
                intro: "As a trusted local real estate buyer in Olive Branch, we simplify the selling process, allowing homeowners to move forward on their own timeline. Whether you’re relocating, downsizing, navigating a financial shift, or seeking a stress-free sale, we convert your property into cash—fast. With decades of experience serving Olive Branch, Mississippi, and a proven track record, our team is dedicated to supporting our community. At Spencer Buys Houses we sell your house fast in Olive Branch, Mississippi.",
                benefits: [
                    "Zero Fees, Ever: Keep 100% of your cash offer—no commissions, closing costs, or hidden charges.",
                    "We Handle the Hard Work: After purchasing your home, we take care of repairs, renovations, and maintenance at our expense.",
                    "Strengthening Our Community: By updating homes, we create quality, affordable housing for Olive Branch families.",
                    "Family-Owned Business In Olive Branch: As a family-owned business in Olive Branch, Mississippi, we care about homeowners. We listen to your needs and offer solutions to make selling your house easy and stress-free.",
                    "No agent costs: Selling your house to us is simple. There are no real estate agents, no closing costs, and no hidden fees. You get a fair cash offer with no extra costs.",
                    "A Quick & Easy Process: We keep things simple. Our process is clear, with no complicated paperwork or delays. You choose the closing date that works best for you,"
                ],
                situations: [
                    {
                        title: "Stressful rentals",
                        description: "Say goodbye to bad tenants or repairs."
                    },
                    {
                        title: "Vacant houses",
                        description: "No more paying for empty property."
                    },
                    {
                        title: "Houses that need big fixes",
                        description: "Sell as-is, no work needed."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_13.webp",
                heroImage: "/background-we-serve.webp",
                faqs: [
                    {
                        q: "Why Should I Choose Olive Branch Investments for My Real Estate Needs?",
                        a: "Spencer Buys Houses makes selling your home in Olive Branch, Mississippi, easy and stress-free. As a local home buyer, we understand the Olive Branch market and are committed to helping homeowners find the best solution. If you need to sell your house fast, we are here to help with a simple and hassle-free process."
                    },
                    {
                        q: "How quickly can I expect to receive cash after selling my house?",
                        a: "We can close in as little as 7 days, but the timeline is flexible based on your needs. Once the sale is complete, you get your cash immediately."
                    },
                    {
                        q: "Are there any specific criteria or conditions for the houses you buy?",
                        a: "No! We buy houses in any condition, location, or price range. Whether your home needs repairs, has tenants, or is inherited, we will make you a fair cash offer. You don’t need to fix or clean anything—we take care of it all!"
                    },
                    {
                        q: "What is the process for selling my house to Spencer Buys Houses?",
                        a: "Selling your house to us is simple and hassle-free: Step 1: Contact us and share details about your property. Step 2: We review your home and make a fair cash offer. Step 3: You choose the closing date that works best for you. Step 4: We handle all the paperwork, and you get paid quickly."
                    }
                ]
            },
            {
                name: "Southaven",
                slug: "southaven",
                seoTitle: "Sell My House Fast In Southaven For Cash",
                seoDescription: "Get A Fair Cash Offer From A Trusted Cash Home Buyer!",
                heroTitle: "Sell Your House for Cash in Southaven with Spencer Buys Houses",
                heroSubtitle: "Looking to sell your house fast in Southaven? Spencer Buys Houses makes the process simple, hassle-free, and quick if the homeowner is looking to sell your house fast in Southaven.",
                intro: "We buy houses in Southaven for cash, eliminating the need for realtors, repairs, or waiting months for the right buyer. Whether your house needs repairs, is facing foreclosure, or you just want to skip the hassle of listing, we’re here to help. Discover why so many Southaven homeowners choose us for a fast, fair sale. At Spencer Buys Houses we sell your house fast in Southaven, Mississippi.",
                benefits: [
                    "Expert Guidance from Start to Finish: We know the Southaven real estate market inside and out, providing valuable insights to ensure you get the best deal possible.",
                    "Stress-Free Selling Experience: We aim to make it a smooth process. From the initial consultation to the closing, we handle all the details, allowing you to focus on what matters most to you.",
                    "No Open Houses or Showings: There is no need for open houses or inconvenient showings that can disrupt your daily life. We streamline the process, allowing you to move forward without these hassles.",
                    "Fast, Flexible Closing in Southaven: Need to sell quickly? We can close in as little as 7 days. Or, choose a date that works for you—no waiting for buyer financing or bank approvals.",
                    "Free, No-Risk Offer: Get a free cash offer with no strings attached. You decide if it’s right for you. No pushy sales tactics—we’re here to help, not hassle.",
                    "We Know the Southaven Market: As local cash home buyers, we understand Southaven neighborhoods, property values, and market trends. This means a fair, competitive offer for your home."
                ],
                situations: [
                    {
                        title: "Solutions for Tough Situations",
                        description: "Facing foreclosure, divorce, or inherited a property? We work with homeowners in any situation to provide a stress-free exit."
                    }
                ],
                benefitsImage: "/houses/Houses_Spencer_17.webp",
                heroImage: "/background-we-serve.webp",
                faqs: [
                    {
                        q: "What areas do you serve?",
                        a: "We buy houses in Southaven, MS, and nearby areas like Horn Lake, Olive Branch, and DeSoto County."
                    },
                    {
                        q: "What types of properties does Spencer Buys Houses buy?",
                        a: "We buy all types of properties—including single-family homes, condos, and any other residential buildings—in Southaven."
                    },
                    {
                        q: "Is there any obligation when I request an offer?",
                        a: "Absolutely! When you reach out to Spencer Buys Houses, requesting an offer is completely obligation-free."
                    },
                    {
                        q: "Are there any fees associated with selling my house?",
                        a: "None at all! Our cash offers come with no hidden fees or commissions. What you see is what you get."
                    }
                ]
            }
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
