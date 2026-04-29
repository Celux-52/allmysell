import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'AllMySell | Premium Tech & Mobile Accessories', template: '%s | AllMySell' },
  description: 'Shop premium technology products and mobile accessories at AllMySell. Discover high-quality chargers, power banks, car accessories, and phone cases with fast worldwide shipping.',
  keywords: ['buy tech accessories online', 'mobile accessories store', 'car phone holders', 'wireless power banks', 'AllMySell', 'premium phone cases', 'durable charging cables'],
  metadataBase: new URL('https://allmysell.com'),
  openGraph: {
    title: { default: 'AllMySell | Premium Tech & Mobile Accessories', template: '%s | AllMySell' },
    description: 'Shop premium technology products and mobile accessories at AllMySell. Discover high-quality chargers, power banks, and car accessories.',
    url: 'https://allmysell.com',
    siteName: 'AllMySell',
    images: [
      {
        url: 'https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp',
        width: 1200,
        height: 630,
        alt: 'AllMySell - E-Commerce Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: 'AllMySell | Premium Tech & Mobile Accessories', template: '%s | AllMySell' },
    description: 'Shop premium technology products and mobile accessories at AllMySell. Discover high-quality chargers, power banks, and car accessories.',
    images: ['https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_ID || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION_ID || '',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" translate="no" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${inter.className} bg-[#030712] text-slate-100 antialiased`} suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
