import React from "react"

interface CTAButtonProps {
    href?: string
    children: React.ReactNode
    className?: string
    target?: string
    rel?: string
}

export function CTAButton({ href = "#", children, className = "", target, rel }: CTAButtonProps) {
    const base =
        "inline-block rounded-lg bg-[var(--color-secondary)]/99 hover:bg-[var(--color-secondary)]/80 text-white px-8 py-4 text-base font-bold transition-colors"

    return (
        <a href={href} className={`${base} ${className}`.trim()} target={target} rel={rel}>
            {children}
        </a>
    )
}

export default CTAButton
