export function TypesOfHomesSection() {
    return (
        <section id="types-of-homes" className="bg-[var(--color-background)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        What types of {" "}
                        <span className="text-[var(--color-text-yellow)]">Homes do we Buy?</span>
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Whether it’s the cozy den with panel walls, the
                        avocado green appliances, or that unmistakable smell
                        of memories, we see beauty in every detail. While others
                        might see an outdated space, we see legacy. We’re proud
                        to offer an easy, respectful way for families to sell these
                        homes — preserving the story, while making room for
                        the next chapter
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        If you’re holding onto a home like this — your mom’s,
                        your grandma’s, or your own — we’d be honored to take
                        care of it like family.
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                        <article aria-labelledby="moms-old-house" className="p-6 bg-white/5 rounded-lg border border-white/10">
                            <h3 id="moms-old-house" className="text-xl font-semibold text-white mb-2">
                                MOM’S {" "}
                                <span className="text-[var(--color-text-yellow)]">OLD HOUSE</span>
                            </h3>
                            <p className="text-gray-300 mb-3">Homes that feel frozen in time — full of stories and character.</p>
                            <ul className="text-gray-400 list-disc list-inside space-y-1">
                                <li>Vintage wallpaper, shag carpet, retro kitchens and baths.</li>
                                <li>We buy as-is and honor the home’s history.</li>
                                <li>Fast, compassionate process — we treat it like family.</li>
                            </ul>
                        </article>

                        <article aria-labelledby="tired-landlords" className="p-6 bg-white/5 rounded-lg border border-white/10">
                            <h3 id="tired-landlords" className="text-xl font-semibold text-white mb-2">
                                TIRED {" "}
                                <span className="text-[var(--color-text-yellow)]">LANDLORDS</span>
                            </h3>
                            <p className="text-gray-300 mb-3">Dear tired landlord — it’s okay to be done. We see you.</p>
                            <ul className="text-gray-400 list-disc list-inside space-y-1">
                                <li>No more late-night maintenance calls or rent chasing.</li>
                                <li>We buy rental properties in any condition — tenants or not.</li>
                                <li>No repairs, no showings, no drawn-out negotiations.</li>
                            </ul>
                        </article>

                        <article aria-labelledby="fixer-uppers" className="p-6 bg-white/5 rounded-lg border border-white/10">
                            <h3 id="fixer-uppers" className="text-xl font-semibold text-white mb-2">
                                FIXER {" "}
                                <span className="text-[var(--color-text-yellow)]">UPPERS</span>
                            </h3>
                            <p className="text-gray-300 mb-3">Skip the fixes. Sell as-is — no contractors, no clean-outs.</p>
                            <ul className="text-gray-400 list-disc list-inside space-y-1">
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
