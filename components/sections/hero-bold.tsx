import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CallButton } from "@/components/ui/call-button"
import Image from "next/image"

export function HeroBold() {
    return (
        <section className="relative min-h-[28rem] md:min-h-[40rem] lg:min-h-[56rem] flex flex-col justify-end lg:items-center lg:justify-center py-12 md:py-16 mt-6 md:mt-0 overflow-hidden">
            <Image
                src="/background-home.webp"
                alt="Memphis cash home buyer Spencer Shadrach"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-[10%_50%] md:object-[35%_30%] lg:object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 z-[1]" aria-hidden="true" />
            <div className="relative z-[2] mx-auto max-w-8xl px-4 lg:px-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="text-center lg:text-left">
                        {/* H1 SEO */}
                        <h1 className="block text-4xl text-[var(--color-text-white)] font-bold tracking-tight md:text-5xl lg:text-7xl xl:text-8xl [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
                            Sell Your Memphis House <span className="text-[var(--color-text-red)]">Fast for Cash</span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl lg:max-w-3xl text-lg lg:text-xl text-[var(--color-text-white)] [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                            Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today!
                        </p>

                        <CallButton />

                        <div className="lg:hidden mt-8 mb-9">
                            <LeadFormConsent />
                        </div>
                    </div>

                    {/* Right: Lead form */}
                    <div className="hidden lg:block">
                        <LeadFormConsent />
                    </div>
                </div>
            </div>
        </section>
    )
}
