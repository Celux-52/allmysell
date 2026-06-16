import { Metadata } from 'next';
import { ArrowLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const slug = resolvedParams.slug;
  const article = await getArticleBySlug(slug, lang as 'en' | 'tr');
  const enArticle = await getArticleBySlug(slug, 'en');

  if (!article || !enArticle) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: constructAlternates(`blog/${slug}`, `blog/${slug}`, lang),
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: new Date(enArticle.date).toISOString(),
      authors: [article.author],
      url: `https://allmysell.com/${lang}/blog/${slug}`,
      siteName: 'Allmysell LLC',
      images: [
        {
          url: 'https://allmysell.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ]
    }
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles('en');
  return articles.flatMap((a) =>
    ['en', 'tr'].map((lang) => ({ lang, slug: a.slug }))
  );
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const slug = resolvedParams.slug;
  
  const article = await getArticleBySlug(slug, lang as 'en' | 'tr');
  const enArticle = await getArticleBySlug(slug, 'en');
  const backText = lang === 'tr' ? 'Blog\'a Dön' : 'Back to Blog';

  if (!article || !enArticle) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">404 - Article Not Found</div>;
  }

  const publishedTime = new Date(enArticle.date).toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": [
      "https://allmysell.com/og-image.jpg"
    ],
    "datePublished": publishedTime,
    "dateModified": publishedTime,
    "author": [{
        "@type": "Person",
        "name": article.author,
        "url": `https://allmysell.com/${lang}/about-us`
      }],
    "publisher": {
        "@type": "Organization",
        "name": "Allmysell LLC",
        "logo": {
            "@type": "ImageObject",
            "url": "https://allmysell.com/logo.png"
        }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": lang === 'tr' ? 'Ana Sayfa' : 'Home',
            "item": `https://allmysell.com/${lang}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `https://allmysell.com/${lang}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://allmysell.com/${lang}/blog/${slug}`
          }
        ]
      }) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full bg-[#0A192F] relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
            <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {backText}
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-blue-900 bg-blue-300 px-3 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
              <span className="text-sm font-medium text-white/60 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.date}</span>
            </div>
            
            <h1 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-3 border-t border-white/10 pt-6 mt-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <User className="w-5 h-5 text-white/60" />
              </div>
              <div className="text-sm font-semibold text-white/80">{article.author}</div>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <div 
              className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#0A192F] prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-bold prose-h3:text-[#0A192F] prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-strong:text-[#0A192F] prose-li:mb-2 prose-ul:mb-6"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          </div>
        </article>
      </div>
    </>
  );
}
