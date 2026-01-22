import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AllMySell - Technology & Mobile Accessories E-Commerce',
  description: 'Technology and mobile accessory products on eBay. Chargers, power banks, car accessories, phone cases and more. Our Amazon, Etsy, Shopify and TikTok Shop stores coming soon!',
  keywords: 'e-commerce, eBay, technology, mobile accessories, chargers, power bank, car accessories, online shopping',
  metadataBase: new URL('https://allmysell.com'),
  openGraph: {
    title: 'AllMySell - Technology & Mobile Accessories E-Commerce',
    description: 'Technology and mobile accessory products on eBay. Chargers, power banks, car accessories, phone cases and more.',
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
    title: 'AllMySell - Technology & Mobile Accessories E-Commerce',
    description: 'Technology and mobile accessory products on eBay. Chargers, power banks, car accessories, phone cases and more.',
    images: ['https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="fb:app_id" content="1234567890" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
