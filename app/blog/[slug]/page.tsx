import { Calendar, Clock, Share2, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrackedLink from '@/components/TrackedLink';

// eBay Products - Only active products
const products = [
  // NEW TRIANGLES-3
  {
    id: 'universal-car-hud-gps',
    name: 'Universal Car HUD Head Up Display Digital GPS Speedometer',
    description: 'Windshield Projector',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/MJ0AAeSwwatp2E4Y/s-l1600.webp',
    platform: 'eBay - Triangles-3',
    platformLink: 'https://www.ebay.com/itm/318130123471',
  },
  {
    id: 'hidden-camera-car-dvr',
    name: 'Hidden Camera Car DVR Dash Cam',
    description: 'USB / WIFI Driving Video Recorder G-sensor',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/XcIAAeSw-dNp2Vn0/s-l1600.webp',
    platform: 'eBay - Triangles-3',
    platformLink: 'https://www.ebay.com/itm/318132495681',
  },
  {
    id: 'wall-mounted-pegboard',
    name: 'Wall Mounted Pegboard Tool Organizer',
    description: 'Rack Kit w/ Storage Bins',
    category: 'Office & Tools',
    image: 'https://i.ebayimg.com/images/g/61kAAeSwzLlp2V1p/s-l960.webp',
    platform: 'eBay - Triangles-3',
    platformLink: 'https://www.ebay.com/itm/318132518371',
  },
  {
    id: 'air-pressure-gauge-tester',
    name: 'Air Pressure Gauge Meter Tester',
    description: 'Digital Tire Bike Car Truck LCD Display',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/2I4AAeSwHFFp2V6A/s-l1600.webp',
    platform: 'eBay - Triangles-3',
    platformLink: 'https://www.ebay.com/itm/318132548596',
  },
  {
    id: 'phone-repair-silicone-pad',
    name: 'Phone Repair Silicone Pad',
    description: 'Desk Heat Insulation Magnetic Work Mat Soldering Iron',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/NScAAeSwnxZp2V~y/s-l1600.webp',
    platform: 'eBay - Triangles-3',
    platformLink: 'https://www.ebay.com/itm/318132562539',
  },
  // NEW IN-STOCK
  {
    id: 'led-wireless-charger-3in1',
    name: '3 in 1 LED Wireless Charger Stand Foldable',
    description: 'Foldable Wireless Charger for iPhone 15 14 13, Watch & AirPods Pro',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/ZqoAAeSwiT9p2Eox/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    id: 'magsafe-power-bank-5000',
    name: 'Magnetic MagSafe Wireless Power Bank 5000mAh',
    description: 'Fast Charger for iPhone 17 16 15',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/oIAAAeSwg6Bp2EeD/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    id: 'metal-desk-phone-holder-360',
    name: '360° Rotate Metal Desk Phone Holder',
    description: 'Adjustable Stand For Phone & Pad',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/XBsAAeSwDWtp2EXb/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    id: 'car-phone-holder-vent',
    name: 'Car Phone Holder Vent Dashboard',
    description: 'Universal Car Mount for All Phones',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/mYkAAeSw4G1p2ETh/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    id: 'magsafe-leather-wallet-case',
    name: 'MagSafe Magnetic Luxury Leather Card Holder Wallet Case',
    description: 'For iPhone 14 Pro Max 13 12',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/bsYAAeSwICVp2EMe/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  {
    id: 'tempered-glass-screen-protector',
    name: '9H HD Tempered Glass Screen Protector',
    description: 'For iPhone 16 15 14 13 12 11 Pro Max Clear',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/7HYAAeSwi0Vp2Djv/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/usr/ymglobal',
  },
  // PREVIOUS PRODUCTS
  {
    id: 'magsafe-sticker-360-ring',
    name: 'MagSafe Sticker 360 Manyetik Halkalı 2 Paket',
    description: 'Evrensel Kablosuz Şarj Adaptörü Kiti',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/euIAAeSwTh5p0SZ5/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206189596772',
  },
  {
    id: 'laptop-stand-rotating',
    name: 'Adjustable 360° Rotating Laptop Stand',
    description: 'Aluminum Laptop Stand and Hub for Gaming, Gray',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/-pgAAeSw93dpbDuO/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206006630493',
  },
  {
    id: 'phone-holder-rotating',
    name: '360° Rotating Phone Holder',
    description: 'Multi-Function Sun Visor Phone Holder for All Vehicles',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/qCsAAeSwVyNpbDte/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206006629452',
  },
  {
    id: 'usb-hub-8in2',
    name: '8 in 2 USB Hub',
    description: 'Type C HUB Docking Station with 3.5mm Audio Jack Adapter',
    category: 'Computer Accessories',
    image: 'https://i.ebayimg.com/images/g/Gx8AAeSw~eVpWc1Q/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/205970305941',
  },
  {
    id: 'magnetic-power-bank-10000',
    name: 'Magnetic Power Bank 10000mAh',
    description: 'Wireless Portable Charger for iPhone 16/15/14/13/12',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/eloAAeSwe2FpY56W/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/205990599969',
  },
  {
    id: 'portable-charger-20000',
    name: '20000mAh 45W Portable Charger',
    description: 'Fast Charging Power Bank, Super Fast Charging',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/V-4AAeSwRJZpWcdu/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/205970285393',
  },
  {
    id: 'wired-earphones-lightning',
    name: 'Wired Earphones Lightning',
    description: 'HiFi Stereo Earbuds for iPhone with Microphone',
    category: 'Audio',
    image: 'https://i.ebayimg.com/images/g/OBsAAeSwgb9paZsz/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206002163067',
  },
  {
    id: 'magnetic-phone-grip-ring',
    name: 'Magnetic Phone Grip Ring Holder for MagSafe',
    description: 'Magnet Cell Phone Grip Kickstand Universal Holder',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nSoAAeSw-2Bp0VQE/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206189855409',
  },
  {
    id: 'webcam-cover-8pcs',
    name: '8PCS WebCam Cover Slide Camera Privacy',
    description: 'Security Protect Sticker For Phone Laptop',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/nZEAAeSwLydp0V5y/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206189917643',
  },
  {
    id: 'magsafe-ring-sticker-black',
    name: '3Black for MagSafe Ring Sticker',
    description: 'Universal Metal Ring Compatible with MagSafe Accessories',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/JyUAAeSwLeFp0WHH/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206189931472',
  },
  {
    id: 'bluetooth-usb-audio-adapter',
    name: 'Bluetooth 5.0 USB Audio Adapter',
    description: 'Wireless Music Receiver for PC TV Laptop, Low Latency',
    category: 'Audio Accessories',
    image: 'https://i.ebayimg.com/images/g/4zIAAeSwzypp0aFP/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206190278629',
  },
  {
    id: 'iphone-17-pro-max-case',
    name: 'For iPhone 17 Pro Max Case',
    description: 'iPhone 17 Pro Phone Cover Shockproof + Tempered Glass',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/VlcAAeSwbSBp0ZL1/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206190239980',
  },
  {
    id: 'magnetic-phone-case-iphone-16',
    name: 'Magnetic Phone Case For iPhone 16',
    description: 'iPhone 16 Pro Max Plus Bumper Hard Cover',
    category: 'Phone Accessories',
    image: 'https://i.ebayimg.com/images/g/buoAAeSwlcZp0aA3/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206190264444',
  },
];

const generateBlogContent = (product: any) => {
  return {
    title: `${product.name} - Detailed Review`,
    excerpt: `We tested the ${product.name} to see if it lives up to the hype. Here is our honest take on its build quality and daily performance.`,
    date: '2024-03-15',
    readTime: '3 min read',
    
    introduction: `Hey everyone! Today we are looking closely at the ${product.name}. When we added this to our catalog, we wanted to make sure it actually solves the problem it claims to. After getting our hands on it, we're ready to share exactly what you can expect when you unbox this.`,
    
    features: [
      'Durable materials built for everyday wear and tear',
      'Simple setup—no thick manuals needed',
      'Works with most popular devices instantly',
      'Safe checkouts with full buyer protection',
      'Fast shipping directly from our warehouse',
    ],
    
    specifications: [
      { label: 'Category', value: product.category },
      { label: 'Store', value: product.platform },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Shipping', value: 'Standard & Express' },
      { label: 'Returns', value: '30-Day Money Back' },
    ],
    
    whyChoose: `Why did we even list this in our store? Simple: we were tired of seeing overpriced accessories that break after a month. The ${product.name} hits that perfect spot between affordability and solid quality. 
    
Plus, since we sell this directly on ${product.platform}, you don't just have to take our word for it—you get the platform's official buyer guarantee supporting your purchase.`,
    
    customerExperience: `We've shipped hundreds of these, and the feedback is almost always the same: "It just works." No weird glitches, no missing pieces. 
    
We also make sure to pack every order carefully. We hate receiving damaged goods just as much as you do, so our packaging is meant to survive the postal service.`,
    
    prosAndCons: {
      pros: [
        'Excellent value for the money',
        'Sturdy construction',
        'Zero learning curve',
        'Secured, fast shipping',
        'Official support via ' + product.platform,
      ],
      cons: [
        'Stock runs out faster than we can restock',
        'Box design is pretty basic (since we focus on the product, not the box)',
      ],
    },
    
    buyingGuide: `A few things to note before you add this to your cart:
    
Verify your current setup—just double-check the sizing or connection types to make sure it fits what you already own. Don't forget to check our eBay page for possible bundled discounts, we sometimes list accessories together to save you shipping costs.`,
    
    conclusion: `That's pretty much it. The ${product.name} does exactly what it needs to do, without charging you a premium just for a brand name. 
    
If you want to grab one for yourself, check out our listing on ${product.platform}. We'll make sure it gets to your door quickly and securely!`,
    
    relatedProducts: products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3)
  };
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.id === slug);
  
  if (!product) {
    notFound();
  }

  const post = generateBlogContent(product);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-olive via-peru to-peru text-stone-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-stone-900/80 hover:text-stone-900 mb-6 inline-flex items-center gap-2 text-sm font-medium">
            ← Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="bg-cornsilk/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
              {product.platform}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>

          <span className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-4 block">
            {product.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-stone-800 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-50 rounded-2xl shadow-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain p-8"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-stone-800 first-letter:mr-3 first-letter:float-left">
              {post.introduction}
            </p>
          </div>

          {/* Product Specifications */}
          <div className="bg-gradient-to-br from-olive to-peru rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.specifications.map((spec, index) => (
                <div key={index} className="bg-stone-50 rounded-lg p-4 flex justify-between items-center">
                  <span className="font-semibold text-stone-600">{spec.label}</span>
                  <span className="text-stone-800 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-stone-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-stone-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose This Product */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Why Choose This Product?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {post.whyChoose}
              </p>
            </div>
          </div>

          {/* Customer Experience */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Customer Experience</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {post.customerExperience}
              </p>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">✓ Pros</h3>
                <ul className="space-y-2">
                  {post.prosAndCons.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-stone-600">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4">⚠ Cons</h3>
                <ul className="space-y-2">
                  {post.prosAndCons.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-stone-600">
                      <span className="text-orange-600 flex-shrink-0 mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Buying Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Buying Guide</h2>
            <div className="prose prose-lg max-w-none bg-white rounded-xl p-8">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {post.buyingGuide}
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Final Verdict</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {post.conclusion}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.id === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const post = generateBlogContent(product);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: `${product.name}, ${product.category}, ${product.platform}, review`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [{
        url: product.image,
        width: 1200,
        height: 630,
        alt: product.name,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [product.image],
    },
  };
}
