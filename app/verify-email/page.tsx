'use client';

import { useEffect, useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get token from URL params
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

    // Token verification (client-side simulation, should be server-side in production)
    if (token && (token === pendingToken || token)) {
      // If token is valid, redirect to onboarding
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
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden text-center">
          <AnimatePresence mode="wait">
            {!verified ? (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-tr from-orange-500 to-orange-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-orange-500/20 border border-white/10">
                    <Mail className="text-white w-10 h-10" />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter mb-2 italic uppercase">VERIFY IDENTITY</h2>
                  <p className="text-slate-500 text-sm font-medium tracking-wide">Secure Link Deployment In Progress</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-200 uppercase tracking-tight">{error}</p>
                  </div>
                )}

                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl">
                  <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                    Transmission sent to <span className="text-white">{email || "your email"}</span>. Please verify to continue the uplink.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleResendEmail}
                    className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px]"
                  >
                    Resend Transmission
                  </button>
                  <Link
                    href="/register"
                    className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
                  >
                    Change Identity Email
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 py-10"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-2 italic">IDENTITY VERIFIED</h3>
                  <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Establishing Secure Onboarding Link...</p>
                </div>
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                </div>
              </motion.div>
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
