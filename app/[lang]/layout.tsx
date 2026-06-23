import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import FloatingCTA from "@/components/FloatingCTA";
import { dictionaries, Locale } from "@/dictionaries";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });


const siteUrl = 'https://allmysell.com';

const seoData = {
  en: {
    title: "Allmysell LLC | Enterprise Software Development & Tech Agency",
    description: "St. Petersburg, FL-based tech agency specializing in B2B SaaS development, e-commerce automation, custom web platforms, and AI integrations. Scale your business today.",
    keywords: "allmysell, software agency st petersburg fl, enterprise software development, b2b saas development, e-commerce automation, headless commerce, ai integration, web platform development, react next.js agency, digital transformation, fractional cto, custom software solutions, mobile app development, strategic technology consulting",
    ogLocale: "en_US"
  },
  tr: {
    title: "Allmysell LLC | Kurumsal Yazılım Ajansı & E-Ticaret Altyapısı",
    description: "St. Petersburg, Florida ve Türkiye merkezli teknoloji partneriniz. B2B SaaS geliştirme, e-ticaret otomasyonu, yapay zeka entegrasyonu ve kurumsal web platformları inşa ediyoruz.",
    keywords: "allmysell, yazılım ajansı, kurumsal yazılım geliştirme, b2b saas geliştirme, e-ticaret otomasyonu, headless e-ticaret, yapay zeka entegrasyonu, web platformu geliştirme, react next.js ajansı, dijital dönüşüm, fractional cto, özel yazılım çözümleri, mobil uygulama geliştirme, stratejik teknoloji danışmanlığı, st petersburg yazılım şirketi",
    ogLocale: "tr_TR"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const data = seoData[lang as keyof typeof seoData] || seoData.en;

  return {
    metadataBase: new URL(siteUrl),
    verification: {
      google: "dKGiBtLhfxvP_CvDfhGKOLh2JqJU0tDQf_emZcbyd0I",
      yandex: "712b8435272d4503",
      other: {
        "naver-site-verification": "0b63d4358f3b9ebe8ded3facb84c25922215eb6d",
      },
    },
    title: {
      default: data.title,
      template: "%s | Allmysell LLC"
    },
    description: data.description,
    keywords: data.keywords,
    authors: [{ name: "Allmysell LLC" }],
    creator: "Allmysell LLC",
    publisher: "Allmysell LLC",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: data.ogLocale,
      url: `${siteUrl}/${lang}`,
      title: data.title,
      description: data.description,
      siteName: "Allmysell LLC",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Allmysell LLC Teknoloji Ajansı",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Allmysell LLC",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://www.linkedin.com/company/allmysell",
      "https://clutch.co/profile/allmysell-llc"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Allmysell LLC - US HQ",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "telephone": "+90-553-706-59-12",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7901 4th St N, Ste 300",
      "addressLocality": "St. Petersburg",
      "addressRegion": "FL",
      "postalCode": "33702",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.85",
      "longitude": "-82.64"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Allmysell LLC - Turkey",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "telephone": [
      "+90-553-706-59-12",
      "+90-551-834-30-30"
    ],
    "priceRange": "₺₺₺",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR"
    }
  }
];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = dictionaries[lang as Locale] || dictionaries['en'];
  return (
    <html lang={lang} className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased text-[#0A192F] selection:bg-[#0A192F] selection:text-white`}>
        {children}
        <FloatingCTA lang={lang} />
        <Newsletter lang={lang} />
        <Footer lang={lang} dict={dict} />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}
