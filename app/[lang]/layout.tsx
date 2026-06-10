import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = 'https://allmysell.com';

const seoData = {
  en: {
    title: "Allmysell LLC | Premium Digital Solutions & Tech Agency",
    description: "Miami-based Allmysell LLC is your strategic technology partner building e-commerce autonomy, custom SaaS software, AI integrations, and enterprise web platforms.",
    keywords: ["software agency", "miami tech company", "e-commerce infrastructure", "saas development", "ai integration", "digital transformation", "enterprise web design", "mobile app development"],
    ogLocale: "en_US"
  },
  tr: {
    title: "Allmysell LLC | Premium Dijital Çözümler & Teknoloji Ajansı",
    description: "Miami merkezli Allmysell LLC; e-ticaret otonomisi, özel SaaS yazılımları, yapay zeka entegrasyonları ve kurumsal web platformları inşa eden stratejik teknoloji partnerinizdir.",
    keywords: ["yazılım ajansı", "miami teknoloji şirketi", "e-ticaret altyapısı", "saas geliştirme", "yapay zeka entegrasyonu", "dijital dönüşüm", "kurumsal web tasarım", "mobil uygulama geliştirme"],
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
    alternates: {
      canonical: siteUrl,
      languages: {
        'en-US': '/en',
        'tr-TR': '/tr',
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
    <html lang={lang} className="scroll-smooth">
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
