export default function EtsyPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 to-peru text-cornsilk py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">✨</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AllMySell Etsy Store
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Discover our unique and handcrafted products on Etsy
          </p>
          <a
            href="https://www.etsy.com/shop/Allmysell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-peru px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>👉 Visit Our Etsy Shop</span>
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cornsilk mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-400">
              Best sellers from our Etsy store
            </p>
          </div>

          {/* Product Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all hover:scale-105 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="bg-black p-8 flex items-center justify-center">
                <img
                  src="https://i.etsystatic.com/64142787/r/il/8ec545/7968421905/il_794xN.7968421905_im0c.jpg"
                  alt="İ Am Affirmation Tee – Minimalist Self Love T-Shirt"
                  className="max-h-80 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-cornsilk mb-4">
                  İ Am Affirmation Tee
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Minimalist Self Love T-Shirt
                </p>
                <p className="text-gray-400 mb-8">
                  A comfortable and stylish affirmation tee with a minimalist design, perfect for anyone looking to spread positivity and self-love through fashion.
                </p>
                <a
                  href="https://www.etsy.com/listing/4489801805/i-am-affirmation-tee-minimalist-self?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_1&logging_key=725dd1b80d430c0a2abc6e81d227d9da177b20cd%3A4489801805"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 w-fit"
                >
                  <span>View on Etsy</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Etsy Store */}
      <section className="bg-gradient-to-r from-orange-400 to-peru text-cornsilk py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Shop on Our Etsy Store?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p>Carefully selected and crafted items</p>
            </div>
            <div>
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-bold mb-2">Unique Designs</h3>
              <p>Exclusive products you won't find elsewhere</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p>Quick delivery right to your door</p>
            </div>
          </div>
          <a
            href="https://www.etsy.com/shop/Allmysell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-peru px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-lg mt-12"
          >
            <span>🛍️ Browse Our Full Collection</span>
          </a>
        </div>
      </section>
    </div>
  );
}
