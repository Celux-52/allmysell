import { MetadataRoute } from 'next';
import { getAllArticles } from '../lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://allmysell.com';

  // Static routes mapping — lastModified set to current build time
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/hizmetler/web-cozumleri', enPath: '/services/web-solutions', ruPath: '/uslugi/veb-resheniya', uzPath: '/xizmatlar/veb-yechimlar', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/e-ticaret', enPath: '/services/e-commerce', ruPath: '/uslugi/elektronnaya-kommerciya', uzPath: '/xizmatlar/elektron-tijorat', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/saas-yazilimlari', enPath: '/services/saas-software', ruPath: '/uslugi/saas-programmnoe-obespechenie', uzPath: '/xizmatlar/saas-dasturiy-taminot', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/stratejik-danismanlik', enPath: '/services/strategic-consulting', ruPath: '/uslugi/strategicheskiy-konsalting', uzPath: '/xizmatlar/strategik-konsalting', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/yapay-zeka', enPath: '/services/artificial-intelligence', ruPath: '/uslugi/iskusstvenniy-intellekt', uzPath: '/xizmatlar/suniy-idrok', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/mobil-uygulama', enPath: '/services/mobile-application', ruPath: '/uslugi/mobilnye-prilozheniya', uzPath: '/xizmatlar/mobil-ilovalar', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hizmetler/otomasyon', enPath: '/services/automation', ruPath: '/uslugi/avtomatizaciya', uzPath: '/xizmatlar/avtomatlashtirish', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hakkimizda', enPath: '/about-us', ruPath: '/o-nas', uzPath: '/biz-haqimizda', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/iletisim', enPath: '/contact', ruPath: '/kontakty', uzPath: '/aloqa', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/gizlilik-politikasi', enPath: '/privacy-policy', ruPath: '/politika-konfidencialnosti', uzPath: '/maxfiylik-siyosati', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cerez-politikasi', enPath: '/cookie-policy', ruPath: '/politika-kuki', uzPath: '/kuki-siyosati', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/blog', enPath: '/blog', ruPath: '/blog', uzPath: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/egitimler/ebay-dropshipping', enPath: '/courses/ebay-dropshipping', ruPath: '/kursy/ebay-dropshipping', uzPath: '/kurslar/ebay-dropshipping', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const sitemaps: MetadataRoute.Sitemap = [];

  // Generate sitemap for static routes
  staticRoutes.forEach((route) => {
    const trPath = route.path;
    const enPath = route.enPath || route.path;
    const ruPath = route.ruPath || route.path;
    const uzPath = route.uzPath || route.path;

    const languages = {
      'en': `${baseUrl}/en${enPath}`,
      'tr': `${baseUrl}/tr${trPath}`,
      'ru': `${baseUrl}/ru${ruPath}`,
      'uz': `${baseUrl}/uz${uzPath}`,
      'x-default': `${baseUrl}/en${enPath}`
    };

    // English version
    sitemaps.push({
      url: `${baseUrl}/en${enPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages }
    });

    // Turkish version
    sitemaps.push({
      url: `${baseUrl}/tr${trPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages }
    });

    // Russian version
    sitemaps.push({
      url: `${baseUrl}/ru${ruPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages }
    });

    // Uzbek version
    sitemaps.push({
      url: `${baseUrl}/uz${uzPath}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages }
    });
  });

  // Fetch dynamic blog articles — use dateISO for reliable parsing
  const articles = await getAllArticles('en');

  // Generate sitemap for dynamic blog articles
  articles.forEach((article: any) => {
    const routePath = `/blog/${article.slug}`;
    const articleDate = new Date(article.dateISO + 'T00:00:00Z');

    const languages = {
      'en': `${baseUrl}/en${routePath}`,
      'tr': `${baseUrl}/tr${routePath}`,
      'ru': `${baseUrl}/ru${routePath}`,
      'uz': `${baseUrl}/uz${routePath}`,
      'x-default': `${baseUrl}/en${routePath}`
    };

    // English version
    sitemaps.push({
      url: `${baseUrl}/en${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages }
    });

    // Turkish version
    sitemaps.push({
      url: `${baseUrl}/tr${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages }
    });

    // Russian version
    sitemaps.push({
      url: `${baseUrl}/ru${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages }
    });

    // Uzbek version
    sitemaps.push({
      url: `${baseUrl}/uz${routePath}`,
      lastModified: articleDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages }
    });
  });

  return sitemaps;
}
