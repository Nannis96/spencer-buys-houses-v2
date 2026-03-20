import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CallButton } from "@/components/ui/call-button"

export function HeroBold() {
    return (
        <section
            className="relative bg-[var(--color-background)] bg-bottom pt-32 md:pt-48 pb-8 lg:pb-12 flex flex-col justify-end"
            style={{
                backgroundImage: "url('/home.png')",
                backgroundPosition: 'center 10%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '85vh',
            }}
        >
            <div className="relative mx-auto max-w-7xl px-4 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        {/* H1 SEO */}
                        <h1 className="block text-4xl text-[var(--color-text-white)] font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Sell Your Memphis House <span className="text-[var(--color-text-red)]">Fast for Cash</span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-white)]">
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
