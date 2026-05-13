import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Other
      { source: "/how-we-buy-houses", destination: "/how-it-works", permanent: true },
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
