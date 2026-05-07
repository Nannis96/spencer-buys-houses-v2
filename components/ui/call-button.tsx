import { Phone } from "lucide-react"

type CallButtonProps = {
    phoneNumber?: string
    display?: string
    ariaLabel?: string
    inline?: boolean
    className?: string
}

export function CallButton({
    phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+19013999952",
    display = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(901) 399-9952",
    ariaLabel = `Call Spencer Buys Houses at ${process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(901) 621-8799"}`,
    inline = false,
    className = "",
}: CallButtonProps) {
    const baseInlineClass =
        "inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/80 text-white font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"

    const baseBlockClass =
        "inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/80 font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"

    if (inline) {
        return (
            <a
                href={`tel:${phoneNumber}`}
                className={`${baseInlineClass} ${className}`.trim()}
                aria-label={ariaLabel}
            >
                <Phone className="h-6 w-6" aria-hidden="true" />
                {display}
            </a>
        )
    }

    return (
        <div className="mx-auto mt-6 max-w-2xl flex justify-center">
            <a href={`tel:${phoneNumber}`} className={`${baseBlockClass} ${className}`.trim()} aria-label={ariaLabel}>
                <Phone className="h-6 w-6" aria-hidden="true" />
                {display}
            </a>
        </div>
    )
}
