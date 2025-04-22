/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = {
  /* config options here */
  
  experimental : {
    "webpackMemoryOptimizations" : true
  } ,
  images: {
    
    domains: [         
      "127.0.0.1"  ,
      "scontent.cdninstagram.com",   
      "65.2.63.7",
      "3.110.189.42", 
      "13.203.78.165",
      "rdabucket.s3.amazonaws.com" ,
      "43.204.144.192"
    ],
    // : true,
 
  
  },  
  typescript: {
    ignoreBuildErrors: true, 
  }, 
  async rewrites() {
    return [
      // Rule 1: Map `/course/:slug` to `/slug`
      // {
      //   source: "https://royaldefenceacademy.com/:path*",
      //   destination: "https://www.royalfenceacademy.com/:path*",
      //   permanent: true, // 301 redirect
      // },
      {
        source: '/blogs/:slug',
        destination: '/blogs/:slug',
      },
      {
        source: '/news/:slug',
        destination: '/news/:slug',
      },
      {
        source: '/indexingText/:slug',
        destination: '/indexingText/:slug',
      },
      {
        source: '/:slug',
        
        destination: '/course/:slug',
      },

      // Nested paths under `/course/:slug/:path*`
      {
        source: '/:slug/:path*',
        destination: '/course/:slug/:path*',
      },
      // {
      //   source: '/:slug',
      //   destination: '/course/:slug', // `/slug` dynamic page
      // },
      // // Rule 2: Map `/course/:slug/:path*` to `/slug/:path*`
      // {
      //   source: '/:slug/:path*',
      //   destination: '/course/:slug/:path*', // `/slug` dynamic page
      // },
 
    ];
  }
  
  
  
};

export default nextConfig;
