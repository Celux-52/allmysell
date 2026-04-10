import { Calendar, Clock, Share2, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrackedLink from '@/components/TrackedLink';

// eBay Products - Only active products
const products = [
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
    title: `${product.name} - In-Depth Look & Features`,
    excerpt: `Discover exactly why the ${product.name} is making waves. We break down the build quality, daily usage, and value proposition.`,
    date: '2024-03-15',
    readTime: '4 min read',
    
    introduction: `If you're on the fence about picking up the ${product.name}, this breakdown will help. Finding the right tools for your daily routine isn't always easy, but this item has proven to be a reliable choice for many. Let's look at what you get straight out of the box, and why it might be exactly what you need.`,
    
    features: [
      'Sturdy build designed for long-term use',
      'Intuitive design that requires zero setup time',
      'Broad compatibility right out of the package',
      'Backed by solid platform buyer protection',
      'Fast, tracked shipping direct to your door',
    ],
    
    specifications: [
      { label: 'Category', value: product.category },
      { label: 'Platform', value: product.platform },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Shipping', value: 'Express Options Available' },
      { label: 'Warranty', value: 'Standard Coverage' },
    ],
    
    whyChoose: `The main reason this specific ${product.category} item caught our eye is the balance of price and durability. It's tough to find reliable accessories that don't break the bank, but the ${product.name} strikes that sweet spot perfectly.
    
Furthermore, sourcing this directly from a trusted seller on ${product.platform} adds an extra layer of security to your purchase. You're fully covered by buyer protection policies, meaning you can try it out risk-free.`,
    
    customerExperience: `Feedback from the community highlights the hassle-free experience of using this product day-to-day. People appreciate that it simply works as advertised without requiring constant adjustments or complex manuals.
    
Shipping and packaging also consistently receive top marks. The item arrives securely boxed, preventing any transit damage, which is crucial for sensitive electronics and precision accessories.`,
    
    prosAndCons: {
      pros: [
        'Fantastic price-to-performance ratio',
        'Solid, dependable construction',
        'Plug-and-play simplicity',
        'Fast and secure shipping',
        'Great after-sales support via ' + product.platform,
      ],
      cons: [
        'High demand occasionally causes low stock',
        'Packaging is functional but minimal',
      ],
    },
    
    buyingGuide: `Before pulling the trigger on the ${product.name}, keep these quick tips in mind:

**Verify Your Setup:** Ensure your current devices are compatible. While this item is highly versatile, a quick double-check never hurts.

**Check for Bundle Deals:** Sometimes getting a related accessory at the same time can save on shipping costs.

**Read the Seller Notes:** Take a glance at the item description on ${product.platform} for any new updates or shipping timeframe estimates.`,
    
    conclusion: `To wrap things up, the ${product.name} is a stellar addition to anyone's setup. It handles its primary job effortlessly while maintaining a sleek, unobtrusive profile.
    
If you're ready to upgrade your gear, grab it from our verified store on ${product.platform}. Enjoy the peace of mind that comes with secure checkout and comprehensive buyer protection!`,
    
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
    <div className="bg-[#1A1A1A] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-olive via-peru to-peru text-cornsilk py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-cornsilk/80 hover:text-cornsilk mb-6 inline-flex items-center gap-2 text-sm font-medium">
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

          <span className="text-olive font-semibold text-sm uppercase tracking-wider mb-4 block">
            {product.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-olive leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-12 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-2xl shadow-xl overflow-hidden">
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
            <p className="text-xl text-gray-300 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-olive first-letter:mr-3 first-letter:float-left">
              {post.introduction}
            </p>
          </div>

          {/* Product Specifications */}
          <div className="bg-gradient-to-br from-olive to-peru rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.specifications.map((spec, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-lg p-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-300">{spec.label}</span>
                  <span className="text-olive font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-[#1A1A1A] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose This Product */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Why Choose This Product?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.whyChoose}
              </p>
            </div>
          </div>

          {/* Customer Experience */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Customer Experience</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.customerExperience}
              </p>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">✓ Pros</h3>
                <ul className="space-y-2">
                  {post.prosAndCons.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
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
                    <li key={index} className="flex items-start gap-2 text-gray-300">
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
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Buying Guide</h2>
            <div className="prose prose-lg max-w-none bg-[#111111] rounded-xl p-8">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.buyingGuide}
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-6">Final Verdict</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.conclusion}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="bg-gradient-to-r from-olive to-peru rounded-2xl p-8 text-center text-cornsilk mb-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Purchase?</h3>
            <p className="text-olive mb-6">
              Get this product now from our verified {product.platform} store
            </p>
            <TrackedLink
              href={product.platformLink}
              target="_blank"
              rel="noopener noreferrer"
              buttonId={`blog_buy_now_${product.id}`}
              eventName="blog_purchase_click"
              funnelStep="add_to_cart"
              payload={{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                platform: product.platform
              }}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-olive px-8 py-4 rounded-full font-semibold text-lg hover:bg-peru transition-all hover:scale-105 shadow-lg"
            >
              <span>View on {product.platform}</span>
              <ExternalLink size={20} />
            </TrackedLink>
          </div>

          {/* Related Products */}
          {post.relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-cornsilk mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {post.relatedProducts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.id}`}>
                    <div className="bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group cursor-pointer">
                      <div className="relative h-48">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-olive text-xs font-semibold uppercase">{related.category}</span>
                        <h3 className="text-lg font-bold text-cornsilk mt-1 line-clamp-2 group-hover:text-olive transition-colors">
                          {related.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
