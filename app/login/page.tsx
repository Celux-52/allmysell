'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { Mail, Lock, AlertCircle, LogIn, CheckCircle2, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E8750A]/30 border-t-[#E8750A] rounded-full animate-spin"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for error from callback
    const callbackError = searchParams.get('error');
    if (callbackError) {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' 
          ? 'Invalid email or password. Please try again.' 
          : authError.message);
        return;
      }

      if (data.user) {
        setSuccess(true);
        const redirect = searchParams.get('redirect') || '/dashboard';
        setTimeout(() => {
          router.push(redirect);
          router.refresh();
        }, 800);
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.');
      console.error('Login error:', err);
    } finally {
      if (!success) setLoading(false);
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E8750A]/15 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#F59E0B]/15 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-[#E8750A] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-2xl shadow-stone-200/50 mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-extrabold text-stone-900">AMS</span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-stone-900 tracking-tight">
            Sign In to Your Account
          </h2>
          <p className="mt-3 text-sm text-stone-500">
            Welcome to the world of technology and accessories
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 bg-[#151515]/80 backdrop-blur-xl py-10 px-8 shadow-2xl rounded-3xl border border-stone-200/60">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200 leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500/50 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-200">Login successful! Redirecting...</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading || loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-white/10 rounded-xl bg-[#FAFAF9] text-stone-600 hover:bg-stone-50 hover:border-[#E8750A]/30 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {socialLoading === 'google' ? (
                <svg className="animate-spin h-5 w-5 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <span>{socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}</span>
            </button>

          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#151515] text-stone-400 text-xs">or sign in with email</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-xl bg-[#FAFAF9] text-stone-900 placeholder-gray-600 focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] transition-all sm:text-sm"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-stone-600">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-stone-800 hover:text-stone-500 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-xl bg-[#FAFAF9] text-stone-900 placeholder-gray-600 focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || success}
                className={`relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-stone-900 ${
                  loading || success
                    ? 'bg-[#E8750A]/50 cursor-not-allowed'
                    : 'bg-stone-900 !text-white hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-200/50 transform hover:-translate-y-0.5'
                } transition-all duration-200 overflow-hidden group`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : success ? (
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Success</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-stone-500">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-semibold text-stone-900 hover:text-stone-800 transition-colors border-b border-[#E8750A]/0 hover:border-[#E8750A]/50 pb-0.5">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
