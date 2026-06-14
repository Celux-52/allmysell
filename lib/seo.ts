export const siteUrl = 'https://allmysell.com';

/**
 * Generates absolute alternate URLs for a given route,
 * including the strictly required `x-default` for Google.
 * 
 * @param enPath The English path (e.g. `/services/web-solutions`)
 * @param trPath The Turkish path (e.g. `/hizmetler/web-cozumleri`)
 * @returns An alternates object for Next.js Metadata
 */
export function constructAlternates(enPath: string, trPath: string) {
  // Ensure paths start with a slash if not empty
  const formattedEnPath = enPath && !enPath.startsWith('/') ? `/${enPath}` : enPath;
  const formattedTrPath = trPath && !trPath.startsWith('/') ? `/${trPath}` : trPath;

  const enUrl = `${siteUrl}/en${formattedEnPath}`;
  const trUrl = `${siteUrl}/tr${formattedTrPath}`;

  return {
    canonical: enUrl, // Default fallback
    languages: {
      'en': enUrl,
      'tr': trUrl,
      'x-default': enUrl, // Google requires this for the default fallback language
    },
  };
}
