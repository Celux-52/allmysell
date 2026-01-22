export default function EtsyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 to-pink-500 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">✨</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Etsy Store
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8">
            <p className="text-2xl font-semibold">🚧 Under Construction</p>
          </div>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Our Etsy store is being prepared. Very soon we will be at your service 
            with our special products on Etsy too.
          </p>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon on Etsy
            </h2>
            <p className="text-xl text-gray-600">
              Special products we will offer when our Etsy store opens
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Handmade Products</h3>
              <p className="text-gray-600">
                Custom designs and handcrafted items
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unique Collections</h3>
              <p className="text-gray-600">
                Exclusive designs you can only find here
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized</h3>
              <p className="text-gray-600">
                Customization options upon request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss Our Opening
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Visit our eBay store now to be notified when our Etsy store opens
          </p>
          <a
            href="/ebay"
            className="inline-flex items-center space-x-2 bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Visit Our eBay Store</span>
          </a>
        </div>
      </section>
    </div>
  );
}
