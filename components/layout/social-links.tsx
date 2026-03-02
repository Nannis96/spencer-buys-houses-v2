import {
    FaFacebookF,
    FaGoogle,
    FaInstagram,
    FaLinkedinIn,
    FaPinterestP,
    FaYoutube,
} from "react-icons/fa"

const SOCIAL_LINKS = [
    {
        href: "https://www.facebook.com/spencerbuyshouses",
        label: "Visit Spencer Buys Houses on Facebook",
        icon: FaFacebookF,
    },
    {
        href: "https://www.google.com/search?sca_esv=bcc33a35ba758be7&sxsrf=AHTn8zqZnH3MJTMgocMcMH9qe8pwKbKfmw:1739816269184&kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses&shndl=30&shem=lcuae,uaasie&source=sh/x/loc/uni/m1/1&kgs=ba24ee0e0bb416e9",
        label: "Visit Spencer Buys Houses on Google",
        icon: FaGoogle,
    },
    {
        href: "https://www.instagram.com/spen.cershadrach",
        label: "Visit Spencer Buys Houses on Instagram",
        icon: FaInstagram,
    },
    {
        href: "https://www.linkedin.com/in/spencer-shadrach-0a379b4a",
        label: "Visit Spencer Buys Houses on LinkedIn",
        icon: FaLinkedinIn,
    },
    {
        href: "https://mx.pinterest.com/spencerbuyshouses",
        label: "Visit Spencer Buys Houses on Pinterest",
        icon: FaPinterestP,
    },
    {
        href: "https://www.youtube.com/@spencerbuyshouses",
        label: "Visit Spencer Buys Houses on YouTube",
        icon: FaYoutube,
    },
]

interface SocialLinksProps {
    className?: string
    iconSize?: number
    iconClassName?: string
}

export function SocialLinks({
    className = "flex items-center gap-4",
    iconSize = 18,
    iconClassName = "text-gray-300 hover:text-white transition",
}: SocialLinksProps) {
    return (
        <div className={className}>
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    itemProp="sameAs"
                    className={iconClassName}
                >
                    <Icon size={iconSize} />
                </a>
            ))}
        </div>
    )
}
