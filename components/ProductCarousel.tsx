'use client';

import Link from 'next/link';

const products = [
  {
    id: 'laptop-stand-rotating',
    name: 'Laptop Stand',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    category: 'Computer Accessories',
  },
  {
    id: 'phone-holder-rotating',
    name: 'Phone Holder',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    category: 'Car Accessories',
  },
  {
    id: 'usb-hub-8in2',
    name: 'USB Hub 8 in 2',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    category: 'Computer Accessories',
  },
  {
    id: 'magnetic-power-bank-10000',
    name: 'Power Bank 10000mAh',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    category: 'Chargers',
  },
  {
    id: 'portable-charger-20000',
    name: 'Portable Charger 20000mAh',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    category: 'Chargers',
  },
  {
    id: 'wired-earphones-lightning',
    name: 'Wired Earphones',
    image: 'https://i.ebayimg.com/images/g/OBsAAeSwgb9paZsz/s-l1600.webp',
    category: 'Audio',
  },
  {
    id: 'magsafe-sticker-360-ring',
    name: 'MagSafe Sticker 360',
    image: 'https://i.ebayimg.com/images/g/euIAAeSwTh5p0SZ5/s-l1600.webp',
    category: 'Phone Accessories',
  },
  {
    id: 'magnetic-phone-grip-ring',
    name: 'Magnetic Phone Grip Ring',
    image: 'https://i.ebayimg.com/images/g/nSoAAeSw-2Bp0VQE/s-l1600.webp',
    category: 'Phone Accessories',
  },
  {
    id: 'webcam-cover-8pcs',
    name: 'WebCam Cover 8PCS',
    image: 'https://i.ebayimg.com/images/g/nZEAAeSwLydp0V5y/s-l1600.webp',
    category: 'Phone Accessories',
  },
  {
    id: 'magsafe-ring-sticker-black',
    name: 'MagSafe Ring Sticker Black',
    image: 'https://i.ebayimg.com/images/g/JyUAAeSwLeFp0WHH/s-l1600.webp',
    category: 'Phone Accessories',
  },
  {
    id: 'bluetooth-usb-audio-adapter',
    name: 'Bluetooth USB Audio Adapter',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    category: 'Audio Accessories',
  },
  {
    id: 'iphone-17-pro-max-case',
    name: 'iPhone 17 Pro Case',
    image: 'https://i.ebayimg.com/images/g/VlcAAeSwbSBp0ZL1/s-l1600.webp',
    category: 'Phone Accessories',
  },
  {
    id: 'magnetic-phone-case-iphone-16',
    name: 'Magnetic Phone Case iPhone 16',
    image: 'https://i.ebayimg.com/images/g/buoAAeSwlcZp0aA3/s-l1600.webp',
    category: 'Phone Accessories',
  },
];

export default function ProductCarousel() {
  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="py-16 bg-gradient-to-b from-[#000000] to-[#2a2a2a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cornsilk mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quality tech & mobile accessories from our eBay store
          </p>
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#2a2a2a] to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {duplicatedProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/blog/${product.id}`}
              className="flex-shrink-0 w-48 mx-3 group"
            >
              <div className="bg-cornsilk/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#CD853F]/50 transition-all duration-300 hover:scale-105 hover:bg-cornsilk/20">
                <div className="w-40 h-40 bg-cornsilk rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-cornsilk text-sm font-semibold truncate group-hover:text-[#CD853F] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-10">
        <Link
          href="/shop/ebay"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#CD853F] to-[#808000] text-cornsilk px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          View All Products
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
