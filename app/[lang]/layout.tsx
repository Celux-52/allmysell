import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = 'https://allmysell.com';

const seoData = {
  en: {
    title: "Allmysell LLC | Enterprise Software Development & Tech Agency",
    description: "Miami-based tech agency specializing in B2B SaaS development, e-commerce automation, custom web platforms, and AI integrations. Scale your business today.",
    ogLocale: "en_US"
  },
  tr: {
    title: "Allmysell LLC | Kurumsal Yazılım Ajansı & E-Ticaret Altyapısı",
    description: "Miami ve Türkiye merkezli teknoloji partneriniz. B2B SaaS geliştirme, e-ticaret otomasyonu, yapay zeka entegrasyonu ve kurumsal web platformları inşa ediyoruz.",
    ogLocale: "tr_TR"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const data = seoData[lang as keyof typeof seoData] || seoData.en;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: data.title,
      template: "%s | Allmysell LLC"
    },
    description: data.description,
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
      url: siteUrl,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Allmysell LLC",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "sameAs": [
    "https://www.linkedin.com/company/allmysell",
    "https://twitter.com/allmysell",
    "https://instagram.com/allmysell"
  ],
  "knowsAbout": [
    "E-commerce Autonomy",
    "SaaS Development",
    "Artificial Intelligence Integration",
    "Web Development",
    "Digital Transformation",
    "Mobile Applications"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+90-553-706-59-12",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+90-551-834-30-30",
      "contactType": "sales"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  return (
    <html lang={lang} className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-[#0A192F] selection:bg-[#0A192F] selection:text-white`}>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
