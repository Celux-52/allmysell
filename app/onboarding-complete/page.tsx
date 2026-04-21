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
    other: 'Diğer Platform',
  };

  const orderLabels: Record<string, string> = {
    low: '0-10 sipariş/ay',
    medium: '11-50 sipariş/ay',
    high: '51-200 sipariş/ay',
    'very-high': '200+ sipariş/ay',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#E8750A] to-[#E8750A] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-stone-50 rounded-2xl shadow-2xl p-8 md:p-12 animate-scaleIn text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounceIn">
            <CheckCircle className="text-green-600" size={48} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 animate-slideInUp">
            Hoş Geldiniz, {userInfo?.fullName}! 🎉
          </h1>
          <p className="text-stone-500 text-lg mb-8 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Profiliniz başarıyla tamamlandı. Şimdi sana uygun hizmetleri sunmaya hazırsınız.
          </p>

          {/* Profile Summary */}
          {userInfo && (
            <div className="bg-gradient-to-br from-olive to-peru p-6 rounded-xl mb-8 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-stone-500 text-sm mb-1">Email</p>
                  <p className="text-stone-900 font-semibold">{userInfo.email}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Platform</p>
                  <p className="text-stone-900 font-semibold">{platformNames[userInfo.platform] || userInfo.platform}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Aylık Hacim</p>
                  <p className="text-stone-900 font-semibold">{orderLabels[userInfo.monthlyOrders] || userInfo.monthlyOrders}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-peru border-2 border-peru p-6 rounded-xl mb-8 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center justify-center gap-2">
              <Gift size={24} className="text-stone-800" />
              Sana Hazır İçerik
            </h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-start gap-3">
                <span className="text-stone-800 font-bold">✓</span>
                <span className="text-stone-600">
                  {userInfo?.platform === 'ebay' ? 'eBay satış' : userInfo?.platform === 'amazon' ? 'Amazon satış' : 'Satış'} için özel rehberler ve tips
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-800 font-bold">✓</span>
                <span className="text-stone-600">Sipariş hacmine göre uyarlanmış ürün önerileri</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-800 font-bold">✓</span>
                <span className="text-stone-600">İşletmenizi büyütmek için özel sunumlar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-800 font-bold">✓</span>
                <span className="text-stone-600">Özel ürün lansmanlarına erken erişim</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/"
              className="flex-1 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Anasayfaya Dön <ArrowRight size={20} />
            </Link>
            <Link
              href="/shop/ebay"
              className="flex-1 border-2 border-[#E8750A] text-stone-800 py-3 px-6 rounded-lg font-semibold hover:bg-olive transition-all"
            >
              Ürünleri Gez
            </Link>
          </div>

          {/* Footer */}
          <p className="text-stone-400 text-sm mt-8">
            Herhangi bir sorunuz olursa,{' '}
            <Link href="/contact" className="text-stone-800 hover:underline">
              iletişim
            </Link>
            {' '}sayfamızı ziyaret edin.
          </p>
        </div>
      </div>
    </div>
  );
}
