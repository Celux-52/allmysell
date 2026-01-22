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
    id: 'usb-car-charger',
    name: 'USB Car Charger',
    image: 'https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp',
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
    id: 'invisible-holder-charger',
    name: 'Invisible Charger',
    image: 'https://i.ebayimg.com/images/g/FTEAAeSw4A9pYTib/s-l1600.webp',
    category: 'Chargers',
  },
  {
    id: 'portable-charger-20000',
    name: 'Portable Charger 20000mAh',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    category: 'Chargers',
  },
  {
    id: 'supfine-magnetic-case',
    name: 'Magnetic iPhone Case',
    image: 'https://i.ebayimg.com/images/g/k1wAAeSwhfFpVQd3/s-l1600.webp',
    category: 'Phone Accessories',
  },
];

export default function ProductCarousel() {
  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quality tech & mobile accessories from our eBay store
          </p>
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#2a2a2a] to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {duplicatedProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/blog/${product.id}`}
              className="flex-shrink-0 w-48 mx-3 group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#E07A2C]/50 transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="w-40 h-40 bg-white rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white text-sm font-semibold truncate group-hover:text-[#E07A2C] transition-colors">
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
          href="/ebay"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2C] to-[#8B5A2B] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
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
