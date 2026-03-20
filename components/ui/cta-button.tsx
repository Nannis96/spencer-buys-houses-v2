import React from "react"

interface CTAButtonProps {
    href?: string
    children: React.ReactNode
    className?: string
    /** Tailwind text color class, e.g. 'text-black' */
    textColor?: string
    target?: string
    rel?: string
}

export function CTAButton({ href = "#", children, className = "", textColor = "text-white", target, rel }: CTAButtonProps) {
    const base =
        "inline-block rounded-lg bg-[var(--color-secondary)]/99 hover:bg-[var(--color-secondary)]/80 px-8 py-4 text-base font-bold transition-colors"

    return (
        <a href={href} className={`${base} ${textColor} ${className}`.trim()} target={target} rel={rel}>
            {children}
        </a>
    )
}

export default CTAButton
