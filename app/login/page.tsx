'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { Mail, Lock, AlertCircle, LogIn, CheckCircle2, Sparkles, ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
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
        setLoading(false);
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
      setLoading(false);
      console.error('Login error:', err);
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
    <div className="min-h-screen bg-[#050810] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mx-auto h-20 w-20 bg-gradient-to-tr from-orange-500 via-orange-600 to-orange-700 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(234,88,12,0.3)] mb-6 border border-white/20"
          >
            <Sparkles className="w-10 h-10 text-white fill-white/20" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              ETSY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">SNIPER</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-bold tracking-widest uppercase">
              Operational Intelligence Login
            </p>
          </motion.div>
        </div>

        {/* Form Container */}
        <div className="mt-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0d111c]/80 backdrop-blur-2xl py-10 px-8 shadow-2xl rounded-[2.5rem] border border-white/10">
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-200 font-medium leading-relaxed">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 bg-green-500/10 border border-green-500/30 p-4 rounded-2xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-xs text-green-200 font-medium tracking-tight">Access Granted. Synchronizing...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={!!socialLoading || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {socialLoading === 'google' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                    <path fill="currentColor" className="opacity-60" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                    <path fill="currentColor" className="opacity-40" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.65h-3.98a11.86 11.86 0 000 10.7l3.98-3.06z"/>
                    <path fill="currentColor" className="opacity-80" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.7 2.69-10.68 6.65l3.98 3.06c.95-2.85 3.6-4.96 6.73-4.96z"/>
                  </svg>
                )}
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={!!socialLoading || loading}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {socialLoading === 'github' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Github className="w-4 h-4" />}
                GitHub
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px]"><span className="px-4 bg-[#0d111c] text-slate-600 font-black uppercase tracking-[0.2em]">Manual Override</span></div>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Vector</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    placeholder="Vector@intelligence.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" title="Password" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Protocol</label>
                  <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">Recovery?</Link>
                </div>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || success}
                className="w-full relative py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-black text-white uppercase tracking-wider text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 overflow-hidden group/btn disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : success ? (
                  <>AUTHENTICATED <CheckCircle2 className="w-4 h-4" /></>
                ) : (
                  <>INITIATE SESSION <LogIn className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                New Operative?{' '}
                <Link href="/register" className="text-orange-500 hover:text-orange-400 transition-colors ml-1">
                  Create Account <ArrowRight className="inline w-3 h-3 mb-0.5" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
