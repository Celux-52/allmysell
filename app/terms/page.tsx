import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AllMySell',
  description: 'Terms of Service for AllMySell. Read our terms and conditions for using our services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: January 18, 2026</p>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using AllMySell's website and services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
              from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Multi-Platform E-Commerce</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AllMySell operates stores on multiple e-commerce platforms including eBay, Amazon, Etsy, Shopify, and 
              TikTok Shop. When you make a purchase through any of these platforms:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>You are subject to that platform's terms of service and policies</li>
              <li>Payment processing and transaction security are handled by the respective platform</li>
              <li>Returns and refunds are governed by both our policies and the platform's policies</li>
              <li>Dispute resolution follows the platform's established procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to provide accurate product descriptions and images. However:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Colors may vary slightly due to screen settings</li>
              <li>We reserve the right to correct any errors in product descriptions or pricing</li>
              <li>Product specifications are provided by manufacturers and may be subject to change</li>
              <li>We do not guarantee compatibility with all devices unless explicitly stated</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices are listed in the currency specified on the respective marketplace platform. Prices are 
              subject to change without notice. Payment is processed securely through the marketplace platform you 
              choose to purchase from.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Shipping policies vary by platform and destination:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>International shipping may be subject to customs duties and taxes</li>
              <li>Risk of loss passes to you upon delivery to the carrier</li>
              <li>We are not responsible for delays caused by shipping carriers or customs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our return policy includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>30-day return period for most items from date of delivery</li>
              <li>Items must be in original condition with all packaging</li>
              <li>Returns must be initiated through the marketplace platform</li>
              <li>Refunds are processed within 3-5 business days after receiving returned items</li>
              <li>Original shipping costs are non-refundable unless the return is due to our error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Products come with manufacturer warranties where applicable. We provide:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>No additional warranty beyond what the manufacturer provides</li>
              <li>All products are sold "as is" unless otherwise stated</li>
              <li>We make no warranties regarding fitness for a particular purpose</li>
              <li>Warranty claims should be directed to the manufacturer</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property 
              of AllMySell or its content suppliers and is protected by international copyright laws. You may not 
              reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of our website</li>
              <li>Collect or harvest any personally identifiable information</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, AllMySell shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
              directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify and hold AllMySell harmless from any claims, losses, liability, damages, 
              and expenses arising from your violation of these Terms or your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
              posting to this website. Your continued use of our services after changes constitutes acceptance of 
              the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes 
              arising from these terms shall be resolved in accordance with the dispute resolution procedures 
              of the marketplace platform where the transaction occurred.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mb-4">
              <li>📧 Email: melihbicak@gmail.com</li>
              <li>📞 Phone: +90 553 706 59 12</li>
              <li>🌐 Website: <a href="https://allmysell.com/contact" className="text-purple-600 hover:underline">allmysell.com/contact</a></li>
            </ul>
          </section>

          <section className="mb-8 bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Acknowledgment:</strong> By using AllMySell's services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
