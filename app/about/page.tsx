import { Target, Users, TrendingUp, Globe2, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - AllMySell | Our Story & Multi-Platform Vision',
  description: 'Learn about AllMySell\'s journey from two university students to a multi-platform e-commerce brand. Our vision for global marketplace presence.',
  keywords: ['about AllMySell', 'e-commerce brand', 'tech accessories seller', 'multi-platform strategy'],
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              A growing brand with multi-channel sales strategy, 
              establishing strong presence across global e-commerce platforms
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                AllMySell is an innovative brand that stands out in the global 
                e-commerce ecosystem with a multi-platform sales strategy. We are 
                currently actively selling on eBay. Our stores on platforms like 
                Amazon, Etsy, Shopify and TikTok Shop will open very soon.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With our technology and mobile accessory focused products, we aim to 
                provide our customers with a quality and reliable shopping experience. 
                Our eBay store features chargers, car accessories, phone cases and more.
              </p>
              <p className="text-lg text-gray-700">
                Our goal is to be a trusted brand in global markets by offering the 
                right product on the right platform. Instead of being limited to a 
                single platform, we are growing with our strategy that provides 
                multi-directional access.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white p-3 rounded-lg">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Our Goal
                    </h3>
                    <p className="text-gray-700">
                      To be a leader in global markets with multi-platform strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Customer Focused
                    </h3>
                    <p className="text-gray-700">
                      Providing superior customer experience on every platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white p-3 rounded-lg">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Continuous Growth
                    </h3>
                    <p className="text-gray-700">
                      Continuing to expand with new platforms and markets
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    <Globe2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Global Vision
                    </h3>
                    <p className="text-gray-700">
                      Reaching and serving customers worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Multi-Platform E-Commerce Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reaching a wide customer base by leveraging the unique 
              advantages of each platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Platform Diversity
              </h3>
              <p className="text-gray-600">
                We reach every customer segment by having presence on platforms 
                with different features such as eBay, Amazon, Etsy, Shopify and 
                TikTok Shop.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Optimized Sales
              </h3>
              <p className="text-gray-600">
                We present our products in the most efficient way by analyzing 
                each platform's algorithm and user behaviors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Rapid Growth
              </h3>
              <p className="text-gray-600">
                Without depending on a single platform, we achieve sustainable 
                and rapid growth with our multi-channel sales strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                Premium quality products and services on every platform
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                Customer satisfaction and trust-oriented approach
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Speed</h3>
              <p className="text-gray-600">
                Fast delivery and customer support services
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuous development and new platform integrations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team & Contact
            </h2>
            <p className="text-xl text-gray-600">
              Meet our partners and get in touch
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  M
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Melih</h3>
                  <p className="text-gray-600">Co-Founder & Partner</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone size={20} className="text-purple-600" />
                  <span>+90 553 706 59 12</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={20} className="text-purple-600" />
                  <span>melihbicak@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  Y
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Şükür Yunus</h3>
                  <p className="text-gray-600">Co-Founder & Partner</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone size={20} className="text-blue-600" />
                  <span>+90 551 834 30 30</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={20} className="text-blue-600" />
                  <span>yunussukur7@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our eBay Store
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our technology products in our currently active eBay store
          </p>
          <Link
            href="/ebay"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            View eBay Store
          </Link>
        </div>
      </section>
    </div>
  );
}
