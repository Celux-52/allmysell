'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight, LogIn, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        
        // Add a small delay for the success animation
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error occurred. Please check your internet connection and try again.');
      console.error('Login error:', err);
    } finally {
      if (!success) setLoading(false);
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E8750A]/15 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#F59E0B]/15 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-[#E8750A] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E8750A]/20 mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-extrabold text-white">AMS</span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-cornsilk tracking-tight">
            Sign In to Your Account
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Welcome to the world of technology and accessories
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 bg-[#151515]/80 backdrop-blur-xl py-10 px-8 shadow-2xl rounded-3xl border border-[#E8750A]/10">
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

          <div className="mb-6 bg-[#E8750A]/10 border border-[#E8750A]/20 rounded-xl p-4 text-sm text-[#E8750A] flex items-center justify-between">
            <div>
              <span className="block font-semibold mb-1">Demo Login</span>
              <span className="opacity-80 block">test@gmail.com / test123</span>
            </div>
            <button 
              onClick={() => { setEmail('test@gmail.com'); setPassword('test123'); }}
              type="button" 
              className="text-xs bg-[#E8750A]/20 hover:bg-[#E8750A]/40 text-[#E8750A] px-3 py-1.5 rounded-lg transition-colors"
            >
              Fill
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-xl bg-[#0A0A0A] text-cornsilk placeholder-gray-600 focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] transition-all sm:text-sm"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link href="#" className="text-xs font-medium text-[#E8750A] hover:text-[#F59E0B] transition-colors">
                  Forgot Password
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#E8750A] transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-xl bg-[#0A0A0A] text-cornsilk placeholder-gray-600 focus:ring-2 focus:ring-[#E8750A]/50 focus:border-[#E8750A] transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || success}
                className={`relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${
                  loading || success 
                    ? 'bg-[#E8750A]/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#E8750A] to-[#F59E0B] hover:shadow-lg hover:shadow-[#E8750A]/25 transform hover:-translate-y-0.5'
                } transition-all duration-200 overflow-hidden group`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#151515] text-gray-500 text-xs">or</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-semibold text-cornsilk hover:text-[#E8750A] transition-colors border-b border-[#E8750A]/0 hover:border-[#E8750A]/50 pb-0.5">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
