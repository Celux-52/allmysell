import Link from 'next/link';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

// eBay Products - 10 aktif ürün
const ebayProducts = [
  {
    id: 'laptop-stand-rotating',
    name: 'Adjustable 360° Rotating Laptop Stand',
    description: 'Aluminum Laptop Stand and Hub for Gaming, Gray',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'phone-holder-rotating',
    name: '360° Rotating Phone Holder',
    description: 'Multi-Function Sun Visor Phone Holder for All Vehicles',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'usb-hub-8in2',
    name: '8 in 2 USB Hub',
    description: 'Type C HUB Docking Station with 3.5mm Audio Jack Adapter',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magnetic-power-bank-10000',
    name: 'Magnetic Power Bank 10000mAh',
    description: 'Wireless Portable Charger for iPhone 16/15/14/13/12',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'portable-charger-20000',
    name: '20000mAh 45W Portable Charger',
    description: 'Fast Charging Power Bank, Super Fast Charging',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'wired-earphones-lightning',
    name: 'Wired Earphones Lightning',
    description: 'HiFi Stereo Earbuds for iPhone with Microphone',
    category: 'Audio',
    image: 'https://i.ebayimg.com/images/g/OBsAAeSwgb9paZsz/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magsafe-sticker-360-ring',
    name: 'MagSafe Sticker 360 Manyetik Halkalı 2 Paket',
    description: 'Evrensel Kablosuz Şarj Adaptörü Kiti',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/euIAAeSwTh5p0SZ5/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magnetic-phone-grip-ring',
    name: 'Magnetic Phone Grip Ring Holder for MagSafe',
    description: 'Magnet Cell Phone Grip Kickstand Universal Holder',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nSoAAeSw-2Bp0VQE/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'webcam-cover-8pcs',
    name: '8PCS WebCam Cover Slide Camera Privacy',
    description: 'Security Protect Sticker For Phone Laptop',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nZEAAeSwLydp0V5y/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magsafe-ring-sticker-black',
    name: '3Black for MagSafe Ring Sticker',
    description: 'Universal Metal Ring Compatible with MagSafe Accessories',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/JyUAAeSwLeFp0WHH/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'bluetooth-usb-audio-adapter',
    name: 'Bluetooth 5.0 USB Audio Adapter',
    description: 'Wireless Music Receiver for PC TV Laptop, Low Latency',
    category: 'Audio Accessories',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'iphone-17-pro-max-case',
    name: 'For iPhone 17 Pro Max Case',
    description: 'iPhone 17 Pro Phone Cover Shockproof + Tempered Glass',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/VlcAAeSwbSBp0ZL1/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magnetic-phone-case-iphone-16',
    name: 'Magnetic Phone Case For iPhone 16',
    description: 'iPhone 16 Pro Max Plus Bumper Hard Cover',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/buoAAeSwlcZp0aA3/s-l1600.webp',
    platform: 'eBay',
  },
];

const blogPosts = [
  {
    id: 'laptop-stand-rotating',
    title: 'Why a 360° Rotating Laptop Stand is a Must-Have for Remote Work',
    excerpt: 'Ergonomics in a home office are essential. Discover how a simple aluminum stand can instantly upgrade your posture, cooling efficiency, and desk aesthetic.',
    category: 'Computer Accessories',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    date: '2023-11-12',
    readTime: '4 min read',
    tags: ['Desk Setup', 'Ergonomics', 'WFH'],
  },
  {
    id: 'magnetic-power-bank-10000',
    title: 'Top 5 Reasons to Switch to MagSafe Compatible Power Banks',
    excerpt: 'Tired of carrying tangled cables everywhere? Magnetic power banks have revolutionized on-the-go charging for iPhone users. Heres what you need to know.',
    category: 'Chargers',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    date: '2023-12-05',
    readTime: '6 min read',
    tags: ['Power Delivery', 'iPhone 15', 'Travel'],
  },
  {
    id: 'phone-holder-rotating',
    title: 'The Ultimate Guide to Safe Driving with Car Phone Mounts',
    excerpt: 'From GPS navigation to hands-free calling, a sturdy car mount is a life saver. We review the 360° Sun Visor Phone Holder and see how it performs.',
    category: 'Car Accessories',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    date: '2024-01-20',
    readTime: '5 min read',
    tags: ['Road Trip', 'Safety', 'Car Gadgets'],
  },
  {
    id: 'bluetooth-usb-audio-adapter',
    title: 'Upgrade Your Old PC Audio with a Bluetooth 5.0 USB Adapter',
    excerpt: 'No Bluetooth on your desktop? No problem. Learn how an affordable USB receiver can connect your favorite wireless headphones seamlessly.',
    category: 'Audio Accessories',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    date: '2024-02-14',
    readTime: '3 min read',
    tags: ['Audio Tech', 'Bluetooth 5.0', 'PC Build'],
  }
];

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="bg-cornsilk min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-olive via-peru to-peru text-cornsilk py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AllMySell Blog
            </h1>
            <p className="text-xl md:text-2xl text-olive max-w-3xl mx-auto">
              Product reviews, buying guides, and latest tech news from eBay, Amazon, and Shopify
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black mb-2">Featured Article</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-olive to-peru rounded-full"></div>
          </div>
          
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="bg-cornsilk rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-80 md:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-olive to-peru text-cornsilk px-4 py-2 rounded-full text-sm font-semibold">
                    {featuredPost.platform}
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="text-olive font-semibold text-sm uppercase tracking-wider mb-3">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-3xl font-bold text-black mb-4 group-hover:text-olive transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-olive font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Read Full Article</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black mb-2">Latest Articles</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-olive to-peru rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-cornsilk rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full flex flex-col">
                  <div className="relative h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-cornsilk/95 backdrop-blur-sm text-olive px-3 py-1 rounded-full text-xs font-bold">
                      {post.platform}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="text-olive font-semibold text-xs uppercase tracking-wider mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-olive transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-olive font-semibold text-sm group-hover:gap-2 gap-1 transition-all pt-4 border-t border-gray-100">
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Explore articles by product category and platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Chargers', 'Car Accessories', 'Audio & Earbuds', 'Computer Accessories'].map((cat) => (
              <div key={cat} className="bg-cornsilk p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-olive transition-colors">
                  {cat}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {blogPosts.filter(p => p.category === cat).length} articles
                </p>
                <div className="flex items-center text-olive font-semibold text-sm">
                  <span>View All</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Filter Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Shop by Platform</h2>
            <p className="text-xl text-gray-600">Find reviews from your favorite marketplace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors">
                eBay Reviews
              </h3>
              <p className="text-gray-600 mb-4">{blogPosts.filter(p => p.platform === 'eBay').length} active articles</p>
              <div className="flex items-center text-red-600 font-semibold">
                <span>Explore eBay</span>
                <TrendingUp size={18} className="ml-2" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg opacity-60">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-black mb-2">Amazon Reviews</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
              <div className="text-gray-500 font-semibold">Under development</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg opacity-60">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-black mb-2">Shopify Reviews</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
              <div className="text-gray-500 font-semibold">Under development</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-olive to-peru text-cornsilk py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Latest Reviews
          </h2>
          <p className="text-xl mb-8 text-olive">
            Subscribe to get the newest product reviews and tech guides
          </p>
          <Link
            href="/#newsletter"
            className="inline-block bg-cornsilk text-olive px-8 py-4 rounded-full font-semibold text-lg hover:bg-peru transition-all hover:scale-105 shadow-lg"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
