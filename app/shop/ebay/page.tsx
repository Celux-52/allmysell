import { ExternalLink, Package, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';
import EbayClient from './EbayClient';

export const metadata: Metadata = {
  title: 'Our eBay Store - AllMySell | Tech Products',
  keywords: ['eBay store', 'tech accessories', 'mobile accessories', 'chargers', 'power banks', 'car accessories', 'phone cases', 'USB hubs', 'MagSafe', 'Bluetooth adapter', 'iPhone cases'],
};

const products = [
  {
    name: '\"Premium Quality\"Suitable For IPhone13promax Carbon Fiber Phone Case ',
    description: 'Material',
    category: 'Yeni Eklenenler',
    image: 'https://cf.cjdropshipping.com/a2cd2c42-f77a-4f65-9a1f-3b8bc0159f59.jpg',
    link: 'https://www.ebay.com/itm/206206500114',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: '\"Premium Quality\"Suitable For IPhone13promax Carbon Fiber Phone Case ',
    description: 'Material',
    category: 'Yeni Eklenenler',
    image: 'https://cf.cjdropshipping.com/a2cd2c42-f77a-4f65-9a1f-3b8bc0159f59.jpg',
    link: 'https://www.ebay.com/itm/206206494860',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Waterproof Floating Pouch Dry Bag Case Cover For iPhone Cell Phone Touchscreen',
    description: 'Material Plastic Product Attributes Ordinary Package Size 180*100*30(mm) Product...',
    category: 'Yeni Eklenenler',
    image: 'https://cf.cjdropshipping.com/quick/product/7df54fa7-8372-4889-80fb-265970d4ea7e.jpg',
    link: 'https://www.ebay.com/itm/206206476060',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'gaming keyboard and mouse',
    description: 'gaming keyboard and mouse',
    category: 'Yeni Eklenenler',
    image: 'https://i.ebayimg.com/images/g/LHUAAeSwzANp250P/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206206055435',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic Phone Holder For Car, Dashboard Car Phone Holder Mount Magnetic Stainless Steel Car Phone Holder - Dashboard Mount, Water-resistant, Rotatable ',
    description: 'Material Others Product Attributes Ordinary Package Size 56*40*40(mm) Our normal...',
    category: 'Yeni Eklenenler',
    image: 'https://cf.cjdropshipping.com/c8414421-384f-4c91-b47f-29f3f4f363f5.jpg',
    link: 'https://www.ebay.com/itm/206206420598',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Professional Camera Tripod Stand Holder Mount For Cell Phone, Portable Tripod, Mobile Phone Live Stream Holder, Camera Tripod ',
    description: 'Material Others Product Attributes Ordinary Package Size 34*45*345(mm) Our norma...',
    category: 'Yeni Eklenenler',
    image: 'https://cf.cjdropshipping.com/a57d6e8d-b93d-4b70-9fc5-f745fd1809a6.jpg',
    link: 'https://www.ebay.com/itm/206206420282',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: '360 Auto Face Tracking Gimbal AI Smart Gimbal Face Tracking Auto Phone Holder For Smartphone Video Vlog Live Stabilizer Tripod',
    description: 'Description Material Plastic Product Attributes Battery Contains Package Size 18...',
    category: 'Yeni Eklenenler',
    image: 'https://oss-cf.cjdropshipping.com/product/2024/03/18/08/436215b7-79b6-4f55-8a6f-7eb9d470f45d.jpg',
    link: 'https://www.ebay.com/itm/206206420005',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Car Detail Brush Soft Brush Interior Cleaning',
    description: 'Description Material Plastic, Others Product Attributes Ordinary Package Size 24...',
    category: 'Yeni Eklenenler',
    image: 'https://oss-cf.cjdropshipping.com/product/2024/06/02/01/c680b307-6d4f-4fcf-94d5-2d292a7868d6.jpg',
    link: 'https://www.ebay.com/itm/206206419772',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic Cable Clip Under Desk Cable Management Adjustable Cord Holder Wire Organizer And Cable Management Wire Keeper',
    description: 'Description Material Plastic Product Attributes Magnetic Contains Package Size 1...',
    category: 'Yeni Eklenenler',
    image: 'https://oss-cf.cjdropshipping.com/product/2024/03/18/08/7ff788b5-f1d2-44c5-8a1e-fa8fff446737.jpg',
    link: 'https://www.ebay.com/itm/206206419446',
    soldOut: false,
    store: 'ymglobal',
  },
  // NEW TRIANGLES-3 PRODUCTS
  {
    name: 'Universal Car HUD Head Up Display Digital GPS Speedometer',
    description: 'Windshield Projector',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/MJ0AAeSwwatp2E4Y/s-l1600.webp',
    link: 'https://www.ebay.com/itm/318130123471',
    soldOut: false,
    store: 'triangles-3',
  },
  {
    name: 'Hidden Camera Car DVR Dash Cam',
    description: 'USB / WIFI Driving Video Recorder G-sensor',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/XcIAAeSw-dNp2Vn0/s-l1600.webp',
    link: 'https://www.ebay.com/itm/318132495681',
    soldOut: false,
    store: 'triangles-3',
  },
  {
    name: 'Wall Mounted Pegboard Tool Organizer',
    description: 'Rack Kit w/ Storage Bins',
    category: 'Office & Tools',
    image: 'https://i.ebayimg.com/images/g/61kAAeSwzLlp2V1p/s-l960.webp',
    link: 'https://www.ebay.com/itm/318132518371',
    soldOut: false,
    store: 'triangles-3',
  },
  {
    name: 'Air Pressure Gauge Meter Tester',
    description: 'Digital Tire Bike Car Truck LCD Display',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/2I4AAeSwHFFp2V6A/s-l1600.webp',
    link: 'https://www.ebay.com/itm/318132548596',
    soldOut: false,
    store: 'triangles-3',
  },
  {
    name: 'Phone Repair Silicone Pad',
    description: 'Desk Heat Insulation Magnetic Work Mat Soldering Iron',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/NScAAeSwnxZp2V~y/s-l1600.webp',
    link: 'https://www.ebay.com/itm/318132562539',
    soldOut: false,
    store: 'triangles-3',
  },
  // NEW IN-STOCK PRODUCTS (YMGlobal)
  {
    name: '3 in 1 LED Wireless Charger Stand Foldable',
    description: 'Foldable Wireless Charger for iPhone 15 14 13, Watch & AirPods Pro',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/ZqoAAeSwiT9p2Eox/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic MagSafe Wireless Power Bank 5000mAh',
    description: 'Fast Charger for iPhone 17 16 15',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/oIAAAeSwg6Bp2EeD/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: '360° Rotate Metal Desk Phone Holder',
    description: 'Adjustable Stand For Phone & Pad',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/XBsAAeSwDWtp2EXb/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'Car Phone Holder Vent Dashboard',
    description: 'Universal Car Mount for All Phones',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/mYkAAeSw4G1p2ETh/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: 'MagSafe Magnetic Luxury Leather Card Holder Wallet Case',
    description: 'For iPhone 14 Pro Max 13 12',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/bsYAAeSwICVp2EMe/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  {
    name: '9H HD Tempered Glass Screen Protector',
    description: 'For iPhone 16 15 14 13 12 11 Pro Max Clear',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/7HYAAeSwi0Vp2Djv/s-l1600.webp',
    link: 'https://www.ebay.com/usr/ymglobal',
    soldOut: false,
    store: 'ymglobal',
  },
  // SOLD OUT PRODUCTS
  {
    name: 'Adjustable 360° Rotating Laptop Stand',
    description: 'Aluminum Laptop Stand and Hub for Gaming, Gray',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206006630493',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: '360° Rotating Phone Holder',
    description: 'Multi-Function Sun Visor Phone Holder for All Vehicles',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206006629452',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: '8 in 2 USB Hub',
    description: 'Type C HUB Docking Station with 3.5mm Audio Jack Adapter',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205970305941',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic Power Bank 10000mAh',
    description: 'Wireless Portable Charger for iPhone 16/15/14/13/12',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205990599969',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: '20000mAh 45W Portable Charger',
    description: 'Fast Charging Power Bank, Super Fast Charging',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    link: 'https://www.ebay.com/itm/205970285393',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'Wired Earphones Lightning',
    description: 'HiFi Stereo Earbuds for iPhone with Microphone',
    category: 'Audio',
    image: 'https://i.ebayimg.com/images/g/OBsAAeSwgb9paZsz/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206002163067',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'MagSafe Sticker 360 Magnetic Ring 2 Pack',
    description: 'Universal Wireless Charging Adapter Kit',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/euIAAeSwTh5p0SZ5/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206189596772',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic Phone Grip Ring Holder for MagSafe',
    description: 'Magnet Cell Phone Grip Kickstand Universal Holder',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nSoAAeSw-2Bp0VQE/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206189855409',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: '8PCS WebCam Cover Slide Camera Privacy',
    description: 'Security Protect Sticker For Phone Laptop',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nZEAAeSwLydp0V5y/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206189917643',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: '3Black for MagSafe Ring Sticker',
    description: 'Universal Metal Ring Compatible with MagSafe Accessories',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/JyUAAeSwLeFp0WHH/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206189931472',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'Bluetooth 5.0 USB Audio Adapter',
    description: 'Wireless Music Receiver for PC TV Laptop, Low Latency',
    category: 'Audio Accessories',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206190278629',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'For iPhone 17 Pro Max Case',
    description: 'iPhone 17 Pro Phone Cover Shockproof + Tempered Glass',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/VlcAAeSwbSBp0ZL1/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206190239980',
    soldOut: true,
    store: 'ymglobal',
  },
  {
    name: 'Magnetic Phone Case For iPhone 16',
    description: 'iPhone 16 Pro Max Plus Bumper Hard Cover',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/buoAAeSwlcZp0aA3/s-l1600.webp',
    link: 'https://www.ebay.com/itm/206190264444',
    soldOut: true,
    store: 'ymglobal',
  },
];

const categories = [
  {
    name: 'Chargers & Power Banks',
    description: 'Fast chargers, power banks and charging cables',
    productCount: '0',
    subtext: 'currently in stock',
    icon: '🔋',
  },
  {
    name: 'Car Accessories',
    description: 'Car chargers, AI Box and dash cameras',
    productCount: '0',
    subtext: 'currently in stock',
    icon: '🚗',
  },
  {
    name: 'Phone & Tablet Accessories',
    description: 'Cases, tripods and mobile accessories',
    productCount: '0',
    subtext: 'currently in stock',
    icon: '📱',
  },
  {
    name: 'Computer Accessories',
    description: 'USB hubs and connectivity products',
    productCount: '0',
    subtext: 'currently in stock',
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
    description: 'New products coming soon',
  },
];

export default function EbayPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-peru to-olive text-cornsilk py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-6 animate-bounceIn">🛍️</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slideInLeft">
                Our eBay Store
              </h1>
              <p className="text-xl md:text-2xl text-peru mb-4 animate-slideInLeft" style={{animationDelay: '0.1s'}}>
                Serving you with technology and mobile accessory products. 
                You can safely purchase all our products on eBay.
              </p>
              {/* New Stock Notice */}
              <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4 mb-8 animate-slideInLeft" style={{animationDelay: '0.15s'}}>
                <p className="text-green-300 font-semibold flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  6 new products just arrived! Shop now while stocks last.
                </p>
              </div>
              <TrackedLink
                href="https://www.ebay.com/usr/ymglobal"
                target="_blank"
                rel="noopener noreferrer"
                buttonId="ebay_store_hero_btn"
                eventName="visit_ebay_store"
                className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-olive px-8 py-4 rounded-full font-semibold text-lg hover:bg-olive transition-all hover:scale-105 shadow-lg animate-slideInLeft"
                style={{animationDelay: '0.2s'}}
              >
                <span>Visit eBay Store</span>
                <ExternalLink size={20} />
              </TrackedLink>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-cornsilk/10 backdrop-blur-sm p-6 rounded-xl animate-slideInRight" style={{animationDelay: `${index * 0.1}s`}}>
                  <feature.icon className="w-10 h-10 mb-3 animate-float" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-peru">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About eBay Store */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-slideInUp">
            <h2 className="text-4xl font-bold text-cornsilk mb-6">
              AllMySell on eBay
            </h2>
            <p className="text-lg text-gray-300">
              As AllMySell, we offer technology and mobile accessory products through eBay. 
              From chargers to car accessories, phone cases to USB hubs, we serve you with 
              a wide range of products. All our products can be purchased safely under 
              eBay's buyer protection program.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#E8750A]/10">
              <div className="text-4xl font-bold text-green-500 mb-2">{products.filter(p => !p.soldOut).length}</div>
              <div className="text-gray-400 font-medium">In Stock</div>
              <div className="text-xs text-green-400 mt-1">Available Now</div>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#E8750A]/10">
              <div className="text-4xl font-bold text-[#E8750A] mb-2">100%</div>
              <div className="text-gray-400 font-medium">Customer Satisfaction</div>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#E8750A]/10">
              <div className="text-4xl font-bold text-[#E8750A] mb-2">Fast</div>
              <div className="text-gray-400 font-medium">Shipping & Delivery</div>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#E8750A]/10">
              <div className="text-4xl font-bold text-[#E8750A] mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slideInUp">
            <h2 className="text-4xl font-bold text-cornsilk mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-400 mb-4">
              Our eBay store product catalog
            </p>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-3 rounded-full font-semibold">
              🔥 {products.filter(p => !p.soldOut).length} new products in stock — Shop now!
            </div>
          </div>
          </div>
          <EbayClient products={products} />
      </section>
      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cornsilk mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-400">
              All categories currently out of stock — restocking soon
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <TrackedLink
                key={index}
                href="https://www.ebay.com/usr/ymglobal"
                target="_blank"
                rel="noopener noreferrer"
                eventName="ebay_category_click"
                buttonId={`ebay_category_${index}`}
                payload={{ category_name: category.name }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#E8750A]/10 group block"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 grayscale opacity-60">{category.icon}</div>
                <h3 className="text-xl font-bold text-cornsilk mb-3 group-hover:text-[#E8750A] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm">{category.description}</p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-red-500 font-semibold text-base">
                    {category.productCount} {category.subtext}
                  </p>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Our eBay Store
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Stay tuned! New products are being restocked soon.
          </p>
          <TrackedLink
            href="https://www.ebay.com/usr/ymglobal"
            target="_blank"
            rel="noopener noreferrer"
            buttonId="ebay_store_bottom_cta"
            eventName="visit_ebay_store_footer"
            className="inline-flex items-center space-x-2 bg-[#0A0A0A] text-[#E8750A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1A1A1A] transition-all hover:scale-105 shadow-lg"
          >
            <span>Check eBay Store</span>
            <ExternalLink size={20} />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
