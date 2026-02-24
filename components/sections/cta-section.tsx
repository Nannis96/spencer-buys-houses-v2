import { Phone, ArrowRight, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
    return (
        <section className="bg-[#f59e0b] py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-[#0f0f23]/10 px-4 py-2">
                    <CalendarCheck className="h-4 w-4 text-[#0f0f23]" />
                    <span className="text-sm font-bold text-[#0f0f23]">GUARANTEED CLOSE DATE</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-[#0f0f23] mb-4 text-balance">
                    Ready to Get Your Free Cash Offer?
                </h2>
                <p className="text-lg text-[#0f0f23]/80 mb-2 max-w-2xl mx-auto">
                    No fees. No repairs. No obligation. Close in as little as 7 days.
                </p>
                <p className="text-base text-[#0f0f23]/60 mb-8 max-w-xl mx-auto">
                    Serving Memphis, Berclair, Raleigh, Frayser, Hickory Hill, Cordova, Whitehaven &amp; surrounding areas.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="bg-[#0f0f23] hover:bg-[#1a1a3e] text-white hover:text-[#f59e0b] text-lg px-8 h-14 font-bold"
                    >
                        <a href="#top">
                            Get My Free Cash Offer Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-[#0f0f23] text-white hover:bg-[#0f0f23] hover:text-[#f59e0b] text-lg px-8 h-14 font-bold"
                    >
                        <a href="tel:+19016218799">
                            <Phone className="mr-2 h-5 w-5" />
                            (901) 621-8799
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
