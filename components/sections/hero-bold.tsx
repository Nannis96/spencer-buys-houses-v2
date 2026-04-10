import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CallButton } from "@/components/ui/call-button"

export function HeroBold() {
    return (
        <section className="relative bg-[url('/home.png')] bg-no-repeat bg-left bg-cover bg-[position:10%_50%] md:bg-[position:35%_30%] lg:bg-[position:50%_25%] min-h-[28rem] md:min-h-[40rem] lg:min-h-[56rem] flex flex-col justify-end lg:items-center lg:justify-center py-12 md:py-16 mt-6 md:mt-0">
            <div className="absolute inset-0 bg-black/50 z-0" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-8xl px-4 lg:px-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="text-center lg:text-left">
                        {/* H1 SEO */}
                        <h1 className="block text-4xl text-[var(--color-text-white)] font-bold tracking-tight md:text-5xl lg:text-7xl xl:text-8xl">
                            Sell Your Memphis House <span className="text-[var(--color-text-red)]">Fast for Cash</span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl lg:max-w-3xl text-lg lg:text-xl text-[var(--color-text-white)]">
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
