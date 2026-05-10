'use client';

import { useState, FormEvent } from 'react';
import { Mail, AlertCircle, CheckCircle, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* LOGO AREA */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="mx-auto w-20 h-20 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-500/20 mb-6 relative group"
          >
            <div className="absolute inset-0 bg-white/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sparkles className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic">RESET CIPHER</h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Request Access Restoration</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full"></div>
          
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Transmission Sent</h3>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                  We&apos;ve sent a reset link to <span className="text-orange-400 font-bold">{email}</span>. Check your encrypted inbox.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition-all border border-white/10"
                >
                  <ArrowLeft size={18} /> BACK TO TERMINAL
                </Link>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-8 relative z-10"
              >
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-200 uppercase tracking-tight">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Registered Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                      placeholder="Enter identity email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      RESTORING...
                    </>
                  ) : (
                    'SEND RESET SIGNAL'
                  )}
                </button>

                <div className="text-center pt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
                  >
                    <ArrowLeft size={14} /> Back to Login
                  </Link>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
        <p className="mt-10 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
          AllMySell &copy; 2024 • Intelligence OS
        </p>
      </motion.div>
    </div>
  );
}
