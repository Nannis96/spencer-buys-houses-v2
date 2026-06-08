import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { CheckCircle2 } from "lucide-react"
import { CallButton } from "@/components/ui/call-button"
import { CTAButton } from "@/components/ui/cta-button"
import { ForeclosureGuideForm } from "./foreclosure-guide-form"

export function StopForeclosureContent() {
    return (
        <>
            <section className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-8 lg:pb-12 overflow-hidden" aria-labelledby="hero-heading">
                <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Stop Foreclosure
                            </p>

                            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                Stop Foreclosure in TN
                            </h1>

                            <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
                                Know your options and avoid foreclosure.
                            </p>

                            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
                                Contact Spencer Buys Houses or download your free guide today to get immediate help and guidance.
                            </p>

                            <ul className="mt-6 space-y-3" aria-label="Key benefits">
                                {[
                                    "Talk with real people who have helped others avoid foreclosure.",
                                    "We can work with your lender to forestall foreclosure.",
                                    "Get a fair cash offer and close faster than a traditional sale.",
                                ].map((point) => (
                                    <li key={point} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                        <span className="text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-row items-center justify-center gap-4 mt-8">
                                <CallButton />
                            </div>

                            <div className="lg:hidden mt-10">
                                <LeadFormConsent />
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="bg-[var(--color-background)] py-6 lg:py-10" aria-labelledby="how-heading">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center mb-12 space-y-4 md:space-y-6">
                        <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How To Stop Foreclosure In TN
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            Have you missed over 60 days of mortgage payments? Is the bank threatening to foreclose? Are you tired of your creditors’ harassing phone calls, but you don’t know what to do? Spencer Buys Houses has solutions that can possibly help save your credit, avoid foreclosure entirely, or help you sell your house and maybe even walk away with cash at close.
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            We are TN‘s trusted and reliable direct cash home buyer. In addition to helping homeowners navigate the pre-foreclosure process, we make fair cash offers for houses in any condition, and we can close on a timeline that is as fast or as slow as you need. Even if your bank is calling you every day, threatening to sell your house at auction, we can help. Read our guide on how to stop foreclosure in TN, talk with us to get experienced guidance on navigating the foreclosure process, or let us make you a fair cash offer for your property today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Talk with real people who have helped others avoid foreclosure.</h3>
                            <p className="text-gray-400">We can help avoid foreclosure and the hassles of listing your house with our TN Cash Offer Program. Ultimately, we are here to help you find solutions and are happy to talk you through the pre-foreclosure process and what you need to do next.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Behind on your mortgage? We’ll deal with the bank.</h3>
                            <p className="text-gray-400">Selling your house can be stressful enough! We’re experienced homebuyers and can work with your lender to forestall foreclosure and ensure that you don’t have to deal with them again after the house is purchased.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Get a fair cash offer, close and get your life back. </h3>
                            <p className="text-gray-400">For homeowners facing foreclosure, time is not on their side. But with our Cash Offer Program, we close much sooner than the traditional listing timeline and put foreclosure worries to bed.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="bg-[var(--color-background)] py-6 lg:py-10" aria-labelledby="how-heading">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center mb-12 space-y-4 md:space-y-6">
                        <h2 id="need-now" className="text-3xl md:text-4xl font-bold text-white mb-6">Need To Stop Foreclosure Now?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            If you’re in pre-foreclosure and want to learn how to stop foreclosure asap, the best thing you can do right now is to educate yourself on your options. We’ve created free online guides to help homeowners just like you find out your options on getting out of the sticky situation you’re in right now.
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            Remember, you aren’t the first person to go through a foreclosure…and won’t be the last. So don’t feel ashamed. It happens.
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            For some people, selling your home is the best and quickest option (we’ll make a fair all-cash offer on your house today, just let us know about your situation here). Beyond a cash offer, we’ve been able to help STOP FORECLOSURE completely through education and helping homeowners understand the resources available to them. These resources are readily available to you! Click here to get your free foreclosure guide.
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto md:max-w-none md:w-full">
                            If you are a TN homeowner and are trying to find a way to avoid foreclosure and save your credit, Spencer Buys Houses has a solution. We have provided solutions to countless others facing foreclosure and would love to talk through your options with you. Best of all, when we buy your house directly from you, we buy it as-is. You walk away without having to do a single repair or upgrade. It’s that easy and convenient. TN area homeowners that are already struggling with a high interest rate and months of missed mortgage payments can’t afford the time and cost of selling their home through a traditional real estate agent. That’s where our easy selling process can help.
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4 mb-8">
                        <CTAButton href="#top">Get Your Free Cash Offer</CTAButton>
                        <CallButton inline />
                    </div>
                </div>
            </section>

            {/* <section id="guide" className="bg-[var(--color-background)] py-12 lg:py-16" aria-labelledby="guide-heading">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Free Resource
                            </p>
                            <h2 id="guide-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Free Guide: 5 Ways You Can Stop or Avoid Foreclosure In Today’s Market
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Learn how to avoid foreclosure, stop the foreclosure process, and your 5 main foreclosure avoidance options with this free guide.
                            </p>
                            <ul className="space-y-3" aria-label="Guide contents">
                                {[
                                    "Loan modification to lower your monthly payments",
                                    "Forbearance or repayment plans to pause or catch up",
                                    "Refinance or reinstate the loan to bring it current",
                                    "Sell quickly for cash (or pursue a short sale) to avoid auction",
                                    "Deed in lieu of foreclosure or other legal remedies to stop the process",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <ForeclosureGuideForm />
                        </div>
                    </div>
                </div>
            </section> */}

            <TestimonialsSection count={3} />

            <CallNowBanner />
        </>
    )
}
