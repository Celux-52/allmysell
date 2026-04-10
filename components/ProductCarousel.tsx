'use client';

import Link from 'next/link';

const products = [
  // NEW IN-STOCK
  {
    id: 'led-wireless-charger-3in1',
    name: '3in1 LED Wireless Charger',
    image: 'https://i.ebayimg.com/images/g/ZqoAAeSwiT9p2Eox/s-l1600.webp',
    category: 'Chargers',
    soldOut: false,
  },
  {
    id: 'magsafe-power-bank-5000',
    name: 'MagSafe Power Bank 5000mAh',
    image: 'https://i.ebayimg.com/images/g/oIAAAeSwg6Bp2EeD/s-l1600.webp',
    category: 'Chargers',
    soldOut: false,
  },
  {
    id: 'metal-desk-phone-holder-360',
    name: '360° Desk Phone Holder',
    image: 'https://i.ebayimg.com/images/g/XBsAAeSwDWtp2EXb/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: false,
  },
  {
    id: 'car-phone-holder-vent',
    name: 'Car Phone Holder',
    image: 'https://i.ebayimg.com/images/g/mYkAAeSw4G1p2ETh/s-l1600.webp',
    category: 'Car Accessories',
    soldOut: false,
  },
  {
    id: 'magsafe-leather-wallet-case',
    name: 'MagSafe Leather Wallet Case',
    image: 'https://i.ebayimg.com/images/g/bsYAAeSwICVp2EMe/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: false,
  },
  {
    id: 'tempered-glass-screen-protector',
    name: 'Tempered Glass Protector',
    image: 'https://i.ebayimg.com/images/g/7HYAAeSwi0Vp2Djv/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: false,
  },
  // PREVIOUS (SOLD OUT)
  {
    id: 'laptop-stand-rotating',
    name: 'Laptop Stand',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    category: 'Computer Accessories',
    soldOut: true,
  },
  {
    id: 'phone-holder-rotating',
    name: 'Phone Holder',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    category: 'Car Accessories',
    soldOut: true,
  },
  {
    id: 'usb-hub-8in2',
    name: 'USB Hub 8 in 2',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    category: 'Computer Accessories',
    soldOut: true,
  },
  {
    id: 'magnetic-power-bank-10000',
    name: 'Power Bank 10000mAh',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    category: 'Chargers',
    soldOut: true,
  },
  {
    id: 'portable-charger-20000',
    name: 'Portable Charger 20000mAh',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    category: 'Chargers',
    soldOut: true,
  },
  {
    id: 'wired-earphones-lightning',
    name: 'Wired Earphones',
    image: 'https://i.ebayimg.com/images/g/OBsAAeSwgb9paZsz/s-l1600.webp',
    category: 'Audio',
    soldOut: true,
  },
  {
    id: 'magsafe-sticker-360-ring',
    name: 'MagSafe Sticker 360',
    image: 'https://i.ebayimg.com/images/g/euIAAeSwTh5p0SZ5/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
  {
    id: 'magnetic-phone-grip-ring',
    name: 'Magnetic Phone Grip Ring',
    image: 'https://i.ebayimg.com/images/g/nSoAAeSw-2Bp0VQE/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
  {
    id: 'webcam-cover-8pcs',
    name: 'WebCam Cover 8PCS',
    image: 'https://i.ebayimg.com/images/g/nZEAAeSwLydp0V5y/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
  {
    id: 'magsafe-ring-sticker-black',
    name: 'MagSafe Ring Sticker Black',
    image: 'https://i.ebayimg.com/images/g/JyUAAeSwLeFp0WHH/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
  {
    id: 'bluetooth-usb-audio-adapter',
    name: 'Bluetooth USB Audio Adapter',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    category: 'Audio Accessories',
    soldOut: true,
  },
  {
    id: 'iphone-17-pro-max-case',
    name: 'iPhone 17 Pro Case',
    image: 'https://i.ebayimg.com/images/g/VlcAAeSwbSBp0ZL1/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
  {
    id: 'magnetic-phone-case-iphone-16',
    name: 'Magnetic Phone Case iPhone 16',
    image: 'https://i.ebayimg.com/images/g/buoAAeSwlcZp0aA3/s-l1600.webp',
    category: 'Phone Accessories',
    soldOut: true,
  },
];

export default function ProductCarousel() {
  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="py-16 bg-gradient-to-b from-[#0A0A0A] to-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cornsilk mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-3">
            Tech & mobile accessories from our eBay store
          </p>
          <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            🔥 New products available — Shop now!
          </span>
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#111111] to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {duplicatedProducts.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/blog/${product.id}`}
              className="flex-shrink-0 w-48 mx-3 group"
            >
              <div className={`relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${product.soldOut ? 'border-gray-800' : 'border-[#E8750A]/20 hover:border-[#E8750A]/50'}`}>
                {product.soldOut ? (
                  <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SOLD OUT
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    IN STOCK
                  </div>
                )}
                <div className="w-40 h-40 bg-[#252525] rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-contain p-2 ${product.soldOut ? 'grayscale opacity-50' : 'opacity-100'}`}
                  />
                </div>
                <h3 className={`text-sm font-semibold truncate ${product.soldOut ? 'text-gray-400' : 'text-cornsilk group-hover:text-[#E8750A]'}`}>
                  {product.name}
                </h3>
                <p className={`text-xs truncate ${product.soldOut ? 'text-gray-600' : 'text-[#E8750A]/70'}`}>
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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-[#E8750A]/20"
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
