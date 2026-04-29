import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const storeMap: Record<string, { name: string; url: string; active: boolean }> = {
  ebay: {
    name: 'eBay',
    url: 'https://www.ebay.com/usr/allmysell',
    active: true,
  },
  amazon: {
    name: 'Amazon',
    url: '#',
    active: false,
  },
  etsy: {
    name: 'Etsy',
    url: '#',
    active: false,
  },
  shopify: {
    name: 'Shopify',
    url: '#',
    active: false,
  },
  tiktokshop: {
    name: 'TikTok Shop',
    url: '#',
    active: false,
  },
};

export async function generateStaticParams() {
  return Object.keys(storeMap).map((store) => ({ store }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ store: string }>;
}): Promise<Metadata> {
  const { store } = await params;
  const info = storeMap[store];
  if (!info) return { title: 'Store Not Found' };
  return {
    title: `${info.name} Store`,
    description: `Shop AllMySell products on ${info.name}.`,
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const { store } = await params;
  const info = storeMap[store];

  if (!info) {
    notFound();
  }

  // Active stores redirect immediately to external URL
  if (info.active && info.url !== '#') {
    redirect(info.url);
  }

  // Coming soon stores show a placeholder
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-4 selection:bg-orange-500/30">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-2xl border border-white/10 bg-[#080c16] shadow-2xl">
        <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
          <span className="text-3xl">🏪</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          {info.name} Store — Coming Soon!
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          We&apos;re preparing our {info.name} storefront. Stay tuned for updates!
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/shop"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            ← View All Stores
          </Link>
          <Link
            href="/"
            className="w-full py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
