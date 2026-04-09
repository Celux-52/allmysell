'use client';

import { useState, useEffect } from 'react';
import { LogOut, User, Mail, Store, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from sessionStorage or localStorage
    const userStr = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    // Clear auth data
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    
    // Call logout API to clear cookie
    fetch('/api/auth/logout', {
      method: 'POST',
    }).catch(console.error);

    // Redirect to home
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#2d1b4e] to-[#000000] flex items-center justify-center">
        <div className="text-cornsilk">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#2d1b4e] to-[#000000] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cornsilk mb-4">Oturum Açılmamış</h1>
          <p className="text-gray-400 mb-6">Lütfen önce giriş yapın</p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-[#808000] to-[#CD853F] text-cornsilk px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#2d1b4e] to-[#000000] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#808000] to-[#CD853F] bg-clip-text text-transparent mb-2">
              Pano
            </h1>
            <p className="text-gray-400">Hoş geldiniz, {user.fullName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-[#252525] rounded-2xl shadow-2xl p-8 border border-[#808000]/20 mb-8">
          <h2 className="text-2xl font-bold text-cornsilk mb-6">Profil Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-4">
              <div className="bg-[#808000]/20 p-3 rounded-lg">
                <User className="text-[#808000]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Ad Soyad</p>
                <p className="text-cornsilk font-semibold">{user.fullName || 'Belirtilmemiş'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-[#808000]/20 p-3 rounded-lg">
                <Mail className="text-[#808000]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email Adresi</p>
                <p className="text-cornsilk font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Platform */}
            <div className="flex items-start gap-4">
              <div className="bg-[#808000]/20 p-3 rounded-lg">
                <Store className="text-[#808000]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Platform</p>
                <p className="text-cornsilk font-semibold">{user.platform || 'Belirtilmemiş'}</p>
              </div>
            </div>

            {/* Monthly Orders */}
            <div className="flex items-start gap-4">
              <div className="bg-[#808000]/20 p-3 rounded-lg">
                <TrendingUp className="text-[#808000]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Aylık Sipariş Hacmi</p>
                <p className="text-cornsilk font-semibold">{user.monthlyOrders || 'Belirtilmemiş'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/shop"
            className="bg-[#252525] rounded-2xl shadow-2xl p-6 border border-[#808000]/20 hover:border-[#808000]/50 transition-all group"
          >
            <Store className="text-[#808000] mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-cornsilk mb-2">Mağazalar</h3>
            <p className="text-gray-400">Amazon, eBay, Etsy ve daha fazlasına erişin</p>
          </Link>

          <Link
            href="/contact"
            className="bg-[#252525] rounded-2xl shadow-2xl p-6 border border-[#808000]/20 hover:border-[#808000]/50 transition-all group"
          >
            <Mail className="text-[#808000] mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-cornsilk mb-2">İletişim</h3>
            <p className="text-gray-400">Bize ulaşın, sorularınız için buradayız</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
