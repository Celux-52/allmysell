import { MetadataRoute } from 'next';

const locales = ['en', 'tr'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allmysell.com';

  const routes = [
    '',
    '/hizmetler/web-cozumleri',
    '/hizmetler/e-ticaret',
    '/hizmetler/saas-yazilimlari',
    '/hizmetler/stratejik-danismanlik',
    '/hizmetler/yapay-zeka',
    '/hizmetler/mobil-uygulama'
  ];

  return routes.flatMap((route) => {
    return locales.map((locale) => {
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : (route === '/hizmetler/yapay-zeka' ? 0.9 : 0.8),
        alternates: {
          languages: {
            'en-US': `${baseUrl}/en${route}`,
            'tr-TR': `${baseUrl}/tr${route}`
          }
        }
      } as MetadataRoute.Sitemap[number];
    });
  });
}
