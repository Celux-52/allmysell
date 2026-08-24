export const siteUrl = 'https://allmysell.com';

/**
 * Generates absolute alternate URLs for a given route across all 4 supported languages (en, tr, ru, uz),
 * including the strictly required `x-default` for Google.
 * 
 * @param enPath The English path (e.g. `/services/web-solutions` or `services/web-solutions`)
 * @param trPath The Turkish path (e.g. `/hizmetler/web-cozumleri` or `hizmetler/web-cozumleri`)
 * @param currentLang The current language of the page ('en', 'tr', 'ru', 'uz')
 * @param ruPath The Russian path (e.g. `/uslugi/veb-resheniya`)
 * @param uzPath The Uzbek path (e.g. `/xizmatlar/veb-yechimlar`)
 * @returns An alternates object for Next.js Metadata
 */
export function constructAlternates(
  enPath: string, 
  trPath: string, 
  currentLang: string = 'en',
  ruPath?: string,
  uzPath?: string
) {
  // Ensure paths start with a slash if not empty
  const formattedEnPath = enPath && !enPath.startsWith('/') ? `/${enPath}` : (enPath || '');
  const formattedTrPath = trPath && !trPath.startsWith('/') ? `/${trPath}` : (trPath || '');
  const formattedRuPath = ruPath ? (!ruPath.startsWith('/') ? `/${ruPath}` : ruPath) : formattedEnPath;
  const formattedUzPath = uzPath ? (!uzPath.startsWith('/') ? `/${uzPath}` : uzPath) : formattedEnPath;

  const enUrl = `${siteUrl}/en${formattedEnPath}`;
  const trUrl = `${siteUrl}/tr${formattedTrPath}`;
  const ruUrl = `${siteUrl}/ru${formattedRuPath}`;
  const uzUrl = `${siteUrl}/uz${formattedUzPath}`;

  const currentUrl = 
    currentLang === 'tr' ? trUrl :
    currentLang === 'ru' ? ruUrl :
    currentLang === 'uz' ? uzUrl : enUrl;

  return {
    canonical: currentUrl,
    languages: {
      'en': enUrl,
      'tr': trUrl,
      'ru': ruUrl,
      'uz': uzUrl,
      'x-default': enUrl,
    },
  };
}
