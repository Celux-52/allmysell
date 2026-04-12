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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A0A00] to-[#0A0A0A] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-slideInUp">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#E8750A]/20">
            <span className="text-white font-bold text-3xl">A</span>
          </div>
          <h1 className="text-4xl font-bold text-cornsilk mb-2">AllMySell</h1>
          <p className="text-[#F59E0B]">Start with a Progressive Profile</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 animate-scaleIn border border-[#E8750A]/10">
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-cornsilk mb-2">Sign Up</h2>
              <p className="text-gray-400 mb-6">
                Start with just your email. You can add more info later.
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-slideInUp">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-[#E8750A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8750A] focus:border-transparent bg-[#0A0A0A] text-cornsilk placeholder-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Get Started'}
                  <ArrowRight size={20} />
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-[#E8750A] hover:underline font-semibold">
                  Log in
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center py-8 animate-slideInUp">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cornsilk mb-2">Success!</h3>
              <p className="text-gray-400 mb-4">
                Verification email sent to {email}. Please check your inbox.
              </p>
              <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8750A] text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
            <p className="text-cornsilk text-sm font-medium">Email</p>
          </div>
          <div className="border-t-2 border-white/20 w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A]/10 text-gray-400 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
            <p className="text-gray-500 text-sm">Platform</p>
          </div>
          <div className="border-t-2 border-white/20 w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A]/10 text-gray-400 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
            <p className="text-gray-500 text-sm">Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
}
