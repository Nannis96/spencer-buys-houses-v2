import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
