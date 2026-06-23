import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'tr'];
const defaultLocale = 'en';

// Map of english routes to their underlying file system paths
const englishRouteMap: Record<string, string> = {
  '/en/services/web-solutions': '/en/hizmetler/web-cozumleri',
  '/en/services/e-commerce': '/en/hizmetler/e-ticaret',
  '/en/services/saas-software': '/en/hizmetler/saas-yazilimlari',
  '/en/services/strategic-consulting': '/en/hizmetler/stratejik-danismanlik',
  '/en/services/artificial-intelligence': '/en/hizmetler/yapay-zeka',
  '/en/services/mobile-application': '/en/hizmetler/mobil-uygulama',
  '/en/about-us': '/en/hakkimizda',
  '/en/contact': '/en/iletisim',
  '/en/privacy-policy': '/en/gizlilik-politikasi',
  '/en/cookie-policy': '/en/cerez-politikasi',
  '/en/blog': '/en/blog'
};

// Reverse map for redirecting direct visits to the turkish slug in english locale
const reverseEnglishRouteMap: Record<string, string> = {
  '/en/hizmetler/web-cozumleri': '/en/services/web-solutions',
  '/en/hizmetler/e-ticaret': '/en/services/e-commerce',
  '/en/hizmetler/saas-yazilimlari': '/en/services/saas-software',
  '/en/hizmetler/stratejik-danismanlik': '/en/services/strategic-consulting',
  '/en/hizmetler/yapay-zeka': '/en/services/artificial-intelligence',
  '/en/hizmetler/mobil-uygulama': '/en/services/mobile-application',
  '/en/hakkimizda': '/en/about-us',
  '/en/iletisim': '/en/contact',
  '/en/gizlilik-politikasi': '/en/privacy-policy',
  '/en/cerez-politikasi': '/en/cookie-policy'
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

  // Handle english route rewrites
  if (englishRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = englishRouteMap[pathname];
    return NextResponse.rewrite(url);
  }

  // Redirect if someone tries to access the turkish slug in english locale
  if (reverseEnglishRouteMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = reverseEnglishRouteMap[pathname];
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
