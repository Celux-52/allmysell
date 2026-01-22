import Link from 'next/link';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

// eBay Products - 19 aktif ürün
const ebayProducts = [
  {
    id: 'mini-gps-tracker',
    name: 'Mini GPS Tracker for Car',
    description: 'Hidden Vehicle Tracking Device iOS Only No Monthly Fee',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/Ha0AAeSwPjVpbDkr/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'solar-street-light',
    name: 'Solar Street Light Outdoor',
    description: 'Solar Parking Lot Light, Wide Angle Lamp',
    category: 'Outdoor & Garden',
    image: 'https://i.ebayimg.com/images/g/sLUAAeSwhsRpbDrM/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'aoc-wireless-earbuds',
    name: 'AOC ACD1504 Wireless Open-Ear Earbuds',
    description: 'Bluetooth 5.4 Waterproof Headphones',
    category: 'Audio & Earbuds',
    image: 'https://i.ebayimg.com/images/g/6jUAAeSwA11pbDiX/s-l1600.webp',
    platform: 'eBay',
  },
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
    id: 'usb-car-charger',
    name: 'USB Port Super Fast Car Charger',
    description: 'Adapter For iPhone Samsung Android Cell Phone',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp',
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
    id: 'invisible-holder-charger',
    name: 'Invisible Holder Charger Cable',
    description: '240w super fast charging 2-in-1 Fast with Stand',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/FTEAAeSw4A9pYTib/s-l1600.webp',
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
    id: 'supfine-magnetic-case',
    name: 'SUPFINE Magnetic iPhone Case',
    description: 'Compatible with MagSafe (Military Grade)',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/k1wAAeSwhfFpVQd3/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'usbc-fast-charger',
    name: 'USB-C Fast Charger Cable',
    description: 'For iPhone 17 16 15 14 13 12 11 Pro Max Type C',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/JWwAAeSwA11pXd~K/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'azdome-dash-cam',
    name: 'AZDOME M17 Pro Dual Dash Cam',
    description: 'Voice-Activated, 3K Single Channel',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/m1UAAeSwCFxpZyrZ/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'portable-solar-panel',
    name: 'Portable 10W Solar Panel',
    description: 'Dual USB/Type-C Ports, Fast Charging',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/WAMAAeSw8PRpZykn/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'mini-electric-shaver',
    name: 'Mini Electric Shaver',
    description: 'Upgrade Pocket Dual Head Shaver, Portable Razor',
    category: 'Personal Care',
    image: 'https://i.ebayimg.com/images/g/Q2gAAeSwjOhpZyae/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'mobile-phone-tripod',
    name: 'Portable Mobile Phone Tripod',
    description: 'Dual Beauty Fill Lights and Bluetooth',
    category: 'Photo & Video',
    image: 'https://i.ebayimg.com/images/g/pesAAeSwNvdpY5wh/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'auto-ai-box',
    name: 'Auto AI Box',
    description: 'Netflix Youtube Support Card Dongle Plug and Play',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/ph0AAeSwek1pYUXL/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'heavy-duty-cable',
    name: 'Heavy Duty Charging Cable',
    description: 'Type-C USB-C For Samsung Android LG Charger',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/mAEAAeSw1~BpXeja/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'wired-earphones-lightning',
    name: 'Wired Earphones for iPhone with Lightning Connector',
    description: 'Compatible with iPhone 11-16',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/K0QAAeSwWP1paZsz/s-l1600.webp',
    platform: 'eBay',
  },
];

// Blog posts - ürünlerden otomatik oluşturulan içerik
const generateBlogPosts = () => {
  return ebayProducts.map((product) => ({
    id: product.id,
    title: `Review: ${product.name} - ${product.platform} Best Seller`,
    excerpt: `Discover why ${product.name} is one of the most popular products in the ${product.category} category. Detailed review, features, and user experiences.`,
    category: product.category,
    platform: product.platform,
    image: product.image,
    date: '2026-01-19',
    readTime: '5 min read',
    tags: [product.category, product.platform, 'Tech Review', 'Product Guide'],
    content: generateBlogContent(product),
  }));
};

const generateBlogContent = (product: any) => {
  return {
    introduction: `The ${product.name} has become one of the standout products in the ${product.category} market. Available on ${product.platform}, this product offers exceptional value for money and has garnered excellent customer reviews.`,
    
    features: [
      'Premium build quality and durable materials',
      'Easy to use with intuitive design',
      'Compatible with multiple devices',
      'Excellent customer support',
      'Fast shipping and secure packaging',
    ],
    
    whyChoose: `When shopping for ${product.category} products, the ${product.name} stands out for several reasons. First, it's available through ${product.platform}, which means you benefit from their buyer protection and secure payment systems. Second, the product has been tested and verified to meet high-quality standards.`,
    
    customerExperience: `Customers who purchased this product from our ${product.platform} store have consistently given positive feedback. The ${product.description.toLowerCase()} makes it a versatile choice for various needs.`,
    
    conclusion: `If you're looking for a reliable ${product.category} solution, the ${product.name} is definitely worth considering. Available now on our ${product.platform} store with fast shipping and full buyer protection.`,
  };
};

const blogPosts = generateBlogPosts();

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AllMySell Blog
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Product reviews, buying guides, and latest tech news from eBay, Amazon, and Shopify
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Article</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>
          
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-80 md:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                  <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full flex flex-col">
                  <div className="relative h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
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
                    <span className="text-purple-600 font-semibold text-xs uppercase tracking-wider mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all pt-4 border-t border-gray-100">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Explore articles by product category and platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Chargers', 'Car Accessories', 'Audio & Earbuds', 'Computer Accessories'].map((cat) => (
              <div key={cat} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {cat}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {blogPosts.filter(p => p.category === cat).length} articles
                </p>
                <div className="flex items-center text-purple-600 font-semibold text-sm">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Platform</h2>
            <p className="text-xl text-gray-600">Find reviews from your favorite marketplace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Amazon Reviews</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
              <div className="text-gray-500 font-semibold">Under development</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg opacity-60">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Shopify Reviews</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
              <div className="text-gray-500 font-semibold">Under development</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Latest Reviews
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Subscribe to get the newest product reviews and tech guides
          </p>
          <Link
            href="/#newsletter"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
