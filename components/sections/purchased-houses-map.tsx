export function PurchasedHousesMap() {
    return (
        <section
            id="purchased-houses"
            className="bg-[var(--color-background)] py-10 lg:py-14"
            aria-labelledby="purchased-houses-heading"
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-8">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                        Where We've Bought
                    </p>
                    <h2 id="purchased-houses-heading" className="text-2xl md:text-3xl font-bold text-white">
                        Houses We've Purchased — Map View
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                        Explore properties we've purchased across the area. Click markers for details.
                    </p>
                </div>

                <div className="w-full overflow-hidden rounded-2xl shadow-md border border-white/10">
                    <div className="relative w-full aspect-[16/9]">
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1XygmkaoHWNme6lbroGT4sRxWCopGkVUU"
                            title="Purchased Houses Map"
                            className="w-full h-full border-0"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
