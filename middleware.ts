import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'tr', 'ru', 'uz'];
const defaultLocale = 'en';

// Map of english routes to their underlying file system paths
const englishRouteMap: Record<string, string> = {
  '/en/services/web-solutions': '/en/hizmetler/web-cozumleri',
  '/en/services/e-commerce': '/en/hizmetler/e-ticaret',
  '/en/services/saas-software': '/en/hizmetler/saas-yazilimlari',
  '/en/services/strategic-consulting': '/en/hizmetler/stratejik-danismanlik',
  '/en/services/artificial-intelligence': '/en/hizmetler/yapay-zeka',
  '/en/services/mobile-application': '/en/hizmetler/mobil-uygulama',
  '/en/services/automation': '/en/hizmetler/otomasyon',
  '/en/about-us': '/en/hakkimizda',
  '/en/contact': '/en/iletisim',
  '/en/privacy-policy': '/en/gizlilik-politikasi',
  '/en/cookie-policy': '/en/cerez-politikasi',
  '/en/blog': '/en/blog',
  '/en/courses/ebay-dropshipping': '/en/egitimler/ebay-dropshipping'
};

// Reverse map for redirecting direct visits to the turkish slug in english locale
const reverseEnglishRouteMap: Record<string, string> = {
  '/en/hizmetler/web-cozumleri': '/en/services/web-solutions',
  '/en/hizmetler/e-ticaret': '/en/services/e-commerce',
  '/en/hizmetler/saas-yazilimlari': '/en/services/saas-software',
  '/en/hizmetler/stratejik-danismanlik': '/en/services/strategic-consulting',
  '/en/hizmetler/yapay-zeka': '/en/services/artificial-intelligence',
  '/en/hizmetler/mobil-uygulama': '/en/services/mobile-application',
  '/en/hizmetler/otomasyon': '/en/services/automation',
  '/en/hakkimizda': '/en/about-us',
  '/en/iletisim': '/en/contact',
  '/en/gizlilik-politikasi': '/en/privacy-policy',
  '/en/cerez-politikasi': '/en/cookie-policy',
  '/en/egitimler/ebay-dropshipping': '/en/courses/ebay-dropshipping'
};

// Map of russian routes to their underlying file system paths
const russianRouteMap: Record<string, string> = {
  '/ru/uslugi/veb-resheniya': '/ru/hizmetler/web-cozumleri',
  '/ru/uslugi/elektronnaya-kommerciya': '/ru/hizmetler/e-ticaret',
  '/ru/uslugi/saas-programmnoe-obespechenie': '/ru/hizmetler/saas-yazilimlari',
  '/ru/uslugi/strategicheskiy-konsalting': '/ru/hizmetler/stratejik-danismanlik',
  '/ru/uslugi/iskusstvenniy-intellekt': '/ru/hizmetler/yapay-zeka',
  '/ru/uslugi/mobilnye-prilozheniya': '/ru/hizmetler/mobil-uygulama',
  '/ru/uslugi/avtomatizaciya': '/ru/hizmetler/otomasyon',
  '/ru/o-nas': '/ru/hakkimizda',
  '/ru/kontakty': '/ru/iletisim',
  '/ru/politika-konfidencialnosti': '/ru/gizlilik-politikasi',
  '/ru/politika-kuki': '/ru/cerez-politikasi',
  '/ru/blog': '/ru/blog',
  '/ru/kursy/ebay-dropshipping': '/ru/egitimler/ebay-dropshipping'
};

// Reverse map for russian
const reverseRussianRouteMap: Record<string, string> = {
  '/ru/hizmetler/web-cozumleri': '/ru/uslugi/veb-resheniya',
  '/ru/hizmetler/e-ticaret': '/ru/uslugi/elektronnaya-kommerciya',
  '/ru/hizmetler/saas-yazilimlari': '/ru/uslugi/saas-programmnoe-obespechenie',
  '/ru/hizmetler/stratejik-danismanlik': '/ru/uslugi/strategicheskiy-konsalting',
  '/ru/hizmetler/yapay-zeka': '/ru/uslugi/iskusstvenniy-intellekt',
  '/ru/hizmetler/mobil-uygulama': '/ru/uslugi/mobilnye-prilozheniya',
  '/ru/hizmetler/otomasyon': '/ru/uslugi/avtomatizaciya',
  '/ru/hakkimizda': '/ru/o-nas',
  '/ru/iletisim': '/ru/kontakty',
  '/ru/gizlilik-politikasi': '/ru/politika-konfidencialnosti',
  '/ru/cerez-politikasi': '/ru/politika-kuki',
  '/ru/egitimler/ebay-dropshipping': '/ru/kursy/ebay-dropshipping'
};

// Map of uzbek routes to their underlying file system paths
const uzbekRouteMap: Record<string, string> = {
  '/uz/xizmatlar/veb-yechimlar': '/uz/hizmetler/web-cozumleri',
  '/uz/xizmatlar/elektron-tijorat': '/uz/hizmetler/e-ticaret',
  '/uz/xizmatlar/saas-dasturiy-taminot': '/uz/hizmetler/saas-yazilimlari',
  '/uz/xizmatlar/strategik-konsalting': '/uz/hizmetler/stratejik-danismanlik',
  '/uz/xizmatlar/suniy-idrok': '/uz/hizmetler/yapay-zeka',
  '/uz/xizmatlar/mobil-ilovalar': '/uz/hizmetler/mobil-uygulama',
  '/uz/xizmatlar/avtomatlashtirish': '/uz/hizmetler/otomasyon',
  '/uz/biz-haqimizda': '/uz/hakkimizda',
  '/uz/aloqa': '/uz/iletisim',
  '/uz/maxfiylik-siyosati': '/uz/gizlilik-politikasi',
  '/uz/kuki-siyosati': '/uz/cerez-politikasi',
  '/uz/blog': '/uz/blog',
  '/uz/kurslar/ebay-dropshipping': '/uz/egitimler/ebay-dropshipping'
};

// Reverse map for uzbek
const reverseUzbekRouteMap: Record<string, string> = {
  '/uz/hizmetler/web-cozumleri': '/uz/xizmatlar/veb-yechimlar',
  '/uz/hizmetler/e-ticaret': '/uz/xizmatlar/elektron-tijorat',
  '/uz/hizmetler/saas-yazilimlari': '/uz/xizmatlar/saas-dasturiy-taminot',
  '/uz/hizmetler/stratejik-danismanlik': '/uz/xizmatlar/strategik-konsalting',
  '/uz/hizmetler/yapay-zeka': '/uz/xizmatlar/suniy-idrok',
  '/uz/hizmetler/mobil-uygulama': '/uz/xizmatlar/mobil-ilovalar',
  '/uz/hizmetler/otomasyon': '/uz/xizmatlar/avtomatlashtirish',
  '/uz/hakkimizda': '/uz/biz-haqimizda',
  '/uz/iletisim': '/uz/aloqa',
  '/uz/gizlilik-politikasi': '/uz/maxfiylik-siyosati',
  '/uz/cerez-politikasi': '/uz/kuki-siyosati',
  '/uz/egitimler/ebay-dropshipping': '/uz/kurslar/ebay-dropshipping'
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, images, api routes
  if (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Handle route rewrites
  if (englishRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = englishRouteMap[pathname];
    return NextResponse.rewrite(url);
  }
  if (russianRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = russianRouteMap[pathname];
    return NextResponse.rewrite(url);
  }
  if (uzbekRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = uzbekRouteMap[pathname];
    return NextResponse.rewrite(url);
  }

  // Redirect if someone tries to access the turkish slug in other locales
  if (reverseEnglishRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = reverseEnglishRouteMap[pathname];
    return NextResponse.redirect(url, 308);
  }
  if (reverseRussianRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = reverseRussianRouteMap[pathname];
    return NextResponse.redirect(url, 308);
  }
  if (reverseUzbekRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = reverseUzbekRouteMap[pathname];
    return NextResponse.redirect(url, 308);
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
