'use client';

import { useState, FormEvent } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setError('Please enter your email address.');
        return;
      }
      setStep(2);
      return;
    }

    // Step 2: Password
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('This email is already registered. Please sign in instead.');
        } else {
          setError(authError.message);
        }
        return;
      }

      if (data.user) {
        setSuccess(true);
        // If email confirmation is enabled, show message
        // If auto-confirm is on, redirect to dashboard
        if (data.session) {
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 1500);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    setError('');

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setError(authError.message);
        setSocialLoading(null);
      }
    } catch (err) {
      setError('Social login failed. Please try again.');
      setSocialLoading(null);
      console.error('Social login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A0A00] to-[#0A0A0A] flex items-center justify-center py-12 px-4">
      {/* Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#E8750A]/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F59E0B]/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-slideInUp">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#E8750A]/20">
            <span className="text-white font-bold text-3xl">A</span>
          </div>
          <h1 className="text-4xl font-bold text-cornsilk mb-2">AllMySell</h1>
          <p className="text-[#F59E0B]">Create Your Account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#151515]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 animate-scaleIn border border-[#E8750A]/10">
          {!success ? (
            <>
              {/* Social Login Buttons */}
              {step === 1 && (
                <>
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleSocialLogin('google')}
                      disabled={!!socialLoading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-white/10 rounded-xl bg-[#0A0A0A] text-gray-300 hover:bg-[#1A1A1A] hover:border-[#E8750A]/30 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {socialLoading === 'google' ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                          <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                          <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.65h-3.98a11.86 11.86 0 000 10.7l3.98-3.06z"/>
                          <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.7 2.69-10.68 6.65l3.98 3.06c.95-2.85 3.6-4.96 6.73-4.96z"/>
                        </svg>
                      )}
                      <span>{socialLoading === 'google' ? 'Connecting...' : 'Sign up with Google'}</span>
                    </button>

                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#151515] text-gray-500 text-xs">or sign up with email</span>
                    </div>
                  </div>
                </>
              )}

              <h2 className="text-2xl font-bold text-cornsilk mb-2">
                {step === 1 ? 'Get Started' : 'Create Password'}
              </h2>
              <p className="text-gray-400 mb-6">
                {step === 1 ? 'Enter your name and email to begin.' : 'Choose a secure password for your account.'}
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-slideInUp">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" size={20} />
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] bg-[#0A0A0A] text-cornsilk placeholder-gray-600 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" size={20} />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] bg-[#0A0A0A] text-cornsilk placeholder-gray-600 transition-all"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" size={20} />
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          required
                          minLength={6}
                          className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] bg-[#0A0A0A] text-cornsilk placeholder-gray-600 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" size={20} />
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          required
                          minLength={6}
                          className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] bg-[#0A0A0A] text-cornsilk placeholder-gray-600 transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(''); }}
                      className="flex-1 py-3 px-4 border border-white/10 rounded-xl text-gray-300 hover:bg-[#1A1A1A] transition-all font-medium"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : step === 1 ? (
                      <>Continue <ArrowRight size={20} /></>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
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
              <h3 className="text-xl font-bold text-cornsilk mb-2">Account Created!</h3>
              <p className="text-gray-400 mb-4">
                Please check your email <span className="text-cornsilk font-medium">{email}</span> to verify your account.
              </p>
              <p className="text-sm text-gray-500">You&apos;ll be redirected automatically after verification.</p>
              <Link
                href="/login"
                className="inline-block mt-6 text-[#E8750A] hover:underline font-semibold"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        {!success && (
          <div className="mt-8 flex justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${step >= 1 ? 'bg-[#E8750A]' : 'bg-[#1A1A1A]'} text-white rounded-full flex items-center justify-center font-semibold text-sm transition-colors`}>1</div>
              <p className={`text-sm font-medium ${step >= 1 ? 'text-cornsilk' : 'text-gray-500'}`}>Info</p>
            </div>
            <div className="border-t-2 border-white/20 w-12 mt-4"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${step >= 2 ? 'bg-[#E8750A]' : 'bg-[#1A1A1A]'} ${step >= 2 ? 'text-white' : 'text-gray-400'} rounded-full flex items-center justify-center font-semibold text-sm transition-colors`}>2</div>
              <p className={`text-sm ${step >= 2 ? 'text-cornsilk font-medium' : 'text-gray-500'}`}>Password</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
