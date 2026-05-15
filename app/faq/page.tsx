'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const faqCategories = [
  {
    category: 'Platform & SaaS Panel',
    questions: [
      { question: 'What is AllMySell?', answer: 'AllMySell is an AI-powered e-commerce automation platform. Our SaaS panel helps online sellers discover trending products, automate listing creation, and manage cross-platform operations — all from one dashboard.' },
      { question: 'How does the AI research tool work?', answer: 'Our AI Research Engine uses 2 dedicated AI models — NVIDIA Nemotron 3 Super for smart research and Xiaomi MiMo-V2-Flash for Etsy analysis — to analyze market trends, validate product opportunities, and provide data-driven insights with a confidence score.' },
      { question: 'Which platforms does AllMySell support?', answer: 'Our research tools cover major e-commerce platforms including eBay, Amazon, Etsy, Shopify, and TikTok Shop. We analyze trends and opportunities across all these marketplaces.' },
      { question: 'Is there a free trial?', answer: 'Yes! You can sign up and explore the platform for free. Our free tier includes limited AI research queries. Upgrade anytime for full access to all features.' },
    ]
  },
  {
    category: 'Web Development Services',
    questions: [
      { question: 'What web development packages do you offer?', answer: 'We offer three tiers: Basic Setup ($135) for professional homepages, Professional Growth ($285) with advanced SEO and analytics, and Full Ecosystem ($585) with complete e-commerce infrastructure and AI integration.' },
      { question: 'How long does a web project take?', answer: 'Depending on the package: Basic Setup takes 3-5 days, Professional Growth takes 7-12 days, and Full Ecosystem takes 15-25 days. We provide regular updates throughout the process.' },
      { question: 'Do you provide hosting?', answer: 'Domain and hosting costs are covered by the client. We help you set up and configure your hosting environment as part of the project. We recommend modern platforms like Vercel, Netlify, or traditional hosting providers.' },
      { question: 'What technologies do you use?', answer: 'We build with modern, production-grade technologies including Next.js, React, TypeScript, Tailwind CSS, and integrate with services like Supabase, Vercel, and various AI APIs.' },
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      { question: 'How do I create an account?', answer: 'Click "Get Started" on our homepage or visit the registration page. You can sign up with your email or use Google authentication for a one-click setup.' },
      { question: 'Is my data secure?', answer: 'Absolutely. We use enterprise-grade security with SSL encryption, Supabase authentication, and follow industry best practices for data protection. Your research data and account information are fully protected.' },
      { question: 'Can I delete my account?', answer: 'Yes. You can request account deletion at any time by contacting our support team. All your personal data will be permanently removed within 30 days of the request.' },
      { question: 'What authentication methods are supported?', answer: 'We support email/password authentication and Google OAuth. All sessions are securely managed with industry-standard token-based authentication.' },
    ]
  },
  {
    category: 'Billing & Support',
    questions: [
      { question: 'What payment methods do you accept?', answer: 'For web development services, we accept payments via bank transfer and digital payment methods. Payment terms are 50% upfront to secure your project slot, with the remainder due upon completion.' },
      { question: 'How can I contact support?', answer: 'You can reach us through our contact page, via WhatsApp (available on every page), or by email. We typically respond within 24 hours.' },
      { question: 'Do you offer refunds?', answer: 'For web development projects, we offer revisions within the project scope. If we cannot deliver what was agreed upon, we provide a full refund. SaaS subscriptions can be cancelled at any time.' },
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 px-6 text-left flex justify-between items-center hover:bg-white/[0.03] transition-colors rounded-lg">
        <span className="font-semibold text-white pr-4 text-sm">{question}</span>
        <ChevronDown className={`w-5 h-5 text-orange-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-5 text-slate-400 leading-relaxed text-sm">{answer}</div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20 mb-6">{t('faq.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {t('faq.title1')} <span className="gradient-text">{t('faq.title2')}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {faqCategories.map((category, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white">{category.category}</h2>
              </div>
              <div>{category.questions.map((item, qIndex) => (<FAQItem key={qIndex} question={item.question} answer={item.answer} />))}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('faq.stillQ')}</h2>
          <p className="text-slate-400 mb-6">{t('faq.cantFind')}</p>
          <a href="/contact" className="btn-primary inline-block"><span>{t('faq.contactUs')}</span></a>
        </div>
      </div>
    </div>
  );
}
