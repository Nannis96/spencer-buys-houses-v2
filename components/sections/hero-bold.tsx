import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CallButton } from "@/components/ui/call-button"
import Image from "next/image"

export function HeroBold() {
    return (
        <section className="relative min-h-[56rem] overflow-hidden">
            <Image
                src="/background-home2.webp"
                alt="Memphis cash home buyer Spencer Shadrach"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-[60%_25%]"
            />

            <div
                className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-10">

                {/* FILA SUPERIOR (full-bleed heading with gutters) */}
                <div className="pt-20 lg:pt-28 relative left-1/2 -translate-x-1/2 w-screen px-6 md:px-8 lg:px-12 max-w-none">
                    <h1 className="w-full text-center text-[9vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-white leading-tight break-words">
                        Sell Your Memphis House{" "}
                        <span className="text-[var(--color-text-red)]">
                            Fast for Cash
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg lg:text-xl text-white text-center mx-auto">
                        Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today!
                    </p>

                    <div className="mt-8 flex justify-center">
                        <CallButton />
                    </div>
                </div>

                {/* FILA INFERIOR */}
                <div className="mt-20 lg:mt-24 flex justify-end">
                    <div className="w-full max-w-xl">
                        <LeadFormConsent />
                    </div>
                </div>

            </div>
        </section>
    )
}
