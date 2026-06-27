import { MetadataRoute } from 'next';
import { getAllArticles } from '../lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://allmysell.com';

  // Static routes mapping — lastModified set to current build time
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/hizmetler/web-cozumleri', enPath: '/services/web-solutions', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/e-ticaret', enPath: '/services/e-commerce', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/saas-yazilimlari', enPath: '/services/saas-software', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/stratejik-danismanlik', enPath: '/services/strategic-consulting', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/yapay-zeka', enPath: '/services/artificial-intelligence', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/mobil-uygulama', enPath: '/services/mobile-application', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hakkimizda', enPath: '/about-us', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/iletisim', enPath: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/gizlilik-politikasi', enPath: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cerez-politikasi', enPath: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/blog', enPath: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  const sitemaps: MetadataRoute.Sitemap = [];

  // Generate sitemap for static routes
  staticRoutes.forEach((route) => {
    const trPath = route.path;
    const enPath = route.enPath || route.path;

    // English version
    sitemaps.push({
      url: `${baseUrl}/en${enPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'en': `${baseUrl}/en${enPath}`,
          'tr': `${baseUrl}/tr${trPath}`,
          'x-default': `${baseUrl}/en${enPath}`
        }
      }
    });

    // Turkish version
    sitemaps.push({
      url: `${baseUrl}/tr${trPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'en': `${baseUrl}/en${enPath}`,
          'tr': `${baseUrl}/tr${trPath}`,
          'x-default': `${baseUrl}/en${enPath}`
        }
      }
    });
  });

  // Fetch dynamic blog articles — use dateISO for reliable parsing
  const articles = await getAllArticles('en');

  // Generate sitemap for dynamic blog articles
  articles.forEach((article: any) => {
    const routePath = `/blog/${article.slug}`;
    const articleDate = new Date(article.dateISO + 'T00:00:00Z');

    // English version
    sitemaps.push({
      url: `${baseUrl}/en${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}/en${routePath}`,
          'tr': `${baseUrl}/tr${routePath}`,
          'x-default': `${baseUrl}/en${routePath}`
        }
      }
    });

    // Turkish version
    sitemaps.push({
      url: `${baseUrl}/tr${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'en': `${baseUrl}/en${routePath}`,
          'tr': `${baseUrl}/tr${routePath}`,
          'x-default': `${baseUrl}/en${routePath}`
        }
      }
    });
  });

  return sitemaps;
}
