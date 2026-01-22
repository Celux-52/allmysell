import { ExternalLink, Package, Shield, Star } from 'lucide-react';

const categories = [
  {
    name: 'Amazon\'s Choice',
    description: 'Most preferred and highly rated products',
    productCount: '300+',
    icon: '⭐',
  },
  {
    name: 'Electronics & Technology',
    description: 'Latest technology products and accessories',
    productCount: '600+',
    icon: '💻',
  },
  {
    name: 'Books & Media',
    description: 'Thousands of books, e-books and digital content',
    productCount: '1000+',
    icon: '📚',
  },
  {
    name: 'Home & Kitchen',
    description: 'Products that make your home life easier',
    productCount: '500+',
    icon: '🏡',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Amazon Guarantee',
    description: 'A to Z buyer protection',
  },
  {
    icon: Package,
    title: 'Prime Membership',
    description: 'Fast and free shipping',
  },
  {
    icon: Star,
    title: 'High Seller Rating',
    description: '4.8/5 customer satisfaction',
  },
];

export default function AmazonPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-yellow-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">📦</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Amazon Store
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8">
            <p className="text-2xl font-semibold">🚧 Under Construction</p>
          </div>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Our Amazon store is being prepared. Very soon we will be serving you 
            with our technology and mobile accessory products on Amazon as well.
          </p>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon on Amazon
            </h2>
            <p className="text-xl text-gray-600">
              Benefits we will offer when our Amazon store opens
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prime Delivery</h3>
              <p className="text-gray-600">
                Fast and free shipping advantage for Amazon Prime members
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Amazon Guarantee</h3>
              <p className="text-gray-600">
                Safe shopping with A to Z buyer protection
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wide Product Range</h3>
              <p className="text-gray-600">
                More product variety and stock options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss the Opening Announcement
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Visit our eBay store now to be notified when our Amazon store opens
          </p>
          <a
            href="/ebay"
            className="inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Visit Our eBay Store</span>
          </a>
        </div>
      </section>
    </div>
  );
}
