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
    alert('Verification email resent!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#E8750A] to-[#E8750A] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 animate-scaleIn">
          {!verified ? (
            <>
              {/* Checking */}
              <div className="text-center animate-slideInUp">
                <div className="w-16 h-16 bg-olive rounded-full flex items-center justify-center mx-auto mb-4 animate-bounceIn">
                  <Mail className="text-[#E8750A]" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-cornsilk mb-2">Email Verification</h2>
                <p className="text-gray-400 mb-6">
                  Verifying your email address...
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slideInUp">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="bg-olive p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-400">
                    You will be redirected here after clicking the verification link sent to <strong>{email}</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    className="w-full py-3 border-2 border-[#E8750A] text-[#E8750A] rounded-lg font-semibold hover:bg-olive transition-all"
                  >
                    Resend Email
                  </button>
                  <Link
                    href="/register"
                    className="block py-3 text-gray-400 hover:text-cornsilk text-sm"
                  >
                    Change Email Address
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 animate-slideInUp">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cornsilk mb-2">Email Verified!</h3>
              <p className="text-gray-400 mb-4">
                Redirecting to complete your profile...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
