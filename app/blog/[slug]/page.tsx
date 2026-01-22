import { Calendar, Clock, Share2, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// eBay Products - Only active products
const products = [
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
    id: 'usb-car-charger',
    name: 'USB Port Super Fast Car Charger',
    description: 'Adapter For iPhone Samsung Android Cell Phone',
    category: 'Car Accessories',
    image: 'https://i.ebayimg.com/images/g/cf0AAeSwvQ5pXfAv/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/205978408766',
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
    id: 'invisible-holder-charger',
    name: 'Invisible Holder Charger Cable',
    description: '240w super fast charging 2-in-1 Fast with Stand',
    category: 'Chargers',
    image: 'https://i.ebayimg.com/images/g/FTEAAeSw4A9pYTib/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/205985301623',
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
    image: 'https://i.ebayimg.com/images/g/QhkAAeSwoKRpZOXh/s-l1600.webp',
    platform: 'eBay',
    platformLink: 'https://www.ebay.com/itm/206002163067',
  },
];

const generateBlogContent = (product: any) => {
  return {
    title: `Review: ${product.name} - ${product.platform} Best Seller`,
    excerpt: `Discover why ${product.name} is one of the most popular products in the ${product.category} category. Detailed review, features, and user experiences.`,
    date: '2026-01-19',
    readTime: '5 min read',
    
    introduction: `The ${product.name} has become one of the standout products in the ${product.category} market. Available on ${product.platform}, this product offers exceptional value for money and has garnered excellent customer reviews. In this comprehensive review, we'll dive deep into what makes this product special.`,
    
    features: [
      'Premium build quality and durable materials',
      'Easy to use with intuitive design',
      'Compatible with multiple devices and systems',
      'Excellent customer support from verified sellers',
      'Fast shipping with secure packaging',
      'Backed by platform buyer protection',
    ],
    
    specifications: [
      { label: 'Category', value: product.category },
      { label: 'Platform', value: product.platform },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Shipping', value: 'Fast & Secure' },
      { label: 'Warranty', value: 'Buyer Protected' },
    ],
    
    whyChoose: `When shopping for ${product.category} products, the ${product.name} stands out for several compelling reasons. First and foremost, it's available through ${product.platform}, which means you benefit from their comprehensive buyer protection program and secure payment systems. This ensures that your purchase is safe and that you can shop with confidence.

The product has been carefully tested and verified to meet high-quality standards. ${product.description} - making it a versatile choice for various needs and use cases. Whether you're a first-time buyer or an experienced user, this product delivers on its promises.`,
    
    customerExperience: `Customers who purchased this product from our ${product.platform} store have consistently given positive feedback. The combination of quality, price, and service has made it one of our top-selling items. Users particularly appreciate the attention to detail in the design and the reliable performance.

Many customers have noted that the ${product.description.toLowerCase()}, which adds significant value to their purchase. The product arrives well-packaged and ready to use, with clear instructions and excellent build quality that justifies the investment.`,
    
    prosAndCons: {
      pros: [
        'Excellent value for money',
        'High-quality construction',
        'Easy to use and install',
        'Fast shipping options',
        'Secure payment through ' + product.platform,
        'Responsive customer service',
      ],
      cons: [
        'Limited color options',
        'May require adapter for some regions',
      ],
    },
    
    buyingGuide: `If you're considering purchasing the ${product.name}, here are some tips to ensure you get the best experience:

**Check Compatibility**: Before ordering, make sure the product is compatible with your devices or requirements. Read the product specifications carefully on the ${product.platform} listing.

**Read Reviews**: Take time to read customer reviews on the platform. This will give you real-world insights into the product's performance.

**Compare Prices**: While shopping on ${product.platform}, check if there are any ongoing promotions or bundle deals that could save you money.

**Understand Return Policy**: Familiarize yourself with ${product.platform}'s return policy and buyer protection program before making your purchase.

**Contact Seller**: If you have specific questions, don't hesitate to contact the seller through the platform's messaging system.`,
    
    conclusion: `The ${product.name} represents excellent value in the ${product.category} market. Its combination of quality, functionality, and price makes it a standout choice for anyone looking to purchase from ${product.platform}. 

Available now on our verified ${product.platform} store, this product comes with the security and peace of mind that comes with shopping on a trusted platform. With fast shipping, secure packaging, and full buyer protection, you can purchase with confidence.

Whether you're upgrading your current setup or making a first-time purchase, the ${product.name} delivers on all fronts. Don't miss out on this popular item - check it out on our ${product.platform} store today!`,
    
    relatedProducts: products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3),
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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-white/80 hover:text-white mb-6 inline-flex items-center gap-2 text-sm font-medium">
            ← Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
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

          <span className="text-purple-200 font-semibold text-sm uppercase tracking-wider mb-4 block">
            {product.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-purple-100 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
            <p className="text-xl text-gray-700 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-purple-600 first-letter:mr-3 first-letter:float-left">
              {post.introduction}
            </p>
          </div>

          {/* Product Specifications */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.specifications.map((spec, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{spec.label}</span>
                  <span className="text-purple-600 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {post.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose This Product */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose This Product?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.whyChoose}
              </p>
            </div>
          </div>

          {/* Customer Experience */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Experience</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.customerExperience}
              </p>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">✓ Pros</h3>
                <ul className="space-y-2">
                  {post.prosAndCons.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
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
                    <li key={index} className="flex items-start gap-2 text-gray-700">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Buying Guide</h2>
            <div className="prose prose-lg max-w-none bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.buyingGuide}
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Verdict</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.conclusion}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white mb-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Purchase?</h3>
            <p className="text-purple-100 mb-6">
              Get this product now from our verified {product.platform} store
            </p>
            <a
              href={product.platformLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
            >
              <span>View on {product.platform}</span>
              <ExternalLink size={20} />
            </a>
          </div>

          {/* Related Products */}
          {post.relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {post.relatedProducts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.id}`}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group cursor-pointer">
                      <div className="relative h-48">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-purple-600 text-xs font-semibold uppercase">{related.category}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
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
