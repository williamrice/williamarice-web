import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/account-settings/', '/fuel-tracker/'],
    },
    sitemap: 'https://williamarice.com/sitemap.xml',
  };
}
