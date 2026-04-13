"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { KeyboardEvent } from "react";

export function TypesOfHomesSection() {
    const router = useRouter();

    const navigate = (href: string) => router.push(href);

    const handleKeyDown = (e: KeyboardEvent<HTMLArticleElement>, href: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(href);
        }
    };

    return (
        <section id="types-of-homes" className="bg-[var(--color-background-white)] border-t-4 border-[var(--color-secondary)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-black)] mb-6 leading-tight">
                            What types of {" "}
                            <span className="text-[var(--color-text-red)]">Homes do we Buy?</span>
                        </h2>
                        <p className="text-[var(--color-text-black)] leading-relaxed mb-4">
                            Whether it’s the cozy den with panel walls, the
                            avocado green appliances, or that unmistakable smell
                            of memories, we see beauty in every detail. While others
                            might see an outdated space, we see legacy. We’re proud
                            to offer an easy, respectful way for families to sell these
                            homes — preserving the story, while making room for
                            the next chapter
                        </p>
                        <p className="text-[var(--color-text-black)] leading-relaxed mb-4">
                            If you’re holding onto a home like this — your mom’s,
                            your grandma’s, or your own — we’d be honored to take
                            care of it like family.
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <div className="max-w-md mx-auto md:ml-auto p-1 bg-[var(--color-text-red)] rounded-lg">
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/grandmothers.png"
                                    alt="Agente conversando con una mujer mayor y su familiar, sonriendo"
                                    width={1200}
                                    height={1200}
                                    className="w-full h-70 object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3 items-stretch justify-center">
                        <article aria-labelledby="moms-old-house" role="link" tabIndex={0} onClick={() => navigate('/blog')} onKeyDown={(e) => handleKeyDown(e, '/blog')} className="p-6 rounded-lg bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 cursor-pointer w-full h-full flex flex-col justify-between">
                            <h3 id="moms-old-house" className="text-xl font-semibold text-[var(--color-text-black)] mb-2">
                                MOM’S {" "}
                                <span className="text-[var(--color-text-red)]">OLD HOUSE</span>
                            </h3>
                            <p className="text-[var(--color-text-black)] mb-3">Homes that feel frozen in time — full of stories and character.</p>
                            <ul className="text-[var(--color-text-black)] list-disc list-inside space-y-1">
                                <li>Vintage wallpaper, shag carpet, retro kitchens and baths.</li>
                                <li>We buy as-is and honor the home’s history.</li>
                                <li>Fast, compassionate process — we treat it like family.</li>
                            </ul>
                        </article>

                        <article aria-labelledby="tired-landlords" role="link" tabIndex={0} onClick={() => navigate('/blog')} onKeyDown={(e) => handleKeyDown(e, '/blog')} className="p-6 rounded-lg bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 cursor-pointer w-full h-full flex flex-col justify-between">
                            <h3 id="tired-landlords" className="text-xl font-semibold text-[var(--color-text-black)] mb-2">
                                TIRED {" "}
                                <span className="text-[var(--color-text-red)]">LANDLORDS</span>
                            </h3>
                            <p className="text-[var(--color-text-black)] mb-3">Dear tired landlord — it’s okay to be done. We see you.</p>
                            <ul className="text-[var(--color-text-black)] list-disc list-inside space-y-1">
                                <li>No more late-night maintenance calls or rent chasing.</li>
                                <li>We buy rental properties in any condition — tenants or not.</li>
                                <li>No repairs, no showings, no drawn-out negotiations.</li>
                            </ul>
                        </article>

                        <article aria-labelledby="fixer-uppers" role="link" tabIndex={0} onClick={() => navigate('/blog')} onKeyDown={(e) => handleKeyDown(e, '/blog')} className="p-6 rounded-lg bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 cursor-pointer w-full h-full flex flex-col justify-between">
                            <h3 id="fixer-uppers" className="text-xl font-semibold text-[var(--color-text-black)] mb-2">
                                FIXER {" "}
                                <span className="text-[var(--color-text-red)]">UPPERS</span>
                            </h3>
                            <p className="text-[var(--color-text-black)] mb-3">Skip the fixes. Sell as-is — no contractors, no clean-outs.</p>
                            <ul className="text-[var(--color-text-black)] list-disc list-inside space-y-1">
                                <li>We buy ugly, outdated, half-finished, or falling apart homes.</li>
                                <li>No inspections that pick the place apart — fair cash offers.</li>
                                <li>We handle the hard work so you can close on your timeline.</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
