import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import React from 'react';

export type ServiceContent = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  back: string;
  tag: string;
  title: string;
  p1: string;
  h2_1: string;
  p2: string;
  f1_title: string;
  f1_desc: string;
  f2_title: string;
  f2_desc: string;
  h2_2: string;
  p3: string;
  h2_3: string;
  p4: string;
  h2_4: string;
  tech_1_title: string;
  tech_1_desc: string;
  tech_2_title: string;
  tech_2_desc: string;
  tech_3_title: string;
  tech_3_desc: string;
  faq_title: string;
  faq_1_q: string;
  faq_1_a: string;
  faq_2_q: string;
  faq_2_a: string;
  faq_3_q: string;
  faq_3_a: string;
  faq_4_q: string;
  faq_4_a: string;
};

export interface ServicePageTemplateProps {
  lang: string;
  dict: ServiceContent;
  HeaderIcon: React.ElementType;
  Feature1Icon: React.ElementType;
  Feature2Icon: React.ElementType;
}

export default function ServicePageTemplate({
  lang,
  dict,
  HeaderIcon,
  Feature1Icon,
  Feature2Icon
}: ServicePageTemplateProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": dict.title,
    "provider": {
      "@type": "Organization",
      "name": "Allmysell LLC"
    },
    "description": dict.meta.description,
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${dict.title} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": dict.f1_title,
            "description": dict.f1_desc
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": dict.f2_title,
            "description": dict.f2_desc
          }
        }
      ]
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": dict.faq_1_q, "acceptedAnswer": { "@type": "Answer", "text": dict.faq_1_a } },
      { "@type": "Question", "name": dict.faq_2_q, "acceptedAnswer": { "@type": "Answer", "text": dict.faq_2_a } },
      { "@type": "Question", "name": dict.faq_3_q, "acceptedAnswer": { "@type": "Answer", "text": dict.faq_3_a } },
      { "@type": "Question", "name": dict.faq_4_q, "acceptedAnswer": { "@type": "Answer", "text": dict.faq_4_a } }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <HeaderIcon className="w-6 h-6 text-indigo-300" />
              </div>
              <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-indigo-600 pl-6">
              {dict.p1}
            </p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_1}</h2>
            <p>{dict.p2}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Feature1Icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Feature2Icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f2_title}</h3>
                <p className="text-slate-500">{dict.f2_desc}</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_2}</h2>
            <p>{dict.p3}</p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_3}</h2>
            <p>{dict.p4}</p>
            
            <hr className="my-16 border-slate-200" />
            
            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_4}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_1_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_1_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_2_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_2_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_3_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_3_desc}</p>
              </div>
            </div>

            <hr className="my-16 border-slate-200" />

            <h2 className="text-3xl font-bold text-[#0A192F] mb-8 tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
              {dict.faq_title}
            </h2>
            <div className="space-y-6 not-prose">
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_1_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_1_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_2_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_2_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_3_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_3_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_4_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_4_a}</p>
              </details>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
