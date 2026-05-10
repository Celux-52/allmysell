'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { Mail, Lock, AlertCircle, LogIn, CheckCircle2, Sparkles, ArrowRight, Github, ShieldCheck, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
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
      setError('Authentication failed. Strategic access denied.');
    }
  }, [searchParams]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Missing identity vectors. Input required.');
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
          ? 'Invalid clearance level. Verify credentials.' 
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
        }, 1200);
      }
    } catch (err) {
      setError('Signal loss detected. Check node connectivity.');
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
      setError('OAuth bypass failed. Direct login recommended.');
      setSocialLoading(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050810] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* --- CINEMATIC AMBIANCE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent opacity-50"
        />

        {/* HUD Elements */}
        <div className="absolute top-10 left-10 flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <Activity className="w-4 h-4 text-orange-500/40" />
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">System: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-4 h-4 text-blue-500/40" />
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Clearance: OMEGA</span>
          </div>
        </div>

        <div className="absolute bottom-10 right-10">
           <div className="flex flex-col items-end gap-1">
              <span className="text-[8px] font-black text-white/10 tracking-widest uppercase">Encryption Algorithm</span>
              <span className="text-[10px] font-mono text-orange-500/20">AES-256-GCM-PROTOCOL-V2</span>
           </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Intelligence Core Logo */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15px] border border-orange-500/20 rounded-full border-dashed"
            />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-24 w-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-500/40 mb-6 border border-white/20 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000"></div>
              <Zap className="w-12 h-12 text-white fill-white/20 relative z-10" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              ALL<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">MYSELL</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-8 bg-white/10" />
              <p className="text-[10px] text-slate-500 font-black tracking-[0.4em] uppercase">
                E-COMMERCE INTELLIGENCE
              </p>
              <div className="h-px w-8 bg-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Authentication Matrix */}
        <div className="mt-8 relative group">
          {/* Glowing Border Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-700"></div>
          
          <div className="relative bg-[#0d111c]/60 backdrop-blur-3xl py-12 px-10 shadow-2xl rounded-[2.5rem] border border-white/10 overflow-hidden">
            
            {/* Terminal Status Text */}
            <div className="absolute top-4 right-8 flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
               <span className="text-[8px] font-black text-orange-500/70 uppercase tracking-widest">Awaiting Auth</span>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="mb-8 bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-red-200 font-bold leading-relaxed uppercase tracking-tight">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 bg-green-500/10 border border-green-500/30 p-4 rounded-2xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-[11px] text-green-200 font-bold tracking-widest uppercase">ACCESS GRANTED. INITIALIZING AGENT...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-7" onSubmit={handleLogin}>
              <div className="space-y-3">
                <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity Vector</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                    placeholder="OPERATIVE@ETSY.AI"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" title="Password" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Access Protocol</label>
                  <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-black text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">Lost Key?</Link>
                </div>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading || success}
                className="w-full relative py-5 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-3 overflow-hidden group/btn disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : success ? (
                  <>SYSTEM DEPLOYED <CheckCircle2 className="w-5 h-5" /></>
                ) : (
                  <>INITIATE NEURAL LINK <LogIn className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
            </form>

            {/* Social Override */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px]"><span className="px-6 bg-[#131926] text-slate-600 font-black uppercase tracking-[0.4em]">External Gateways</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={!!socialLoading || loading}
                className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
              >
                {socialLoading === 'google' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                    <path fill="currentColor" className="opacity-60" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                    <path fill="currentColor" className="opacity-40" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.65h-3.98a11.86 11.86 0 000 10.7l3.98-3.06z"/>
                    <path fill="currentColor" className="opacity-80" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.7 2.69-10.68 6.65l3.98 3.06c.95-2.85 3.6-4.96 6.73-4.96z"/>
                  </svg>
                )}
                Node.Google
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={!!socialLoading || loading}
                className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
              >
                {socialLoading === 'github' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Github className="w-4 h-4" />}
                Node.GitHub
              </button>
            </div>

            <div className="mt-10 text-center">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                Unregistered Operative?{' '}
                <Link href="/register" className="text-orange-500 hover:text-orange-400 transition-colors ml-1 border-b border-orange-500/20 pb-0.5">
                  Request Access <ArrowRight className="inline w-3 h-3 mb-0.5" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
