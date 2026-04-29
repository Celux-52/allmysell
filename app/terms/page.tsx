import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AllMySell',
  description: 'Terms of Service for AllMySell. Read our terms and conditions for using our platform and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-16 px-4 selection:bg-orange-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Terms of Service
          </h1>
          <p className="text-slate-500 mb-8">Last updated: January 18, 2026</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                By accessing or using AllMySell&apos;s website, SaaS platform, and services, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Platform Services</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                AllMySell provides an AI-powered e-commerce automation platform and web development services. Our services include:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li>AI-powered market trend research and product analysis</li>
                <li>Automated listing generation and optimization tools</li>
                <li>Cross-platform e-commerce management dashboard</li>
                <li>Professional web development and design services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                When you create an account on our platform:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Web Development Services</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                For web development projects:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li>Payment terms are 50% upfront to secure your project slot</li>
                <li>Remaining balance is due upon project completion and approval</li>
                <li>Domain and hosting costs are the responsibility of the client</li>
                <li>We provide revisions within the agreed project scope</li>
                <li>Additional features or changes beyond scope may incur extra charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our platform</li>
                <li>Collect or harvest any personally identifiable information</li>
                <li>Use automated tools to scrape or extract data from our platform</li>
                <li>Share, resell, or redistribute your account access</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                All content on this website and platform, including text, graphics, logos, software, and AI-generated 
                research data, is the property of AllMySell or its content suppliers and is protected by international 
                copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                For web development projects, upon full payment, intellectual property rights of the delivered website 
                transfer to the client.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                While we strive to maintain 99.9% uptime, we do not guarantee uninterrupted access to our platform. 
                We may perform maintenance or updates that temporarily affect availability. We will notify users of 
                planned downtime whenever possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                To the fullest extent permitted by law, AllMySell shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                AI-generated research data is provided as informational guidance only. AllMySell makes no guarantees 
                regarding the accuracy of AI predictions or market analysis results.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                You agree to indemnify and hold AllMySell harmless from any claims, losses, liability, damages, 
                and expenses arising from your violation of these Terms or your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting to this website. Your continued use of our services after changes constitutes acceptance of 
                the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with applicable laws. Any disputes 
                arising from these terms shall be resolved through good-faith negotiation between the parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-slate-400 space-y-2 mb-4">
                <li>📧 Email: melihbicak@gmail.com</li>
                <li>📞 Phone: +90 553 706 59 12</li>
                <li>🌐 Website: <a href="https://allmysell.com/contact" className="text-orange-400 hover:underline">allmysell.com/contact</a></li>
              </ul>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 p-6 rounded-lg">
              <p className="text-slate-400 leading-relaxed">
                <strong className="text-white">Acknowledgment:</strong> By using AllMySell&apos;s platform and services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
