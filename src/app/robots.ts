import { fetchBaseUrl } from '@/Constants/urls';
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
 
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/private/', '/_next/'],
      },
    ],
    sitemap: `https://militaryschoolscoaching.com/sitemap.xml`,
  }
}