import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallNowBannerProps {
    /** Pill badge text above the heading */
    badge?: string
    /** Main heading text */
    heading?: string
    /** Supporting paragraph text */
    description?: string
    /** Label for the primary CTA button */
    primaryLabel?: string
    /** Label for the secondary CTA button */
    secondaryLabel?: string
    /** Link for the secondary CTA (defaults to "#top") */
    secondaryHref?: string
    /** aria-labelledby id for the section */
    headingId?: string
}

export function CallNowBanner({
    badge = "CALL US NOW",
    heading = "Call Now To Get Your Free Cash Offer!",
    description = "No fees. No repairs. No obligation. Close in as little as 7 days.",
    primaryLabel = "(901) 621-8799",
    secondaryLabel = "Get My Free Cash Offer",
    secondaryHref = "#top",
    headingId = "call-heading",
}: CallNowBannerProps) {
    return (
        <section className="bg-[#f59e0b] py-16 lg:py-20" aria-labelledby={headingId}>
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
                <div
                    className="inline-flex items-center gap-2 mb-6 rounded-full bg-[#0f0f23]/10 px-4 py-2"
                    aria-hidden="true"
                >
                    <Phone className="h-4 w-4 text-[#0f0f23]" />
                    <span className="text-sm font-bold text-[#0f0f23]">{badge}</span>
                </div>

                <h2
                    id={headingId}
                    className="text-3xl md:text-4xl font-black text-[#0f0f23] mb-4 text-balance"
                >
                    {heading}
                </h2>

                <p className="text-lg text-[#0f0f23]/80 mb-8 max-w-2xl mx-auto">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="bg-[#0f0f23] hover:bg-[#1a1a3e] text-white hover:text-[#f59e0b] text-lg px-8 h-14 font-bold"
                    >
                        <a
                            href="tel:+19016218799"
                            aria-label={`Call us at ${primaryLabel}`}
                        >
                            <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                            {primaryLabel}
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-[#0f0f23] text-white hover:bg-[#0f0f23] hover:text-[#f59e0b] text-lg px-8 h-14 font-bold"
                    >
                        <a href={secondaryHref}>
                            {secondaryLabel}
                            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
