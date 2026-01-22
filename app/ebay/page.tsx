import { ExternalLink, Package, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our eBay Store - AllMySell | 8 Active Tech Products',
  description: 'Browse quality tech and mobile accessories on our eBay store. Chargers, car accessories, phone cases & more. Fast shipping with eBay buyer protection.',
  keywords: ['eBay store', 'tech accessories', 'mobile accessories', 'chargers', 'power banks', 'car accessories', 'phone cases', 'USB hubs'],
};

const products = [
  {
    name: 'Adjustable 360° Rotating Laptop Stand',
    description: 'Aluminum Laptop Stand and Hub for Gaming, Gray',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206006630493',
  },
  {
    name: '360° Rotating Phone Holder',
    description: 'Multi-Function Sun Visor Phone Holder for All Vehicles',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206006629452',
  },
  {
    name: 'USB Port Super Fast Car Charger',
    description: 'Adapter For iPhone Samsung Android Cell Phone',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205978408766',
  },
  {
    name: '8 in 2 USB Hub',
    description: 'Type C HUB Docking Station with 3.5mm Audio Jack Adapter',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205970305941',
  },
  {
    name: 'Magnetic Power Bank 10000mAh',
    description: 'Wireless Portable Charger for iPhone 16/15/14/13/12',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205990599969',
  },
  {
    name: 'Invisible Holder Charger Cable',
    description: '240w super fast charging 2-in-1 Fast with Stand',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/FTEAAeSw4A9pYTib/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205985301623',
  },
  {
    name: '20000mAh 45W Portable Charger',
    description: 'Fast Charging Power Bank, Super Fast Charging',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205970285393',
  },
  {
    name: 'SUPFINE Magnetic iPhone Case',
    description: 'Compatible with MagSafe (Military Grade)',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/k1wAAeSwhfFpVQd3/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205961323859',
  },
];

const categories = [
  {
    name: 'Chargers & Power Banks',
    description: 'Fast chargers, power banks and charging cables',
    productCount: '6',
    subtext: 'active products on eBay',
    icon: '🔋',
  },
  {
    name: 'Car Accessories',
    description: 'Car chargers, AI Box and dash cameras',
    productCount: '3',
    subtext: 'active products on eBay',
    icon: '🚗',
  },
  {
    name: 'Phone & Tablet Accessories',
    description: 'Cases, tripods and mobile accessories',
    productCount: '6',
    subtext: 'active products on eBay',
    icon: '📱',
  },
  {
    name: 'Computer Accessories',
    description: 'USB hubs and connectivity products',
    productCount: '2',
    subtext: 'active products on eBay',
    icon: '💻',
  },
];

const features = [
  {
    icon: Shield,
    title: 'eBay Buyer Protection',
    description: 'Full security on all purchases',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Express shipping options available',
  },
  {
    icon: Package,
    title: 'Wide Product Range',
    description: '2000+ different product varieties',
  },
];

export default function EbayPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-6">🛍️</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our eBay Store
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 mb-8">
                Serving you with technology and mobile accessory products. 
                You can safely purchase all our products on eBay.
              </p>
              <a
                href="https://www.ebay.com/usr/ymglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg"
              >
                <span>Visit eBay Store</span>
                <ExternalLink size={20} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <feature.icon className="w-10 h-10 mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-yellow-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About eBay Store */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AllMySell on eBay
            </h2>
            <p className="text-lg text-gray-700">
              As AllMySell, we offer technology and mobile accessory products through eBay. 
              From chargers to car accessories, phone cases to USB hubs, we serve you with 
              a wide range of products. All our products can be purchased safely under 
              eBay's buyer protection program.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">19</div>
              <div className="text-gray-700 font-medium">Active Products</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Customer Satisfaction</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">Fast</div>
              <div className="text-gray-700 font-medium">Shipping & Delivery</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Popular products on sale in our eBay store
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <a
                key={index}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block group border border-gray-100"
              >
                <div className="relative w-full h-52 bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-red-600 font-semibold mb-2 uppercase tracking-wide">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-red-600 font-semibold text-sm">View on eBay</span>
                    <ExternalLink className="text-red-600 group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Currently available products from our eBay store
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <a
                key={index}
                href="https://www.ebay.com/usr/ymglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-yellow-50 to-red-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-yellow-100 group block"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{category.description}</p>
                <div className="pt-4 border-t border-yellow-200">
                  <p className="text-red-600 font-semibold text-base">
                    {category.productCount} {category.subtext}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-red-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Our eBay Store
          </h2>
          <p className="text-xl mb-8 text-yellow-100">
            Find the best one for you among thousands of products
          </p>
          <a
            href="https://www.ebay.com/usr/ymglobal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Start Shopping Now</span>
            <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
