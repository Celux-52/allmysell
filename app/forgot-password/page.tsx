'use client';

import { useState, FormEvent } from 'react';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E8750A]/15 blur-[120px] animate-pulse"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-[#E8750A] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E8750A]/20 mb-6">
            <span className="text-2xl font-extrabold text-white">A</span>
          </div>
          <h2 className="text-3xl font-extrabold text-cornsilk">Reset Password</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="bg-[#151515]/80 backdrop-blur-xl py-8 px-8 shadow-2xl rounded-3xl border border-[#E8750A]/10">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cornsilk mb-2">Check Your Email</h3>
              <p className="text-gray-400 mb-6">
                We&apos;ve sent a password reset link to <span className="text-cornsilk font-medium">{email}</span>
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#E8750A] hover:underline font-semibold"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-xl bg-[#0A0A0A] text-cornsilk placeholder-gray-600 focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] transition-all sm:text-sm"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#E8750A]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#E8750A] transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
