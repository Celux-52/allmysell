export const siteUrl = 'https://allmysell.com';

/**
 * Generates absolute alternate URLs for a given route,
 * including the strictly required `x-default` for Google.
 * 
 * @param enPath The English path (e.g. `/services/web-solutions` or `services/web-solutions`)
 * @param trPath The Turkish path (e.g. `/hizmetler/web-cozumleri` or `hizmetler/web-cozumleri`)
 * @param currentLang The current language of the page ('en' or 'tr')
 * @returns An alternates object for Next.js Metadata
 */
export function constructAlternates(enPath: string, trPath: string, currentLang: string = 'en') {
  // Ensure paths start with a slash if not empty
  const formattedEnPath = enPath && !enPath.startsWith('/') ? `/${enPath}` : enPath;
  const formattedTrPath = trPath && !trPath.startsWith('/') ? `/${trPath}` : trPath;

  const enUrl = `${siteUrl}/en${formattedEnPath}`;
  const trUrl = `${siteUrl}/tr${formattedTrPath}`;

  return {
    canonical: currentLang === 'tr' ? trUrl : enUrl,
    languages: {
      'en': enUrl,
      'tr': trUrl,
      'x-default': enUrl,
    },
  };
}

