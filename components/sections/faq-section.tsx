"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "How fast can you close on my Memphis house?",
        a: "We can close in as little as 7 days — or on whatever timeline works best for you. You pick the closing date and we make it happen. Our fastest Memphis close was 5 business days from the initial call.",
    },
    {
        q: "Do I need to make any repairs before selling?",
        a: "Absolutely not. We buy Memphis houses in any condition — whether they need minor cosmetic updates, major structural work, fire damage, or anything in between. You won't spend a single dime on repairs.",
    },
    {
        q: "Are there any fees, commissions, or hidden costs?",
        a: "None whatsoever. There are no agent commissions (which typically run 6%+), no fees, and we cover all standard closing costs. The cash offer you accept is the exact amount you receive at closing.",
    },
    {
        q: "How do you determine your offer price for my Memphis property?",
        a: "We analyze recent comparable sales in your specific Memphis neighborhood, the current condition of your property, local market trends, and estimated repair costs to provide a fair, competitive AS-IS cash offer.",
    },
    {
        q: "What areas of Memphis and Shelby County do you buy houses in?",
        a: "We buy houses throughout greater Memphis — including Berclair, Raleigh, Frayser, Hickory Hill, Cordova, Whitehaven, East Memphis, Millington, Bartlett, Arlington, and Somerville. If you are unsure, just give us a call at (901) 621-8799.",
    },
    {
        q: "Is there any obligation when I request an offer?",
        a: "Zero obligation. Getting a cash offer from Spencer is completely free and comes with no strings attached. If you decide not to sell, that's perfectly fine — no pressure, ever.",
    },
    {
        q: "What types of properties do you buy in Memphis?",
        a: "We buy all types of residential properties — single-family homes, condos, townhouses, duplexes, and small multi-family buildings. Any condition, any situation.",
    },
    {
        q: "Can you help if I'm facing foreclosure, divorce, or an inherited property?",
        a: "Yes — these are some of the most common situations we help with. We work with homeowners facing foreclosure, going through divorce, dealing with an inherited property, or any other difficult life situation. We move quickly and discreetly.",
    },
]

export function FAQSection() {
    return (
        <section id="faq" className="bg-[var(--color-background)] py-10 lg:py-14">
            <div className="mx-auto max-w-3xl px-4 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Common Questions, Straight Answers
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Everything you need to know about selling your Memphis house fast for cash.
                    </p>
                </div>
                <Accordion type="single" collapsible className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="rounded-xl border border-white/10 bg-white/5 px-6 data-[state=open]:border-[var(--color-primary)]/30"
                        >
                            <AccordionTrigger className="text-left text-white hover:text-[var(--color-primary)] font-semibold py-5 hover:no-underline">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 leading-relaxed pb-5">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
