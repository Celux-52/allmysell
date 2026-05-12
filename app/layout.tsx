import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import HideOnRoutes from '@/components/HideOnRoutes';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'AllMySell | AI-Powered E-Commerce Automation Platform', template: '%s | AllMySell' },
  description: 'Scale your e-commerce business with AllMySell. AI-powered trend research, automated listing, cross-platform management, and professional web development services.',
  keywords: ['e-commerce automation', 'AI trend research', 'SaaS platform', 'web development services', 'AllMySell', 'online business tools', 'e-commerce software'],
  metadataBase: new URL('https://allmysell.com'),
  openGraph: {
    title: { default: 'AllMySell | AI-Powered E-Commerce Automation Platform', template: '%s | AllMySell' },
    description: 'Scale your e-commerce business with AllMySell. AI-powered trend research, automated listing, and professional web development services.',
    url: 'https://allmysell.com',
    siteName: 'AllMySell',
    images: [
      {
        url: 'https://allmysell.com/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'AllMySell - E-Commerce Automation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: 'AllMySell | AI-Powered E-Commerce Automation Platform', template: '%s | AllMySell' },
    description: 'Scale your e-commerce business with AllMySell. AI-powered trend research, automated listing, and professional web development services.',
    images: ['https://allmysell.com/favicon.svg'],
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
    <html lang="en" className={cn("dark", "font-sans", geist.variable)} translate="no" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${inter.className} bg-[#030712] text-slate-100 antialiased`} suppressHydrationWarning>
        <HideOnRoutes>
          <Navigation />
        </HideOnRoutes>
        <main className="min-h-screen">
          {children}
        </main>
        <HideOnRoutes>
          <Footer />
          <WhatsAppButton />
        </HideOnRoutes>
        <CookieBanner />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
