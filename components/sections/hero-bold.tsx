import { LeadFormConsent } from "@/components/forms/lead-form-consent"

export function HeroBold() {
    return (
        <section className="relative bg-[#0f0f23] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        {/* H1 SEO */}
                        <h1 className="block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Sell Your Memphis House Fast for Cash
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today! (901)-621-8799
                        </p>

                        {/* <a
                            href="/get-a-cash-offer-today/"
                            className="mt-8 inline-block rounded-lg bg-brand-amber px-8 py-4 text-lg font-bold"
                        >
                            Get Your Free Cash Offer
                        </a> */}

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
