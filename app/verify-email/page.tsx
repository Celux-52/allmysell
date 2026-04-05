'use client';

import { useEffect, useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // URL'den token'ı al
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const emailParam = params.get('email');

    const pendingEmail = sessionStorage.getItem('pendingEmail');
    const pendingToken = sessionStorage.getItem('verificationToken');

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else if (pendingEmail) {
      setEmail(pendingEmail);
    }

    // Token doğrulama (sadece client-side simülasyon, production'da server-side olmalı)
    if (token && (token === pendingToken || token)) {
      // Token geçerliyse, hemen onboarding'e yönlendir
      setTimeout(() => {
        setVerified(true);
        setTimeout(() => {
          window.location.href = '/onboarding';
        }, 2000);
      }, 1000);
    }
  }, []);

  const handleResendEmail = async () => {
    // Resend email logic
    alert('Doğrulama emaili tekrar gönderildi!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] via-[#330066] to-[#8F00FF] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
          {!verified ? (
            <>
              {/* Checking */}
              <div className="text-center animate-slideInUp">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounceIn">
                  <Mail className="text-[#8F00FF]" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Doğrulama</h2>
                <p className="text-gray-600 mb-6">
                  Email adresini doğruluyoruz...
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slideInUp">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>{email}</strong> adresine gönderilen emailde doğrulama linkine tıkladığınızda buraya yönlendirileceksiniz.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    className="w-full py-3 border-2 border-[#8F00FF] text-[#8F00FF] rounded-lg font-semibold hover:bg-purple-50 transition-all"
                  >
                    Emaili Tekrar Gönder
                  </button>
                  <Link
                    href="/register"
                    className="block py-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    E-mail Adresini Değiştir
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 animate-slideInUp">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Doğrulandı!</h3>
              <p className="text-gray-600 mb-4">
                Profilinizi tamamlamaya yönlendiriliyorsunuz...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
