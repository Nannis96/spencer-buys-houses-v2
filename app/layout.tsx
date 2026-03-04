import type { Metadata, Viewport } from "next"
import { Inter, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/seo/json-ld"
import { StickyHeader } from "@/components/layout/header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const SITE_URL = "https://www.spencerbuyshouses.com"
const SITE_NAME = "SpencerBuysHouses.com"
const OG_IMAGE =
  "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sell Your Memphis House Fast | Spencer Buys Houses",
    template: "%s | Spencer Buys Houses",
  },
  description:
    "Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today! (901)-979-9848",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    title: "Sell Your Memphis House Fast For Cash",
    description:
      "Need to sell your house fast in Memphis, TN, Berclair, or Raleigh? Spencer Buy Houses offers fair cash offers, no fees, and fast closings. Get your free offer today!",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sell Your Memphis House Fast For Cash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Memphis House Fast For Cash",
    description:
      "Need to sell your house fast in Memphis, TN, Berclair, or Raleigh? Spencer Buy Houses offers fair cash offers, no fees, and fast closings. Get your free offer today!",
    images: [OG_IMAGE],
  },
  other: {
    "p:domain_verify": "4ffbadc943a8e669c3d5f474dd30c4cf",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f23",
}

/** JSON-LD structured data per SEO guide */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL + "/",
  name: SITE_NAME,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search/{search_term_string}/`,
    },
    "query-input": "required name=search_term_string",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: SITE_URL + "/",
  name: SITE_NAME,
  logo: "https://image-cdn.carrot.com/uploads/sites/81361/2025/08/cropped-Say-Less-Facebook-Cover-Facebook-Cover-07-23-2025_11_40_AM.png",
  telephone: "+19016218799",
  description:
    "Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today! (901)-979-9848",
  sameAs: [
    "https://www.facebook.com/spencerbuyshouses",
    "https://www.instagram.com/spen.cershadrach",
    "https://www.linkedin.com/in/spencer-shadrach-0a379b4a",
    "https://mx.pinterest.com/spencerbuyshouses",
    "https://www.youtube.com/@spencerbuyshouses",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body id="top" className="font-sans antialiased min-h-screen">
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <StickyHeader />
        <div className="pt-6 md:pt-8">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
