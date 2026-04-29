import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AllMySell',
  description: 'Privacy Policy for AllMySell. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-16 px-4 selection:bg-orange-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-500 mb-8">Last updated: January 18, 2026</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Welcome to AllMySell. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and use our platform services, and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li><strong className="text-slate-300">Identity Data:</strong> Name, username or similar identifier</li>
                <li><strong className="text-slate-300">Contact Data:</strong> Email address and telephone numbers</li>
                <li><strong className="text-slate-300">Technical Data:</strong> IP address, browser type, time zone, and device information</li>
                <li><strong className="text-slate-300">Usage Data:</strong> Information about how you use our website, platform, and services</li>
                <li><strong className="text-slate-300">Research Data:</strong> AI research queries and saved results within the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li>To provide and maintain our SaaS platform services</li>
                <li>To manage your account and provide customer support</li>
                <li>To improve our website, AI tools, and platform features</li>
                <li>To deliver web development services you have contracted</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain 
                information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We have implemented appropriate security measures to prevent your personal data from being accidentally 
                lost, used, or accessed in an unauthorized way. We use SSL encryption, secure authentication via Supabase, 
                and limit access to your personal data to authorized personnel only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We use third-party services to provide and improve our platform, including Supabase for authentication 
                and data storage, Vercel for hosting, Google Analytics for website analytics, and various AI APIs for 
                research features. Each service has its own privacy policy governing how they handle data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Under data protection laws, you have rights including:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                <li><strong className="text-slate-300">Right to access:</strong> Request access to your personal data</li>
                <li><strong className="text-slate-300">Right to rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-slate-300">Right to erasure:</strong> Request deletion of your personal data</li>
                <li><strong className="text-slate-300">Right to restrict processing:</strong> Request restriction of processing your data</li>
                <li><strong className="text-slate-300">Right to data portability:</strong> Request transfer of your data</li>
                <li><strong className="text-slate-300">Right to object:</strong> Object to processing of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected 
                it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Our services are not directed to children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-slate-400 space-y-2 mb-4">
                <li>📧 Email: melihbicak@gmail.com</li>
                <li>📞 Phone: +90 553 706 59 12</li>
                <li>🌐 Website: <a href="https://allmysell.com/contact" className="text-orange-400 hover:underline">allmysell.com/contact</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
