import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/seo/json-ld"
import { StickyHeader } from "@/components/layout/header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

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
    // Pinterest domain verification
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

const businessGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "RealEstateAgent"],
      "@id": "https://www.spencerbuyshouses.com/#business",
      "name": "Spencer Buys Houses",
      "alternateName": ["SBH", "Spencer Buys Houses Memphis"],
      "description":
        "We buy houses for cash in Memphis, TN and surrounding areas. Fast closings, no repairs needed, no agent fees. We've purchased 400+ homes across Shelby County and the Mid-South.",
      "url": "https://www.spencerbuyshouses.com",
      "logo": "https://www.spencerbuyshouses.com/logo.png",
      "image": "https://image-cdn.carrot.com/uploads/sites/81361/2025/02/image-1.png",
      "telephone": "+19014872991",
      "email": "homebuyers901@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "111 S Highland Street Ste 179",
        "addressLocality": "Memphis",
        "addressRegion": "TN",
        "postalCode": "38111",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 35.1495,
        "longitude": -90.049,
      },
      "areaServed": [
        { "@type": "City", "name": "Memphis", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Bartlett", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Cordova", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Germantown", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Collierville", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Arlington", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Millington", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
        { "@type": "City", "name": "Southaven", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
        { "@type": "City", "name": "Horn Lake", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
        { "@type": "City", "name": "Olive Branch", "containedInPlace": { "@type": "State", "name": "Mississippi" } },
        { "@type": "AdministrativeArea", "name": "Shelby County, TN" },
        { "@type": "AdministrativeArea", "name": "DeSoto County, MS" },
      ],
      "founder": {
        "@type": "Person",
        "@id": "https://www.spencerbuyshouses.com/#founder",
        "name": "Spencer",
        "jobTitle": "Founder & Cash Home Buyer",
        "url": "https://www.spencerbuyshouses.com",
        "image": "https://image-cdn.carrot.com/uploads/sites/81361/2025/02/image-1.png",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home Buying Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cash Home Purchase",
              "description":
                "We buy houses in any condition for cash. No repairs, no showings, no agent commissions. Close in as little as 7 days.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Inherited Property Purchase",
              "description":
                "Sell an inherited home quickly without probate delays. We handle all paperwork.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Tax Sale / Pre-Foreclosure Purchase",
              "description":
                "Facing a tax sale or foreclosure in Memphis? We can close fast and help you avoid losing your home.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Distressed Property Purchase",
              "description":
                "Sell a fire-damaged, flood-damaged, or heavily distressed home as-is for cash.",
            },
          },
        ],
      },
      "sameAs": [
        "https://www.facebook.com/spencerbuyshouses",
        "https://www.youtube.com/@spencerbuyshouses",
        "https://www.tiktok.com/@spencerbuyshouses",
        "https://www.instagram.com/spencerbuyshouses",
        "https://www.spencerbuyshouses.com",
      ],
      "knowsAbout": [
        "Cash home buying Memphis TN",
        "We buy houses Memphis",
        "Sell house fast Memphis Tennessee",
        "Tax sale properties Memphis",
        "Distressed property purchase",
        "Real estate investing Memphis",
        "Owner financing Memphis",
      ],
      "slogan": "We Buy Houses for Cash in Memphis, TN",
      "priceRange": "$25,000 - $500,000",
      "paymentAccepted": ["Cash", "Wire Transfer", "Check"],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00",
          "closes": "14:00",
        },
      ],
      "potentialAction": {
        "@type": "BuyAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.spencerbuyshouses.com/#offer-form",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        "description": "Get a cash offer for your Memphis home",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "113",
        "reviewCount": "113",
      },
      "hasMap": "https://www.google.com/maps/search/Spencer+Buys+Houses+Memphis+TN",
      "currenciesAccepted": "USD",
      "foundingDate": "2018",
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10" },
      "award": [
        "BBB Accredited Business",
        "Top 5% Cash Home Buyer — ListWithClever 2026",
        "Top 1% Most Active Buyer — ListWithClever 2026",
      ],
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Memphis Home Seller" },
          "reviewBody":
            "Fast, easy, and fair. Spencer Buys Houses made the process simple — no repairs, no hassle, cash at closing. Would absolutely recommend to anyone needing to sell fast in Memphis.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Memphis Landlord" },
          "reviewBody":
            "I had rentals I'd been holding for years. Spencer's team walked the properties, made a fair offer, and we closed in under two weeks. Exactly what I needed.",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.spencerbuyshouses.com/properties-we-bought/#list",
      "name": "Properties Purchased by Spencer Buys Houses",
      "description":
        "A record of homes purchased for cash by Spencer Buys Houses across Memphis, TN and surrounding communities.",
      "numberOfItems": 50,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1340 Mount Moriah Rd, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1340 Mount Moriah Rd", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4558 Spring Valley, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4558 Spring Valley", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38128", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1615 Jackson Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1615 Jackson Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38107", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4096 Wales Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4096 Wales Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38108", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4130 Raintree, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4130 Raintree", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38115", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 2134 Slocum, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "2134 Slocum", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38127", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 7, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3514 Amesbury, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3514 Amesbury", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38128", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 8, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4866 Berrydale, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4866 Berrydale", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38118", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 9, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4200 Beacon Hill, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4200 Beacon Hill", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38127", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 10, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1363 Whitewater, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1363 Whitewater", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 11, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 8316 Rembrook, Cordova, TN", "address": { "@type": "PostalAddress", "streetAddress": "8316 Rembrook", "addressLocality": "Cordova", "addressRegion": "TN", "postalCode": "38018", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 12, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 6446 Birch Mill Cove, Bartlett, TN", "address": { "@type": "PostalAddress", "streetAddress": "6446 Birch Mill Cove", "addressLocality": "Bartlett", "addressRegion": "TN", "postalCode": "38135", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 13, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1626 Riverside Blvd, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1626 Riverside Blvd", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38109", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 14, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 222 Ailene, Collierville, TN", "address": { "@type": "PostalAddress", "streetAddress": "222 Ailene", "addressLocality": "Collierville", "addressRegion": "TN", "postalCode": "38017", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 15, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3258 Lansing, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3258 Lansing", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38115", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 16, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1804 Watson, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1804 Watson", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38111", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 17, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3443 Overton Crossing, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3443 Overton Crossing", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38127", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 18, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 5730 Glade View, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "5730 Glade View", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38120", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 19, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4967 Wilburn Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4967 Wilburn Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 20, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 509 Yellowhammer, Collierville, TN", "address": { "@type": "PostalAddress", "streetAddress": "509 Yellowhammer", "addressLocality": "Collierville", "addressRegion": "TN", "postalCode": "38017", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 21, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3408 Park Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3408 Park Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38111", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 22, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 931 S Parkway Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "931 S Parkway Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38104", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 23, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1904 Tahiti Lane, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1904 Tahiti Lane", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 24, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3413 Point Pleasant, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3413 Point Pleasant", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38118", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 25, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 5331 Lochinvar, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "5331 Lochinvar", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38116", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 26, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 449 Riversedge, Cordova, TN", "address": { "@type": "PostalAddress", "streetAddress": "449 Riversedge", "addressLocality": "Cordova", "addressRegion": "TN", "postalCode": "38016", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 27, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1483 Court Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1483 Court Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38104", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 28, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3165 Clarendon, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3165 Clarendon", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38118", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 29, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4890 Spottswood, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4890 Spottswood", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 30, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 707 Moss Rd, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "707 Moss Rd", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 31, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1537 Blue Grass, Germantown, TN", "address": { "@type": "PostalAddress", "streetAddress": "1537 Blue Grass", "addressLocality": "Germantown", "addressRegion": "TN", "postalCode": "38138", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 32, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1798 Kimbrough, Germantown, TN", "address": { "@type": "PostalAddress", "streetAddress": "1798 Kimbrough", "addressLocality": "Germantown", "addressRegion": "TN", "postalCode": "38138", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 33, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3610 Allandale, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3610 Allandale", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38111", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 34, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1160 Tanglewood, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1160 Tanglewood", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38114", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 35, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1742 Foster, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1742 Foster", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38114", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 36, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4134 Glenroy, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4134 Glenroy", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38125", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 37, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 2291 Young Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "2291 Young Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38104", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 38, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 5030 Princeton Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "5030 Princeton Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 39, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 6220 Village Park, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "6220 Village Park", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38141", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 40, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4948 Wilburn Ave, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4948 Wilburn Ave", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 41, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 5816 Eagleston, Olive Branch, MS", "address": { "@type": "PostalAddress", "streetAddress": "5816 Eagleston", "addressLocality": "Olive Branch", "addressRegion": "MS", "postalCode": "38654", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 42, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3818 Townsend, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "3818 Townsend", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38127", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 43, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4203 Zelda, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4203 Zelda", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38122", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 44, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 3308 Bruton Parish, Bartlett, TN", "address": { "@type": "PostalAddress", "streetAddress": "3308 Bruton Parish", "addressLocality": "Bartlett", "addressRegion": "TN", "postalCode": "38135", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 45, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1593 Mary Dr, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1593 Mary Dr", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38111", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 46, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1941 Corning, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1941 Corning", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38127", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 47, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 4632 Sea Isle, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "4632 Sea Isle", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38117", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 48, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1532 Madison, Memphis, TN", "address": { "@type": "PostalAddress", "streetAddress": "1532 Madison", "addressLocality": "Memphis", "addressRegion": "TN", "postalCode": "38104", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 49, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 8813 Bredbury, Cordova, TN", "address": { "@type": "PostalAddress", "streetAddress": "8813 Bredbury", "addressLocality": "Cordova", "addressRegion": "TN", "postalCode": "38016", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
        { "@type": "ListItem", "position": 50, "item": { "@type": "RealEstateListing", "name": "Cash Home Purchase – 1141 Red Fern, Cordova, TN", "address": { "@type": "PostalAddress", "streetAddress": "1141 Red Fern", "addressLocality": "Cordova", "addressRegion": "TN", "postalCode": "38018", "addressCountry": "US" }, "offers": { "@type": "Offer", "seller": { "@type": "RealEstateAgent", "name": "Spencer Buys Houses", "url": "https://www.spencerbuyshouses.com" } } } },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.spencerbuyshouses.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast can Spencer Buys Houses close on my Memphis home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We can close in as little as 7 days. Once you accept our cash offer, we handle all the paperwork and coordinate with the title company. Most sellers close within 1–3 weeks.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I need to make repairs before selling to Spencer Buys Houses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We buy houses in any condition — fire damage, flood damage, structural issues, or just outdated. You don't need to fix anything. We buy as-is.",
          },
        },
        {
          "@type": "Question",
          "name": "Are there any fees or commissions when selling to Spencer Buys Houses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zero fees, zero commissions. We're not real estate agents. We're cash buyers. You keep 100% of the offer price with no deductions.",
          },
        },
        {
          "@type": "Question",
          "name": "What areas does Spencer Buys Houses serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We buy houses throughout Memphis and surrounding areas including Bartlett, Cordova, Germantown, Collierville, Arlington, Millington, Southaven MS, Horn Lake MS, and Olive Branch MS.",
          },
        },
        {
          "@type": "Question",
          "name": "How many houses has Spencer Buys Houses purchased?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We've purchased hundreds of homes across the Memphis metro area and Mid-South, buying approximately 6–7 houses per month. We have a track record spanning over 10 years in the Memphis real estate market.",
          },
        },
        {
          "@type": "Question",
          "name": "What happens if my house is facing a tax sale or foreclosure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We specialize in helping homeowners avoid tax sales and foreclosures. We can move quickly, make a cash offer, and close before the county takes action. Contact us immediately if you're in this situation.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={businessGraphSchema} />
      </head>
      <body id="top" className="font-sans antialiased min-h-screen">
        {/* GTM noscript fallbacks — must be immediately after <body> per GTM spec */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWPZRDH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSG7CZKX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <StickyHeader />
        <div style={{ paddingTop: 'calc(var(--app-header-height, 4rem) / 2)' }}>{children}</div>
        <SiteFooter />
        <Analytics />
        {/*
         * ── Third-party scripts ───────────────────────────────────────────────
         * Placed at the end of <body> so Next.js can inject them after hydration
         * without blocking the render pipeline or affecting LCP.
         * ─────────────────────────────────────────────────────────────────────
         */}

        {/*
         * GTM — Primary container (GTM-WWPZRDH)
         * strategy="afterInteractive": GTM must initialise as soon as the page
         * is interactive so pageview events and early user interactions are not
         * missed. Delaying it further (lazyOnload) would lose those signals.
         */}
        <Script
          id="gtm-primary"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWPZRDH');`,
          }}
        />

        {/*
         * GTM — Secondary container (GTM-WSG7CZKX)
         * strategy="lazyOnload": secondary container carries supplementary pixels
         * and re-targeting tags that are not time-sensitive. Loading it only after
         * the browser is fully idle prevents it from competing with the primary
         * GTM container and with LCP resources.
         */}
        <Script
          id="gtm-secondary"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WSG7CZKX');`,
          }}
        />

        {/*
         * Google Analytics GA4 — gtag.js loader (G-P11R7D3N7W)
         * strategy="afterInteractive": GA4 must be ready immediately after
         * hydration to capture first pageview and user-timing metrics accurately.
         */}
        <Script
          id="ga4-loader"
          src="https://www.googletagmanager.com/gtag/js?id=G-P11R7D3N7W"
          strategy="afterInteractive"
        />

        {/*
         * Google Analytics GA4 — inline config
         * Depends on the ga4-loader above; "afterInteractive" keeps both in sync.
         */}
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P11R7D3N7W');`,
          }}
        />
      </body>
    </html>
  )
}
