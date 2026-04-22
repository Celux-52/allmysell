import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Solutions - AllMySell | Professional Web Design Services',
  description: 'Professional website solutions for your shop or brand. 3 packages from basic setup to full ecosystem. Domain, hosting, and SSL are covered by the buyer.',
  keywords: ['web design', 'website', 'e-commerce', 'SEO', 'web solutions', 'AllMySell'],
};

const plans = [
  {
    id: 'temel',
    badge: '🥉',
    level: 'Level 1',
    name: 'Basic Setup',
    subtitle: '"Build & Deliver"',
    price: '4,500 ₺',
    priceUSD: '~$135',
    delivery: '3–5 business days',
    revisions: '2 revisions',
    support: '7-day post-delivery support',
    highlight: false,
    features: [
      { text: 'Homepage (Professional Design)', included: true },
      { text: 'About Page', included: true },
      { text: 'Services Page', included: true },
      { text: 'Contact Page', included: true },
      { text: 'Mobile Responsive', included: true },
      { text: 'Google Maps Integration', included: true },
      { text: 'Contact Form', included: true },
      { text: 'SEO Optimization', included: false },
      { text: 'Corporate Email Setup', included: false },
      { text: 'Google Analytics', included: false },
      { text: 'E-Commerce / Stock Management', included: false },
      { text: 'Booking System / AI Bot', included: false },
    ],
    targetAudience: 'Small businesses, newly opened shops, and businesses that simply want to appear on Google.',
  },
  {
    id: 'profesyonel',
    badge: '🥈',
    level: 'Level 2',
    name: 'Professional Growth',
    subtitle: '"In-Depth Work"',
    price: '9,500 ₺',
    priceUSD: '~$285',
    delivery: '7–12 business days',
    revisions: '5 revisions',
    support: '21-day post-delivery support',
    highlight: true,
    features: [
      { text: 'Everything in Basic Setup', included: true },
      { text: 'Advanced SEO (Rank on Google)', included: true },
      { text: 'Site Speed Optimization', included: true },
      { text: 'Professional Content & Image Layout', included: true },
      { text: 'Corporate Email (info@, support@...)', included: true },
      { text: 'Blog / News Section', included: true },
      { text: 'Google Analytics 4', included: true },
      { text: 'Google Search Console Setup', included: true },
      { text: 'Social Media Integration', included: true },
      { text: 'E-Commerce / Stock Management', included: false },
      { text: 'Booking System / AI Bot', included: false },
      { text: 'Ad Tracking Pixels', included: false },
    ],
    targetAudience: 'Mid-sized businesses looking to stand out from competitors and rank on Google\'s first page.',
  },
  {
    id: 'ekosistem',
    badge: '🥇',
    level: 'Level 3',
    name: 'Full Ecosystem',
    subtitle: '"Automation + Conversion"',
    price: '19,500 ₺',
    priceUSD: '~$585',
    priceExtra: '24,500 ₺ (with both X+Y features)',
    delivery: '15–25 business days',
    revisions: 'Unlimited (during project)',
    support: '30-day support + Training session',
    highlight: false,
    features: [
      { text: 'Everything in Level 1 & 2', included: true },
      { text: 'Online Booking System OR AI WhatsApp Bot', included: true },
      { text: 'Full E-Commerce Infrastructure', included: true },
      { text: 'Stock Management Admin Panel', included: true },
      { text: 'Meta (Facebook) Pixel & Google Ads Tag', included: true },
      { text: 'Abandoned Cart Email Automation', included: true },
      { text: 'Advanced Analytics & Conversion Tracking', included: true },
      { text: '1-Hour Online Panel Training', included: true },
      { text: 'Monthly Maintenance Plan (Optional)', included: true },
    ],
    targetAudience: 'Businesses targeting full automation and sales-driven growth.',
  },
];

export default function WebSolutionsPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#FAFAF9] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8750A]/10 border border-[#E8750A]/30 text-stone-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌐 Professional Web Services
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Web Solutions
          </h1>
          <p className="text-xl text-stone-500 max-w-3xl mx-auto mb-8">
            Custom website solutions built around your exact needs.
            Choose from 3 packages and establish your digital presence.
          </p>
          <div className="inline-flex items-center gap-2 bg-stone-50 border border-yellow-500/30 text-yellow-400 px-5 py-3 rounded-xl text-sm">
            <span>⚠️</span>
            <span><strong>Domain, Hosting, and SSL costs are covered by the buyer.</strong> Prices reflect labor, design, and setup only.</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.id}
                id={plan.id}
                className={`relative rounded-2xl border overflow-hidden ${
                  plan.highlight
                    ? 'border-[#E8750A] shadow-2xl shadow-stone-200/50 scale-105'
                    : 'border-stone-200/60'
                } bg-stone-50`}
              >
                {plan.highlight && (
                  <div className="bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 text-center py-2 text-sm font-bold tracking-wider">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="text-4xl mb-2">{plan.badge}</div>
                    <div className="text-stone-800 text-sm font-semibold uppercase tracking-wider mb-1">{plan.level}</div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-1">{plan.name}</h3>
                    <p className="text-stone-400 text-sm italic">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-stone-200">
                    <div className="text-4xl font-extrabold text-stone-900">{plan.price}</div>
                    <div className="text-stone-400 text-sm">{plan.priceUSD} — One-time payment</div>
                    {plan.priceExtra && (
                      <div className="text-stone-500 text-sm mt-1">{plan.priceExtra}</div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="bg-[#FAFAF9] text-stone-500 text-xs px-3 py-1 rounded-full">🕐 {plan.delivery}</span>
                      <span className="bg-[#FAFAF9] text-stone-500 text-xs px-3 py-1 rounded-full">✏️ {plan.revisions}</span>
                      <span className="bg-[#FAFAF9] text-stone-500 text-xs px-3 py-1 rounded-full">🛡 {plan.support}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-stone-600' : 'text-gray-600'}`}>
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-stone-800 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  {/* Target Audience */}
                  <div className="bg-[#FAFAF9] rounded-xl p-4 mb-6">
                    <p className="text-xs text-stone-400 leading-relaxed">
                      <span className="text-stone-800 font-semibold">Best for: </span>
                      {plan.targetAudience}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#iletisim"
                    className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                      plan.highlight
                        ? 'bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 hover:shadow-lg hover:shadow-stone-200/50 hover:scale-105'
                        : 'bg-[#E8750A]/10 text-stone-800 border border-[#E8750A]/30 hover:bg-[#E8750A]/20'
                    }`}
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Maintenance */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-4xl mb-3">🔧</div>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Monthly Maintenance & Technical Support</h2>
            <p className="text-stone-500">Optional for Level 3 — Keep your site always updated and secure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-50 rounded-xl p-6 border border-stone-200/60">
              <h3 className="text-lg font-bold text-stone-900 mb-2">Basic Maintenance</h3>
              <div className="text-3xl font-extrabold text-stone-800 mb-1">850 ₺<span className="text-base font-normal text-stone-400">/mo</span></div>
              <div className="text-stone-400 text-sm mb-4">~$25/mo</div>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> Security Scanning</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> Plugin Updates</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> Basic Technical Support</li>
              </ul>
            </div>

            <div className="bg-stone-50 rounded-xl p-6 border border-[#E8750A] shadow-lg shadow-stone-200/50">
              <div className="text-xs text-stone-800 font-bold uppercase tracking-wider mb-2">Recommended</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Full Support</h3>
              <div className="text-3xl font-extrabold text-stone-800 mb-1">1,750 ₺<span className="text-base font-normal text-stone-400">/mo</span></div>
              <div className="text-stone-400 text-sm mb-4">~$52/mo</div>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> Everything in Basic</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> 3 Content Updates/Month</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> Monthly Performance Report</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> 4-Hour Incident Response</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-800 flex-shrink-0 mt-0.5" /> WhatsApp / Email Support</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#E8750A]/10 to-[#F59E0B]/5 rounded-xl p-6 border border-[#F59E0B]/20">
              <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-2">20% Discount</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Annual Prepay</h3>
              <div className="text-3xl font-extrabold text-stone-500 mb-1">16,500 ₺<span className="text-base font-normal text-stone-400">/yr</span></div>
              <div className="text-stone-400 text-sm mb-1">~$495/year</div>
              <div className="text-stone-500 text-xs mb-4">12 × 1,750₺ = 21,000₺ → 16,500₺</div>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" /> Full Support plan</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" /> Save 4,500₺</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" /> Priority response</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            * Monthly maintenance plans are available exclusively for Level 3 clients.
          </p>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-stone-50 rounded-xl p-6 border border-yellow-500/20">
              <div className="text-2xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">Not Included in Price</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li>• Domain name (approx. $15–25/year)</li>
                <li>• Web hosting (approx. $50–200/year)</li>
                <li>• SSL Certificate (usually free with hosting)</li>
                <li>• Third-party software licenses</li>
              </ul>
            </div>
            <div className="bg-stone-50 rounded-xl p-6 border border-green-500/20">
              <div className="text-2xl mb-3">✅</div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">Payment Terms</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li>• <strong className="text-stone-900">50% upfront</strong> to start the project</li>
                <li>• 50% paid upon delivery</li>
                <li>• Bank transfer / Credit card accepted</li>
                <li>• Invoice issued for all payments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Get a Quote */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">📞</div>
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Get a Quote</h2>
          <p className="text-xl text-stone-500 mb-10">
            Let's talk about which package fits your needs. Reach out via WhatsApp or email — 
            free consultation included.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Melih */}
            <a
              href="https://wa.me/905537065912?text=Hello%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20web%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-stone-900 !text-white hover:bg-stone-800 rounded-full flex items-center justify-center text-stone-900 text-2xl font-bold mx-auto mb-4">
                M
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">Melih</h3>
              <p className="text-stone-400 text-sm mb-4">Co-Founder</p>
              <div className="flex items-center justify-center gap-2 text-green-400 group-hover:text-green-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-semibold">Message on WhatsApp</span>
              </div>
            </a>

            {/* Yunus */}
            <a
              href="https://wa.me/905518343030?text=Hello%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20web%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#C2410C] rounded-full flex items-center justify-center text-stone-900 text-2xl font-bold mx-auto mb-4">
                Y
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">Şükür Yunus</h3>
              <p className="text-stone-400 text-sm mb-4">Co-Founder</p>
              <div className="flex items-center justify-center gap-2 text-green-400 group-hover:text-green-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-semibold">Message on WhatsApp</span>
              </div>
            </a>
          </div>

          <p className="text-stone-400 text-sm">
            📧 You can also email us at{' '}
            <a href="mailto:melihbicak@gmail.com" className="text-stone-800 hover:underline">
              melihbicak@gmail.com
            </a>
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-[#E8750A]/10 border border-[#E8750A]/20 text-stone-800 px-5 py-3 rounded-xl text-sm">
            🔒 All projects start with a <strong className="ml-1">50% upfront payment.</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
