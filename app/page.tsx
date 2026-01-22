import Link from 'next/link';
import { ShoppingBag, TrendingUp, Award, Globe } from 'lucide-react';
import Newsletter from '@/components/Newsletter';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/TrustBadges';
import ProductCarousel from '@/components/ProductCarousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AllMySell - Multi-Platform E-Commerce | Tech & Mobile Accessories',
  description: 'Shop quality tech products and mobile accessories on eBay. Expanding to Amazon, Etsy, Shopify, and TikTok Shop. Fast shipping worldwide.',
  keywords: ['tech accessories', 'mobile accessories', 'eBay store', 'chargers', 'power banks', 'car accessories', 'phone cases'],
};

const platforms = [
  {
    name: 'eBay',
    description: 'Now Active! Tech & Mobile Accessories',
    href: '/ebay',
    color: 'from-yellow-500 to-red-500',
    icon: '🛍️',
    active: true,
  },
  {
    name: 'Amazon',
    description: 'Coming Soon',
    href: '/amazon',
    color: 'from-orange-500 to-yellow-600',
    icon: '📦',
    active: false,
  },
  {
    name: 'Etsy',
    description: 'Coming Soon',
    href: '/etsy',
    color: 'from-orange-400 to-pink-500',
    icon: '✨',
    active: false,
  },
  {
    name: 'Shopify',
    description: 'Coming Soon',
    href: '/shopify',
    color: 'from-green-500 to-emerald-600',
    icon: '🏪',
    active: false,
  },
  {
    name: 'TikTok Shop',
    description: 'Coming Soon',
    href: '/tiktok',
    color: 'from-cyan-500 to-blue-600',
    icon: '🎥',
    active: false,
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: 'Multi-Platform',
    description: 'Expanding across major e-commerce platforms',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Shipping worldwide with reliable service',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'Continuously expanding our product catalog',
  },
  {
    icon: Award,
    title: 'Quality Products',
    description: 'Carefully selected tech and mobile accessories',
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#8B5A2B] to-[#E07A2C] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#E07A2C] to-[#8B5A2B] rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-4xl">A</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            AllMySell
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            Technology & Mobile Accessories
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Discover quality tech products and mobile accessories on eBay. 
            More platforms coming soon!
          </p>
          <Link
            href="/about"
            className="inline-block bg-white text-[#8B5A2B] px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-lg"
          >
            Learn About Us
          </Link>
        </div>
      </section>

      {/* Our Store Section */}
      <section className="py-24 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E07A2C] via-[#8B5A2B] to-[#1a1a1a] mb-4 tracking-tight">
              Our Store
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#E07A2C] to-[#8B5A2B] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light first-letter:text-7xl first-letter:font-bold first-letter:text-[#E07A2C] first-letter:mr-3 first-letter:float-left">
              The story of Melih and Şükür Yunus did not begin with big plans, ready capital, or long-term startup dreams. It started in a much more ordinary way: they met while working at the same workplace. Different lives, different paths, but very similar struggles. Over time, conversations grew deeper. They talked about work, money, uncertainty, and the constant search for a way forward.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              At that time, <span className="font-semibold text-gray-900">Şükür Yunus</span> was attending his own university while actively working in e-commerce. He didn't learn this business from theory or online videos alone; he learned it by <span className="font-semibold text-[#E07A2C]">being inside it</span>. He tested products, made sales, lost money, adjusted, and tried again. He was improving, but nothing was stable. On top of that, he had recently bought a car — not as a symbol of comfort, but as a serious financial responsibility. Monthly payments, school pressure, and business risk all existed at the same time.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              <span className="font-semibold text-gray-900">Melih's</span> situation followed a different rhythm. He was also attending university, but under heavy conditions. Midterms, finals, deadlines, and the need to work at the same time. There was no extra money and no extra time. Days passed between school and work; nights often ended without sleep. Life felt tight, repetitive, and limiting. The thought that <span className="italic font-medium text-gray-900">"this cannot be it"</span> became impossible to ignore.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              Watching Şükür Yunus operate in e-commerce opened a door in Melih's mind. It was not just about making money — it was about <span className="font-semibold text-[#E07A2C]">building something with his own effort</span>. Melih did not enter this journey claiming knowledge. He entered knowing what he did not know. But one thing was clear: he wanted to earn his own money and stop being trapped inside someone else's system.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              As time passed, conversations turned serious. Between different schools, different schedules, and demanding workloads, every free moment was used to talk business. Laptops opened late at night. Orders were checked during exam weeks. Mistakes were made, fixed, and learned from. There were moments when academic stress and sales pressure hit at the same time. <span className="font-semibold text-gray-900">Sleepless nights became normal.</span>
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              The decision for Şükür Yunus to build this together with Melih formed during this period. Melih's situation was far from comfortable. There were moments of being broke, mentally exhausted, and uncertain. But he never stepped back. He took responsibility, stayed inside the process, and kept learning. <span className="font-semibold text-[#E07A2C]">That consistency built trust.</span>
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              <span className="font-bold text-gray-900">AllMySell</span> was not built during comfortable times. It was created while two people, attending different universities and living different lives, were dealing with exams, jobs, financial pressure, and constant uncertainty at the same time. This brand was not born by waiting for the "right moment," but by <span className="font-semibold text-[#E07A2C]">moving forward when the moment was clearly not right.</span>
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              AllMySell exists because <span className="font-semibold text-gray-900">action was taken when conditions were difficult</span>. Things did not always go as planned, and nothing came easy. Quitting was never the first option. This brand was built through responsibility, risk, and real-life pressure — not shortcuts.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              Today, AllMySell is not the result of overnight success. It is the result of <span className="font-semibold text-[#E07A2C]">sleepless nights, postponed comfort</span>, and the moments when the only decision was to keep going.
            </p>
            
            <div className="bg-gradient-to-r from-[#E07A2C] via-[#8B5A2B] to-[#1a1a1a] p-[2px] rounded-2xl mt-16">
              <div className="bg-white rounded-2xl p-10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  AllMySell is not a story that was told.
                </p>
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E07A2C] via-[#8B5A2B] to-[#1a1a1a] leading-tight">
                  It is a process that was lived.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Why AllMySell?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multi-platform strategy for global marketplace presence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-[#E07A2C]/10"
              >
                <feature.icon className="w-12 h-12 text-[#E07A2C] mb-4" />
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Platforms Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our active and upcoming marketplaces
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Link
                key={index}
                href={platform.href}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-[#E07A2C]/10 ${!platform.active && 'opacity-75'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                {platform.active && (
                  <div className="absolute top-4 right-4 bg-[#E07A2C] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Active
                  </div>
                )}
                {!platform.active && (
                  <div className="absolute top-4 right-4 bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Soon
                  </div>
                )}
                <div className="p-8">
                  <div className="text-5xl mb-4">{platform.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E07A2C] group-hover:to-[#8B5A2B] transition-all">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{platform.description}</p>
                  <div className={`flex items-center font-semibold ${platform.active ? 'text-[#E07A2C]' : 'text-gray-500'}`}>
                    <span>{platform.active ? 'Visit Store' : 'Coming Soon'}</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from our satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Review 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;Fast shipping and great quality products! The GPS tracker works perfectly. Highly recommended!&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John D.</p>
                  <p className="text-sm text-gray-500">eBay Buyer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;Amazing customer service! They responded quickly to all my questions. The power bank quality is excellent.&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-500">eBay Buyer</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;Best tech accessories store! Products arrived exactly as described. Will definitely buy again!&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  MK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michael K.</p>
                  <p className="text-sm text-gray-500">eBay Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1a1a1a] via-[#8B5A2B] to-[#E07A2C] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Visit our stores and explore our products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ebay"
              className="bg-white text-[#8B5A2B] px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all hover:scale-105 shadow-lg"
            >
              Browse Products
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#8B5A2B] transition-all hover:scale-105"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
