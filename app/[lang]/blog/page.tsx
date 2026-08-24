import { Metadata } from 'next';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Blog & Insights',
      description: 'Read the latest technical articles, B2B insights, and SaaS engineering practices from the Allmysell LLC team.',
      keywords: 'allmysell blog, software engineering blog, b2b saas insights, headless commerce articles',
    },
    back: 'Back to Home',
    tag: 'Knowledge Hub',
    title: 'Insights & Engineering',
    readMore: 'Read Article',
    minRead: 'min read',
  },
  tr: {
    meta: {
      title: 'Blog ve İçerik Merkezi',
      description: 'Allmysell LLC ekibinden en son teknik makaleleri, B2B içgörülerini ve SaaS mühendislik pratiklerini okuyun.',
      keywords: 'allmysell blog, yazılım mühendisliği blogu, b2b saas makaleleri, headless e-ticaret',
    },
    back: 'Anasayfaya Dön',
    tag: 'Bilgi Merkezi',
    title: 'İçgörüler ve Mühendislik',
    readMore: 'Makaleyi Oku',
    minRead: 'dk okuma',
  },
  ru: {
    meta: {
      title: 'Блог и База Знаний',
      description: 'Читайте новейшие технические статьи, B2B аналитику и практики разработки SaaS от команды Allmysell LLC.',
      keywords: 'блог allmysell, статьи по разработке по, b2b saas аналитика, headless commerce, ebay дропшиппинг',
    },
    back: 'На Главную',
    tag: 'База Знаний',
    title: 'Аналитика и Технологии',
    readMore: 'Читать статью',
    minRead: 'мин чтения',
  },
  uz: {
    meta: {
      title: 'Blog va Maqolalar Markazi',
      description: 'Allmysell LLC jamoasining eng so\'nggi texnik maqolalari, B2B tahlillari va SaaS muhandislik amaliyotlarini o\'qing.',
      keywords: 'allmysell blogi, dasturlash maqolalari, b2b saas tahlillari, headless e-tijorat, ebay dropshipping',
    },
    back: 'Bosh Sahifaga Qaytish',
    tag: 'Bilimlar Markazi',
    title: 'Tahlil va Muhandislik',
    readMore: 'Maqolani o\'qish',
    minRead: 'daqiqalik o\'qish',
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: constructAlternates('blog', 'blog', lang, 'blog', 'blog')
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'tr' | 'ru' | 'uz';
  const dict = content[lang as keyof typeof content] || content.en;
  
  const articles = await getAllArticles(lang);

  const inLanguageMap = {
    tr: 'tr-TR',
    ru: 'ru-RU',
    uz: 'uz-UZ',
    en: 'en-US'
  };

  // CollectionPage schema for blog listing
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": dict.meta.title,
    "description": dict.meta.description,
    "url": `https://allmysell.com/${lang}/blog`,
    "inLanguage": inLanguageMap[lang] || 'en-US',
    "isPartOf": {
      "@type": "WebSite",
      "name": "Allmysell LLC",
      "url": "https://allmysell.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": articles.length,
      "itemListElement": articles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://allmysell.com/${lang}/blog/${article.slug}`,
        "name": article.title
      }))
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-5xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <BookOpen className="w-6 h-6 text-blue-300" />
              </div>
              <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link prefetch={false} href={`/${lang}/blog/${article.slug}`} key={index} className="group flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                      <Clock className="w-4 h-4" /> {article.date}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A192F] mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0A192F] group-hover:text-blue-600 transition-colors flex items-center">
                      {dict.readMore} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {article.readingTime} {dict.minRead}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
