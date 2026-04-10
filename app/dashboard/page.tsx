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
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] flex items-center justify-center">
        <div className="text-cornsilk">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cornsilk mb-4">Not Logged In</h1>
          <p className="text-gray-400 mb-6">Please log in first</p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E8750A] to-[#F59E0B] bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Welcome, {user.fullName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 border border-[#E8750A]/20 mb-8">
          <h2 className="text-2xl font-bold text-cornsilk mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-4">
              <div className="bg-[#E8750A]/20 p-3 rounded-lg">
                <User className="text-[#E8750A]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-cornsilk font-semibold">{user.fullName || 'Not Specified'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-[#E8750A]/20 p-3 rounded-lg">
                <Mail className="text-[#E8750A]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-cornsilk font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Platform */}
            <div className="flex items-start gap-4">
              <div className="bg-[#E8750A]/20 p-3 rounded-lg">
                <Store className="text-[#E8750A]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Platform</p>
                <p className="text-cornsilk font-semibold">{user.platform || 'Not Specified'}</p>
              </div>
            </div>

            {/* Monthly Orders */}
            <div className="flex items-start gap-4">
              <div className="bg-[#E8750A]/20 p-3 rounded-lg">
                <TrendingUp className="text-[#E8750A]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Order Volume</p>
                <p className="text-cornsilk font-semibold">{user.monthlyOrders || 'Not Specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/shop"
            className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-6 border border-[#E8750A]/20 hover:border-[#E8750A]/50 transition-all group"
          >
            <Store className="text-[#E8750A] mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-cornsilk mb-2">Stores</h3>
            <p className="text-gray-400">Access Amazon, eBay, Etsy and more</p>
          </Link>

          <Link
            href="/contact"
            className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-6 border border-[#E8750A]/20 hover:border-[#E8750A]/50 transition-all group"
          >
            <Mail className="text-[#E8750A] mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-cornsilk mb-2">Contact</h3>
            <p className="text-gray-400">Get in touch, we're here for your questions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
