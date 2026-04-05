'use client';

import { useState, useEffect } from 'react';
import { Mail, Store, TrendingUp, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [platform, setPlatform] = useState('');
  const [monthlyOrders, setMonthlyOrders] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // sessionStorage'dan email'i al
    const pendingEmail = sessionStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  const handleNextStep = () => {
    if (step === 1 && !fullName.trim()) {
      setError('Lütfen adınızı girin');
      return;
    }
    if (step === 2 && !platform) {
      setError('Lütfen bir platform seçin');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monthlyOrders) {
      setError('Lütfen aylık sipariş hacmini seçin');
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
          platform,
          monthlyOrders,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Bir hata oluştu');
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

      setTimeout(() => {
        window.location.href = '/onboarding-complete';
      }, 2000);
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
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
    { id: 'other', name: 'Diğer', icon: '📱' },
  ];

  const orderVolumes = [
    { id: 'low', label: '0-10 sipariş/ay' },
    { id: 'medium', label: '11-50 sipariş/ay' },
    { id: 'high', label: '51-200 sipariş/ay' },
    { id: 'very-high', label: '200+  sipariş/ay' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] via-[#330066] to-[#8F00FF] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/register" className="text-white/60 hover:text-white flex items-center gap-2 text-sm">
            ← Geri Dön
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
          {!success ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {step === 1 ? 'Merhaba!' : step === 2 ? 'Nerede Satış Yapıyorsunuz?' : 'Aylık Hacminiz?'}
                </h2>
                <p className="text-gray-600">
                  {step === 1 && 'Adınızı öğrenebilir miyiz?'}
                  {step === 2 && 'Sana daha iyi yardım edebilmek için hangi platformda satış yapıyorsunuz?'}
                  {step === 3 && 'Aylık ortalama siparişiniz kaç tane?'}
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
                  <div className="animate-slideInUp">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adınız
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F00FF] focus:border-transparent"
                    />
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
                              ? 'border-[#8F00FF] bg-purple-50'
                              : 'border-gray-200 hover:border-[#8F00FF]/50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{p.icon}</div>
                          <div className="font-semibold text-gray-900">{p.name}</div>
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
                            ? 'border-[#8F00FF] bg-purple-50'
                            : 'border-gray-200 hover:border-[#8F00FF]/50'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{volume.label}</div>
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
                      Geri
                    </button>
                  )}
                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-gradient-to-r from-[#8F00FF] to-[#0000FF] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Sonraki <ArrowRight size={20} />
                    </button>
                  )}
                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-[#8F00FF] to-[#0000FF] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Kaydediliyor...' : 'Tamamla'} <ArrowRight size={20} />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Başarılı!</h3>
              <p className="text-gray-600 mb-2">Profil bilgileriniz kaydedildi, {fullName}!</p>
              <p className="text-sm text-gray-500">Yeniden yönlendiriliyorsunuz...</p>
            </div>
          )}

          {/* Step Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            <div className={`flex items-center gap-2 ${step >= 1 ? '' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 1 ? 'bg-[#8F00FF] text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <p className={`text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>Ad</p>
            </div>
            <div className={`border-t-2 w-12 mt-4 ${step >= 2 ? 'border-[#8F00FF]' : 'border-gray-300'}`}></div>
            <div>
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 2 ? 'bg-[#8F00FF] text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <p className={`text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>Platform</p>
              </div>
            </div>
            <div className={`border-t-2 w-12 mt-4 ${step >= 3 ? 'border-[#8F00FF]' : 'border-gray-300'}`}></div>
            <div>
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 3 ? 'bg-[#8F00FF] text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
                <p className={`text-sm font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>Hacim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
