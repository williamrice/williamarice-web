/**
 * Generate canonical URL for the site
 */
export function generateCanonicalUrl(path: string = ''): string {
  const baseUrl = 'https://williamarice.com';
  return `${baseUrl}${path}`;
}

/**
 * Generate metadata with canonical URL
 */
export function generateMetadataWithCanonical(path: string = '', title?: string, description?: string) {
  return {
    alternates: {
      canonical: generateCanonicalUrl(path),
    },
    ...(title && { title }),
    ...(description && { description }),
  };
}