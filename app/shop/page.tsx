import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Stores',
  description: 'Shop AllMySell products across all major e-commerce platforms including eBay, Amazon, Etsy, and more.',
};

const stores = [
  {
    name: 'eBay',
    slug: 'ebay',
    url: 'https://www.ebay.com/usr/allmysell',
    emoji: '🛒',
    description: 'Our main store with the widest selection of tech & mobile accessories.',
    status: 'active' as const,
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    url: '#',
    emoji: '📦',
    description: 'Coming soon — premium product listings on Amazon marketplace.',
    status: 'coming-soon' as const,
  },
  {
    name: 'Etsy',
    slug: 'etsy',
    url: '#',
    emoji: '🎨',
    description: 'Coming soon — handpicked and personalized product collections.',
    status: 'coming-soon' as const,
  },
  {
    name: 'Shopify',
    slug: 'shopify',
    url: '#',
    emoji: '🏪',
    description: 'Coming soon — our own branded online storefront.',
    status: 'coming-soon' as const,
  },
  {
    name: 'TikTok Shop',
    slug: 'tiktokshop',
    url: '#',
    emoji: '🎵',
    description: 'Coming soon — trending products on TikTok Shop.',
    status: 'coming-soon' as const,
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-16 px-4 selection:bg-orange-500/30">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Our Stores
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Shop AllMySell products across multiple platforms. Find what you need, wherever you prefer to buy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <a
              key={store.slug}
              href={store.url}
              target={store.status === 'active' ? '_blank' : undefined}
              rel={store.status === 'active' ? 'noopener noreferrer' : undefined}
              className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
                store.status === 'active'
                  ? 'border-orange-500/20 bg-[#080c16] hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer'
                  : 'border-white/5 bg-[#080c16]/60 cursor-default opacity-70'
              }`}
            >
              <div className="text-4xl mb-4">{store.emoji}</div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                {store.name}
                {store.status === 'active' && (
                  <span className="text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Live
                  </span>
                )}
                {store.status === 'coming-soon' && (
                  <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">{store.description}</p>

              {store.status === 'active' && (
                <div className="mt-4 flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Visit Store
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-400 transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
