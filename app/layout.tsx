import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = 'https://allmysell.com'; // Change this to your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allmysell LLC | Premium Dijital Çözümler & Teknoloji Ajansı",
    template: "%s | Allmysell LLC"
  },
  description: "Miami merkezli Allmysell LLC; e-ticaret otonomisi, özel SaaS yazılımları, yapay zeka entegrasyonları ve kurumsal web platformları inşa eden stratejik teknoloji partnerinizdir.",
  keywords: ["yazılım ajansı", "miami teknoloji şirketi", "e-ticaret altyapısı", "saas geliştirme", "yapay zeka entegrasyonu", "dijital dönüşüm", "kurumsal web tasarım", "mobil uygulama geliştirme"],
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
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    title: "Allmysell LLC | Premium Dijital Çözümler & Teknoloji Ajansı",
    description: "Şirketinizin dijital altyapısını bir satış makinesine dönüştürüyoruz. Miami merkezli kurumsal teknoloji partneriniz.",
    siteName: "Allmysell LLC",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // You can put a real image in public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Allmysell LLC Teknoloji Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allmysell LLC | Premium Dijital Çözümler",
    description: "Şirketinizin dijital altyapısını bir satış makinesine dönüştürüyoruz.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Allmysell LLC",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-[#0A192F] selection:bg-[#0A192F] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
