import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Etsy Store - AllMySell | Under Construction',
  description: 'AllMySell Etsy store is currently under construction. Stay tuned for updates!',
};

export default function EtsyPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-50 text-stone-900 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">✨</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Etsy Store
          </h1>
          <div className="inline-block bg-cornsilk/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8">
            <p className="text-2xl font-semibold">&#128679; Under Construction</p>
          </div>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto">
            Our Etsy store is currently being built. We are working hard to bring you
            the best products and shopping experience. Stay tuned!
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-stone-500">
              What to expect when we launch
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white border border-stone-200/50 shadow-sm rounded-xl border border-stone-200">
              <div className="text-5xl mb-4">&#128722;</div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Quality Products</h3>
              <p className="text-stone-500">
                Carefully curated selection of premium products
              </p>
            </div>
            <div className="text-center p-8 bg-white border border-stone-200/50 shadow-sm rounded-xl border border-stone-200">
              <div className="text-5xl mb-4">&#128640;</div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Fast Shipping</h3>
              <p className="text-stone-500">
                Reliable and speedy delivery worldwide
              </p>
            </div>
            <div className="text-center p-8 bg-white border border-stone-200/50 shadow-sm rounded-xl border border-stone-200">
              <div className="text-5xl mb-4">&#128737;</div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Buyer Protection</h3>
              <p className="text-stone-500">
                Secure shopping with full buyer protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-100 text-stone-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t Miss the Launch!
          </h2>
          <p className="text-xl mb-8 text-stone-600">
            Check back soon or visit our homepage for updates
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-stone-50 text-stone-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-stone-100/50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Go to Homepage</span>
          </a>
        </div>
      </section>
    </div>
  );
}
