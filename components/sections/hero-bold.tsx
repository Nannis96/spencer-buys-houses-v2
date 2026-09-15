import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CallButton } from "@/components/ui/call-button"
import Image from "next/image"

export function HeroBold() {
    return (
        <section className="relative -mt-[var(--app-header-height)] pt-[calc(var(--app-header-height)+5rem)] lg:pt-[calc(var(--app-header-height)+7rem)] min-h-[56rem] pb-20 lg:pb-32 overflow-hidden">
            <Image
                src="/background-home.webp"
                alt="Memphis cash home buyer Spencer Shadrach"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-[60%_25%]"
            />

            <div
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-[1800px] px-4 sm:px-30">

                <div className="flex flex-col items-start">

                    {/* FILA SUPERIOR */}
                    <div className="pt-5 lg:pt-5 w-full sm:max-w-[50%] text-left">
                        <h1 className="text-4xl sm:text-[5vw] md:text-[5vw] lg:text-[4.5vw] font-bold text-white leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
                            Sell Your Memphis House{" "}
                            <span className="cash-pulse font-extrabold text-[var(--color-text-red)]">
                                Fast for Cash
                            </span>
                        </h1>

                        <p className="mt-6 text-lg lg:text-xl font-medium text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                            Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today!
                        </p>
                    </div>

                    {/* FILA INFERIOR */}
                    <div className="mt-8 sm:mt-14 lg:mt-16 w-full sm:max-w-[34rem] md:max-w-[38rem] lg:max-w-[42rem] xl:max-w-[46rem]">
                        <LeadFormConsent />
                    </div>

                </div>

            </div>
        </section>
    )
}
