import Link from 'next/link';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | AllMySell Tech Reviews & Guides',
  description: 'Read the latest product reviews, buying guides, and technology news from the AllMySell team. Make informed choices on mobile accessories and gadgets.',
};


// eBay Products - active + previous
const ebayProducts = [
  // NEW TRIANGLES-3
  {
    id: 'universal-car-hud-gps',
    name: 'Universal Car HUD Head Up Display Digital GPS Speedometer',
    description: 'Windshield Projector',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/MJ0AAeSwwatp2E4Y/s-l1600.webp',
    platform: 'eBay - Triangles-3',
  },
  {
    id: 'hidden-camera-car-dvr',
    name: 'Hidden Camera Car DVR Dash Cam',
    description: 'USB / WIFI Driving Video Recorder G-sensor',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/XcIAAeSw-dNp2Vn0/s-l1600.webp',
    platform: 'eBay - Triangles-3',
  },
  {
    id: 'wall-mounted-pegboard',
    name: 'Wall Mounted Pegboard Tool Organizer',
    description: 'Rack Kit w/ Storage Bins',
    category: 'Office & Tools',
    image: 'https://i.ebayimg.com/images/g/61kAAeSwzLlp2V1p/s-l960.webp',
    platform: 'eBay - Triangles-3',
  },
  {
    id: 'air-pressure-gauge-tester',
    name: 'Air Pressure Gauge Meter Tester',
    description: 'Digital Tire Bike Car Truck LCD Display',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/2I4AAeSwHFFp2V6A/s-l1600.webp',
    platform: 'eBay - Triangles-3',
  },
  {
    id: 'phone-repair-silicone-pad',
    name: 'Phone Repair Silicone Pad',
    description: 'Desk Heat Insulation Magnetic Work Mat Soldering Iron',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/NScAAeSwnxZp2V~y/s-l1600.webp',
    platform: 'eBay - Triangles-3',
  },
  // NEW IN-STOCK
  {
    id: 'led-wireless-charger-3in1',
    name: '3 in 1 LED Wireless Charger Stand Foldable',
    description: 'Foldable Wireless Charger for iPhone 15 14 13, Watch & AirPods Pro',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/ZqoAAeSwiT9p2Eox/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magsafe-power-bank-5000',
    name: 'Magnetic MagSafe Wireless Power Bank 5000mAh',
    description: 'Fast Charger for iPhone 17 16 15',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/oIAAAeSwg6Bp2EeD/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'metal-desk-phone-holder-360',
    name: '360° Rotate Metal Desk Phone Holder',
    description: 'Adjustable Stand For Phone & Pad',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/XBsAAeSwDWtp2EXb/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'car-phone-holder-vent',
    name: 'Car Phone Holder Vent Dashboard',
    description: 'Universal Car Mount for All Phones',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/mYkAAeSw4G1p2ETh/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'magsafe-leather-wallet-case',
    name: 'MagSafe Magnetic Luxury Leather Card Holder Wallet Case',
    description: 'For iPhone 14 Pro Max 13 12',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/bsYAAeSwICVp2EMe/s-l1600.webp',
    platform: 'eBay',
  },
  {
    id: 'tempered-glass-screen-protector',
    name: '9H HD Tempered Glass Screen Protector',
    description: 'For iPhone 16 15 14 13 12 11 Pro Max Clear',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/7HYAAeSwi0Vp2Djv/s-l1600.webp',
    platform: 'eBay',
  },
  // PREVIOUS PRODUCTS
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
    name: 'MagSafe Sticker 360 Magnetic Ring 2 Pack',
    description: 'Universal Wireless Charging Adapter Kit',
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
  // NEW TRIANGLES-3 BLOG POSTS
  {
    id: 'universal-car-hud-gps',
    title: 'Upgrade Your Drive with a Universal Car HUD GPS',
    excerpt: 'Keep your eyes on the road. This digital GPS speedometer projects your speed directly onto your windshield for a safer driving experience.',
    category: 'Car Accessories',
    platform: 'eBay - Triangles-3',
    image: 'https://i.ebayimg.com/images/g/MJ0AAeSwwatp2E4Y/s-l1600.webp',
    date: '2024-04-10',
    readTime: '3 min read',
    tags: ['Car Gadgets', 'Safety', 'HUD'],
  },
  {
    id: 'hidden-camera-car-dvr',
    title: 'Why You Need a Hidden Dash Cam in 2024',
    excerpt: 'Protect yourself on the road with this Wifi Dash Cam DVR. Comes with G-sensor recording, hidden design, and clear video playback.',
    category: 'Car Accessories',
    platform: 'eBay - Triangles-3',
    image: 'https://i.ebayimg.com/images/g/XcIAAeSw-dNp2Vn0/s-l1600.webp',
    date: '2024-04-09',
    readTime: '5 min read',
    tags: ['Dash Cam', 'Car Safety', 'DVR'],
  },
  {
    id: 'wall-mounted-pegboard',
    title: 'Organize Your Workspace: The Wall Mounted Pegboard Kit',
    excerpt: 'From tools to office supplies, clear your desk clutter with this modular wall-mounted pegboard organizer and storage bins.',
    category: 'Office & Tools',
    platform: 'eBay - Triangles-3',
    image: 'https://i.ebayimg.com/images/g/61kAAeSwzLlp2V1p/s-l960.webp',
    date: '2024-04-08',
    readTime: '4 min read',
    tags: ['Organization', 'Workspace', 'Tools'],
  },
  {
    id: 'air-pressure-gauge-tester',
    title: 'The Importance of Checking Tire Pressure (and the Best Tool for It)',
    excerpt: 'A digital LCD tire pressure gauge is essential for your cars health and your safety. Learn why you need to keep one in your glovebox.',
    category: 'Car Accessories',
    platform: 'eBay - Triangles-3',
    image: 'https://i.ebayimg.com/images/g/2I4AAeSwHFFp2V6A/s-l1600.webp',
    date: '2024-04-07',
    readTime: '3 min read',
    tags: ['Car Maintenance', 'Tire Pressure', 'Tools'],
  },
  {
    id: 'phone-repair-silicone-pad',
    title: 'Must-Have Tech Tool: Magnetic Silicone Phone Repair Pad',
    excerpt: 'If you solder, repair phones, or just tinker with tech, this heat resistant magnetic work mat will save your desk and your sanity.',
    category: 'Phone Accessories',
    platform: 'eBay - Triangles-3',
    image: 'https://i.ebayimg.com/images/g/NScAAeSwnxZp2V~y/s-l1600.webp',
    date: '2024-04-06',
    readTime: '4 min read',
    tags: ['Repair', 'Tech Tools', 'Soldering'],
  },
  {
    id: 'led-wireless-charger-3in1',
    title: 'Why a 3-in-1 LED Wireless Charger is the Ultimate Desk Buddy',
    excerpt: 'Charge your iPhone, Apple Watch, and AirPods all at once with this foldable LED stand. Sleek, compact, and incredibly convenient.',
    category: 'Chargers',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/ZqoAAeSwiT9p2Eox/s-l1600.webp',
    date: '2024-04-08',
    readTime: '4 min read',
    tags: ['Wireless Charging', 'iPhone', 'Desk Setup'],
  },
  {
    id: 'magsafe-power-bank-5000',
    title: 'MagSafe Power Bank 5000mAh: Compact Charging On the Go',
    excerpt: 'Never run out of battery again. This magnetic power bank snaps onto your iPhone and delivers fast wireless charging wherever you are.',
    category: 'Chargers',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/oIAAAeSwg6Bp2EeD/s-l1600.webp',
    date: '2024-04-06',
    readTime: '5 min read',
    tags: ['MagSafe', 'Power Bank', 'Travel'],
  },
  {
    id: 'tempered-glass-screen-protector',
    title: '9H Tempered Glass: The Screen Protector Your iPhone Deserves',
    excerpt: 'Crystal clear protection with 9H hardness rating. Compatible with iPhone 16 through iPhone 11 Pro Max.',
    category: 'Phone Accessories',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/7HYAAeSwi0Vp2Djv/s-l1600.webp',
    date: '2024-04-04',
    readTime: '3 min read',
    tags: ['Screen Protection', 'iPhone', 'Durability'],
  },
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
    id: 'car-phone-holder-vent',
    title: 'Best Car Phone Holders for Safe Driving in 2024',
    excerpt: 'Mount your phone securely on your vent or dashboard. This universal holder keeps your device accessible and your hands on the wheel.',
    category: 'Car Accessories',
    platform: 'eBay',
    image: 'https://i.ebayimg.com/images/g/mYkAAeSw4G1p2ETh/s-l1600.webp',
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
  },
];

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen">
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
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-cornsilk mb-2">Featured Article</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-olive to-peru rounded-full"></div>
          </div>
          
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
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
                  <h3 className="text-3xl font-bold text-cornsilk mb-4 group-hover:text-olive transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
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
            <h2 className="text-4xl font-bold text-cornsilk mb-2">Latest Articles</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-olive to-peru rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer h-full flex flex-col">
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
                    <h3 className="text-xl font-bold text-cornsilk mb-3 line-clamp-2 group-hover:text-olive transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
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
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cornsilk mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-400">Explore articles by product category and platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Chargers', 'Car Accessories', 'Audio & Earbuds', 'Computer Accessories'].map((cat) => (
              <div key={cat} className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <h3 className="text-xl font-bold text-cornsilk mb-2 group-hover:text-olive transition-colors">
                  {cat}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
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
            <h2 className="text-4xl font-bold text-cornsilk mb-4">Shop by Platform</h2>
            <p className="text-xl text-gray-400">Find reviews from your favorite marketplace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-cornsilk mb-2 group-hover:text-red-600 transition-colors">
                eBay Reviews
              </h3>
              <p className="text-gray-400 mb-4">{blogPosts.filter(p => p.platform === 'eBay').length} active articles</p>
              <div className="flex items-center text-red-600 font-semibold">
                <span>Explore eBay</span>
                <TrendingUp size={18} className="ml-2" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg opacity-60">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-cornsilk mb-2">Amazon Reviews</h3>
              <p className="text-gray-400 mb-4">Coming soon</p>
              <div className="text-gray-500 font-semibold">Under development</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg opacity-60">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-cornsilk mb-2">Shopify Reviews</h3>
              <p className="text-gray-400 mb-4">Coming soon</p>
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
            className="inline-block bg-[#1A1A1A] text-olive px-8 py-4 rounded-full font-semibold text-lg hover:bg-peru transition-all hover:scale-105 shadow-lg"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
