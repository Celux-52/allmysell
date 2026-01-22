export default function TikTokPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">🎥</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            TikTok Shop
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full mb-8">
            <p className="text-2xl font-semibold">🚧 Under Construction</p>
          </div>
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto">
            Our TikTok Shop store is being prepared. Very soon we will offer a new 
            shopping experience with social commerce and live streams.
          </p>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon on TikTok Shop
            </h2>
            <p className="text-xl text-gray-600">
              Features we will offer when our TikTok Shop store opens
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="text-5xl mb-4">🔴</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Streams</h3>
              <p className="text-gray-600">
                Live shopping events and special offers
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="text-5xl mb-4">📹</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Shopping</h3>
              <p className="text-gray-600">
                Discover products through videos and purchase
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Viral Products</h3>
              <p className="text-gray-600">
                Be the first to discover trending products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss Our Opening
          </h2>
          <p className="text-xl mb-8 text-cyan-100">
            Visit our eBay store now to be notified when our TikTok Shop store opens
          </p>
          <a
            href="/ebay"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>Visit Our eBay Store</span>
          </a>
        </div>
      </section>
    </div>
  );
}
