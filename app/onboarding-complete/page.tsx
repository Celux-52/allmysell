'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingCompletePage() {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const platformNames: Record<string, string> = {
    ebay: 'eBay',
    amazon: 'Amazon',
    shopify: 'Shopify',
    etsy: 'Etsy',
    tiktok: 'TikTok Shop',
    other: 'Other Platform',
  };

  const orderLabels: Record<string, string> = {
    low: '0-10 orders/month',
    medium: '11-50 orders/month',
    high: '51-200 orders/month',
    'very-high': '200+ orders/month',
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-400" size={48} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome, {userInfo?.fullName}! 🎉
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Your profile is complete. We&apos;re ready to tailor the experience for you.
          </p>

          {/* Profile Summary */}
          {userInfo && (
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-slate-500 text-sm mb-1">Email</p>
                  <p className="text-white font-semibold">{userInfo.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1">Platform</p>
                  <p className="text-white font-semibold">{platformNames[userInfo.platform] || userInfo.platform}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1">Monthly Volume</p>
                  <p className="text-white font-semibold">{orderLabels[userInfo.monthlyOrders] || userInfo.monthlyOrders}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Gift size={24} className="text-orange-400" />
              What&apos;s Ready for You
            </h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-slate-300">
                  {userInfo?.platform === 'ebay' ? 'eBay selling' : userInfo?.platform === 'amazon' ? 'Amazon selling' : 'Selling'} guides and tips tailored to your platform
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-slate-300">Product recommendations based on your order volume</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-slate-300">Custom insights to help scale your business</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-slate-300">Early access to new platform features and tools</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              Go to Homepage <ArrowRight size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 border border-white/10 bg-white/5 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Launch Panel
            </Link>
          </div>

          {/* Footer */}
          <p className="text-slate-500 text-sm mt-8">
            Have any questions?{' '}
            <Link href="/contact" className="text-orange-400 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
