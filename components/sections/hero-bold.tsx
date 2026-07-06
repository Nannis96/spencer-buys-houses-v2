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
                className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-[1800px] px-4 sm:px-30">

                <div className="flex flex-col items-start">

                    {/* FILA SUPERIOR */}
                    <div className="pt-5 lg:pt-5 w-full sm:max-w-[50%] text-left">
                        <h1 className="text-4xl sm:text-[5vw] md:text-[5vw] lg:text-[4.5vw] font-bold text-white leading-tight">
                            Sell Your Memphis House{" "}
                            <span className="text-[var(--color-text-red)]">
                                Fast for Cash
                            </span>
                        </h1>

                        <p className="mt-6 text-lg lg:text-xl text-white">
                            Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today!
                        </p>
                    </div>

                    {/* FILA INFERIOR */}
                    <div className="mt-8 sm:mt-20 w-full sm:max-w-[50%]">
                        <div className="mx-auto w-full max-w-xl">
                            <LeadFormConsent />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
