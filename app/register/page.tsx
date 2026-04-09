'use client';

import { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred');
        return;
      }

      setSuccess(true);
      
      // Save email and token to sessionStorage
      sessionStorage.setItem('pendingEmail', email);
      sessionStorage.setItem('verificationToken', data.verificationToken);

      setTimeout(() => {
        window.location.href = '/verify-email';
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#808000] to-[#808000] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-slideInUp">
          <div className="w-16 h-16 bg-gradient-to-br from-[#808000] to-[#CD853F] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <span className="text-cornsilk font-bold text-3xl">A</span>
          </div>
          <h1 className="text-4xl font-bold text-cornsilk mb-2">AllMySell</h1>
          <p className="text-peru">Start with a Progressive Profile</p>
        </div>

        {/* Form Card */}
        <div className="bg-cornsilk rounded-2xl shadow-2xl p-8 animate-scaleIn">
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-black mb-2">Sign Up</h2>
              <p className="text-gray-600 mb-6">
                Start with just your email. You can add more info later.
              </p>

              {/* Test Mode Info */}
              <div className="mb-6 p-4 bg-peru border border-peru rounded-lg">
                <p className="text-peru text-sm font-medium">
                  <strong>⚠️ Test Mode:</strong> Our email service only works with the following email addresses:
                </p>
                <p className="text-peru text-sm mt-2">
                  test@gmail.com, demo@gmail.com, mehmetali@test.com
                </p>
                <p className="text-peru text-xs mt-2">
                  Please use one of the emails above to complete registration.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slideInUp">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#808000] focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#808000] to-[#CD853F] text-cornsilk py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Get Started'}
                  <ArrowRight size={20} />
                </button>
              </form>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-[#808000] hover:underline font-semibold">
                  Log in
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center py-8 animate-slideInUp">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">
                Verification email sent to {email}. Please check your inbox.
              </p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#808000] text-cornsilk rounded-full flex items-center justify-center font-semibold text-sm">1</div>
            <p className="text-cornsilk text-sm font-medium">Email</p>
          </div>
          <div className="border-t-2 border-white/30 w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cornsilk/30 text-cornsilk rounded-full flex items-center justify-center font-semibold text-sm">2</div>
            <p className="text-cornsilk/60 text-sm">Platform</p>
          </div>
          <div className="border-t-2 border-white/30 w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cornsilk/30 text-cornsilk rounded-full flex items-center justify-center font-semibold text-sm">3</div>
            <p className="text-cornsilk/60 text-sm">Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
}
