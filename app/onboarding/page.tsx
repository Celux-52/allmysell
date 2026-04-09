'use client';

import { useState, useEffect } from 'react';
import { Mail, Store, TrendingUp, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [platform, setPlatform] = useState('');
  const [monthlyOrders, setMonthlyOrders] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // URL parametrelerinden email'i al, yoksa sessionStorage'dan
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
      sessionStorage.setItem('pendingEmail', decodeURIComponent(emailParam));
    } else {
      const pendingEmail = sessionStorage.getItem('pendingEmail');
      if (pendingEmail) {
        setEmail(pendingEmail);
      }
    }
  }, []);

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    if (step === 2 && !platform) {
      setError('Please select a platform');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monthlyOrders) {
      setError('Please select your monthly order volume');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          password,
          platform,
          monthlyOrders,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred');
        return;
      }

      setSuccess(true);
      
      // sessionStorage'ı temizle ve user data'sını kaydet
      sessionStorage.removeItem('pendingEmail');
      sessionStorage.removeItem('verificationToken');
      sessionStorage.setItem('user', JSON.stringify({
        email,
        fullName,
        platform,
        monthlyOrders,
      }));
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify({
        email,
        fullName,
        platform,
        monthlyOrders,
      }));

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    { id: 'ebay', name: 'eBay', icon: '🛍️' },
    { id: 'amazon', name: 'Amazon', icon: '📦' },
    { id: 'shopify', name: 'Shopify', icon: '🏪' },
    { id: 'etsy', name: 'Etsy', icon: '✨' },
    { id: 'tiktok', name: 'TikTok Shop', icon: '🎥' },
    { id: 'other', name: 'Other', icon: '📱' },
  ];

  const orderVolumes = [
    { id: 'low', label: '0-10 orders/month' },
    { id: 'medium', label: '11-50 orders/month' },
    { id: 'high', label: '51-200 orders/month' },
    { id: 'very-high', label: '200+ orders/month' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#808000] to-[#808000] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/register" className="text-cornsilk/60 hover:text-cornsilk flex items-center gap-2 text-sm">
            ← Go Back
          </Link>
        </div>

        {/* Card */}
        <div className="bg-cornsilk rounded-2xl shadow-2xl p-8 animate-scaleIn">
          {!success ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">
                  {step === 1 ? 'Hello!' : step === 2 ? 'Where do you sell?' : 'Monthly Volume?'}
                </h2>
                <p className="text-gray-600">
                  {step === 1 && 'Can we get your name?'}
                  {step === 2 && 'To help you better, which platform are you selling on?'}
                  {step === 3 && 'How many orders do you process monthly on average?'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slideInUp">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Full Name */}
                {step === 1 && (
                  <div className="animate-slideInUp space-y-4">
                    {email && (
                      <div className="p-3 bg-peru border border-peru rounded-lg">
                        <p className="text-sm text-gray-600">Your Email</p>
                        <p className="text-base font-semibold text-black">{email}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#808000] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#808000] focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>
                  </div>
                )}

                {/* Step 2: Platform Selection */}
                {step === 2 && (
                  <div className="animate-slideInUp">
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlatform(p.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            platform === p.id
                              ? 'border-[#808000] bg-olive'
                              : 'border-gray-200 hover:border-[#808000]/50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{p.icon}</div>
                          <div className="font-semibold text-black">{p.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Monthly Orders */}
                {step === 3 && (
                  <div className="animate-slideInUp space-y-3">
                    {orderVolumes.map((volume) => (
                      <button
                        key={volume.id}
                        type="button"
                        onClick={() => setMonthlyOrders(volume.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          monthlyOrders === volume.id
                            ? 'border-[#808000] bg-olive'
                            : 'border-gray-200 hover:border-[#808000]/50'
                        }`}
                      >
                        <div className="font-semibold text-black">{volume.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-gradient-to-r from-[#808000] to-[#CD853F] text-cornsilk py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Next <ArrowRight size={20} />
                    </button>
                  )}
                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-[#808000] to-[#CD853F] text-cornsilk py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Saving...' : 'Complete'} <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 animate-slideInUp">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Success!</h3>
              <p className="text-gray-600 mb-2">Profile saved, {fullName}!</p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          )}

          {/* Step Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            <div className={`flex items-center gap-2 ${step >= 1 ? '' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 1 ? 'bg-[#808000] text-cornsilk' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <p className={`text-sm font-medium ${step >= 1 ? 'text-black' : 'text-gray-500'}`}>Name</p>
            </div>
            <div className={`border-t-2 w-12 mt-4 ${step >= 2 ? 'border-[#808000]' : 'border-gray-300'}`}></div>
            <div>
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 2 ? 'bg-[#808000] text-cornsilk' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <p className={`text-sm font-medium ${step >= 2 ? 'text-black' : 'text-gray-500'}`}>Platform</p>
              </div>
            </div>
            <div className={`border-t-2 w-12 mt-4 ${step >= 3 ? 'border-[#808000]' : 'border-gray-300'}`}></div>
            <div>
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 3 ? 'bg-[#808000] text-cornsilk' : 'bg-gray-200 text-gray-600'}`}>3</div>
                <p className={`text-sm font-medium ${step >= 3 ? 'text-black' : 'text-gray-500'}`}>Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
