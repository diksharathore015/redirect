/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    webpackMemoryOptimizations: true
  },
  images: {
    domains: [
      "127.0.0.1",
      "scontent.cdninstagram.com",
      "65.2.63.7",
      "3.110.189.42",
      "13.203.78.165",
      "rdabucket.s3.amazonaws.com",
      "43.204.144.192"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://militaryschoolscoaching.com/:path*",
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
