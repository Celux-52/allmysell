export default function ShopifyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">🏪</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Shopify Store
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8">
            <p className="text-2xl font-semibold">🚧 Under Construction</p>
          </div>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Our Shopify store is being prepared. Very soon we will be at your service 
            with special campaigns on our own e-commerce platform.
          </p>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon on Shopify
            </h2>
            <p className="text-xl text-gray-600">
              Benefits we will offer when our Shopify store opens
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Special Campaigns</h3>
              <p className="text-gray-600">
                Exclusive discounts only for our Shopify store
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Payment</h3>
              <p className="text-gray-600">
                All payment methods and secure shopping
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loyalty Program</h3>
              <p className="text-gray-600">
                Earn points with every purchase, get discounts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss Our Opening
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Visit our eBay store now to be notified when our Shopify store opens
          </p>
          <a
            href="/ebay"
            className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Visit Our eBay Store</span>
          </a>
        </div>
      </section>
    </div>
  );
}
