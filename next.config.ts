import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Other
      { source: "/how-we-buy-houses", destination: "/how-it-works", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/sell-my-house-fast-memphis ", destination: "/get-a-cash-offer-today", permanent: true },
      { source: "/cash-home-buyers-memphis", destination: "/", permanent: true },
      { source: "/reviews", destination: "/testimonials", permanent: true },
      { source: "/bookatime", destination: "https://api.leadconnectorhq.com/widget/bookings/spencerbuyhouses", permanent: true },
      // Other
      { source: "/blog/spencer-buys-houses-our-review-on-list-with-clever-2025", destination: "/blog/spencer-buys-houses-review-list-with-clever-2025", permanent: true },
      { source: "/tennessee-2/hickory-hill", destination: "/we-serve/tennessee/hickory-hill", permanent: true },
      { source: "/property/another-successful-closed-deal-2139-curry-eve-memphis-tn", destination: "/properties-we-bought", permanent: true },
      { source: "/tennessee", destination: "/", permanent: true },
      { source: "/blog/the-story-of-sally-the-seller-a-warning-for-memphis-homeowners", destination: "/blog/the-story-of-sally-the-seller-warning-for-memphis-homeowners", permanent: true },
      { source: "/blog/how-we-helped-a-memphis-homeowner-sell-fast-without-repairs", destination: "/blog/case-study-closed-another-deal-morningview-dr-memphis", permanent: true },
      { source: "/blog/sell-your-house-as-is-in-memphis", destination: "/blog/sell-your-memphis-home-as-is-in-2025", permanent: true },
      { source: "/blog/spencer-buys-houses-vs-bartlett-realtors-the-real-cost-breakdown-in-2026", destination: "/blog/spencer-buys-houses-vs-bartlett-realtors-real-cost-breakdown-2026", permanent: true },
      { source: "/property/414-cairn-cove-cordova-tn", destination: "/properties-we-bought", permanent: true },
      { source: "/blog/a-real-as-is-success-story-closed-2139-curry-eve-memphis", destination: "/blog/as-is-success-story-closed-2139-curry-eve-memphis", permanent: true },
      { source: "/property/under-contract-whitehaven-memphis-property/", destination: "/properties-we-bought", permanent: true },
      { source: "/mississippi", destination: "/", permanent: true },
      { source: "/blog/sell-inherited-house-memphis-2026-guide-for-families-handling-an-estate", destination: "/blog/sell-inherited-house-memphis-2026-guide-handling-estate", permanent: true },
      { source: "/blog/10-tips-to-sell-my-house-fast-memphis-in-2026", destination: "/blog/10-tips-to-sell-my-house-fast-memphis-2026", permanent: true },
      // { source: "/", destination: "/", permanent: true },

      // Tennessee
      { source: "/tennessee/germantown", destination: "/we-serve/tennessee/germantown", permanent: true },
      { source: "/tennessee/tennessee-hickory-hill", destination: "/we-serve/tennessee/hickory-hill", permanent: true },
      { source: "/tennessee-2/cordova", destination: "/we-serve/tennessee/cordova", permanent: true },
      { source: "/tennessee/whitehaven", destination: "/we-serve/tennessee/whitehaven", permanent: true },
      { source: "/tennessee/berclair", destination: "/we-serve/tennessee/berclair", permanent: true },
      { source: "/tennessee/bartlett", destination: "/we-serve/tennessee/bartlett", permanent: true },
      { source: "/tennessee/collierville", destination: "/we-serve/tennessee/collierville", permanent: true },
      { source: "/tennessee/millington", destination: "/we-serve/tennessee/millington", permanent: true },
      { source: "/tennessee/somerville", destination: "/we-serve/tennessee/somerville", permanent: true },
      { source: "/tennessee/raleigh", destination: "/we-serve/tennessee/raleigh", permanent: true },
      { source: "/tennessee/arlington", destination: "/we-serve/tennessee/arlington", permanent: true },
      // Mississippi
      { source: "/mississippi/byhalia", destination: "/we-serve/mississippi/byhalia", permanent: true },
      { source: "/mississippi/hernando", destination: "/we-serve/mississippi/hernando", permanent: true },
      { source: "/mississippi/horn-lake", destination: "/we-serve/mississippi/horn-lake", permanent: true },
      { source: "/mississippi/olive-branch", destination: "/we-serve/mississippi/olive-branch", permanent: true },
      { source: "/mississippi/southaven", destination: "/we-serve/mississippi/southaven", permanent: true },
    ];
  },
  output: "standalone",
  transpilePackages: ["leaflet", "react-leaflet", "react-leaflet-cluster"],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        // Matches regional S3 hostnames: bucket.s3.region.amazonaws.com
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
};

export default nextConfig;
