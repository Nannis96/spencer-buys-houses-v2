export function VideoSection() {
    return (
        <section
            id="watch-how-it-works"
            aria-label="Watch how Spencer Buys Houses works"
            className="bg-[var(--color-background)] py-16 lg:py-20"
        >
            <div className="mx-auto max-w-5xl px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                        See It in Action
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Watch How We Buy Your Memphis House{" "}
                        <span className="text-[var(--color-text-yellow)]">Fast for Cash</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
                        Thousands of Memphis homeowners have already sold with Spencer Buys Houses — no repairs,
                        no agents, no stress. Watch how simple the process really is.
                    </p>
                </div>

                {/* Video wrapper */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-[var(--color-primary-dark)]/20">
                    {/* Subtle glow behind frame */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-2xl bg-[var(--color-primary-dark)]/5 blur-xl"
                    />

                    {/* 16/9 aspect ratio container */}
                    <div className="relative w-full aspect-video">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/eFa-zwpW6s0?rel=0&modestbranding=1&color=white"
                            title="How Spencer Buys Houses — Sell Your Memphis Home Fast for Cash"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Social proof micro-copy */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Over <span className="text-[var(--color-primary-dark)] font-semibold">550+ Memphis homeowners</span>{" "}
                    have already sold their house to Spencer — close in as little as 7 days.
                </p>
            </div>
        </section>
    )
}
