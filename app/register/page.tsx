'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Sparkles, Github, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccess(true);
        if (data.session) {
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 1500);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
      console.error('Register error:', err);
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
    <div className="min-h-screen bg-[#050810] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans text-slate-300">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(234,88,12,0.2)] border border-white/20"
          >
            <Sparkles className="w-8 h-8 text-white fill-white/20" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            AMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ENROLLMENT</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Initialize New Intelligence Operative</p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0d111c]/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 border border-white/10">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Social Login - Only Step 1 */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                          onClick={() => handleSocialLogin('google')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
                        >
                          {socialLoading === 'google' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                              <path fill="currentColor" className="opacity-60" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                            </svg>
                          )}
                          Google
                        </button>
                        <button
                          onClick={() => handleSocialLogin('github')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
                        >
                          {socialLoading === 'github' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Github className="w-4 h-4" />}
                          GitHub
                        </button>
                      </div>

                      <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[9px]"><span className="px-4 bg-[#0d111c] text-slate-600 font-black uppercase tracking-[0.2em]">Secure Registration</span></div>
                      </div>
                    </>
                  )}

                  <div className="mb-8">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                      {step === 1 ? 'Primary Data' : 'Security Layer'}
                    </h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      {step === 1 ? 'Provide operative identification' : 'Establish access protocols'}
                    </p>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-red-200 text-[10px] font-bold uppercase tracking-tight leading-tight">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-5"
                        >
                          <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Designation</label>
                            <div className="relative group/input">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                              <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Operative Name"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Communication Channel</label>
                            <div className="relative group/input">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Vector@network.com"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-5"
                        >
                          <div className="space-y-2">
                            <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Cipher</label>
                            <div className="relative group/input">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                              <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Cipher</label>
                            <div className="relative group/input">
                              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                              <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Verification"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-4">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => { setStep(1); setError(''); }}
                          className="flex-1 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest"
                        >
                          Back
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-orange-500 to-orange-600 py-4 rounded-2xl font-black text-white uppercase tracking-wider text-sm shadow-[0_10px_30px_rgba(234,88,12,0.2)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : step === 1 ? (
                          <>Next Phase <ArrowRight size={18} /></>
                        ) : (
                          'Initialize'
                        )}
                      </motion.button>
                    </div>
                  </form>

                  <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-8">
                    Existing Operative?{' '}
                    <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors ml-1">
                      Log in <ArrowRight className="inline w-3 h-3 mb-0.5" />
                    </Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Operative Enrolled</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                    Authentication link transmitted to <br />
                    <span className="text-green-400">{email}</span>
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]"
                  >
                    Proceed to Login <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Step Indicator */}
        {!success && (
          <div className="mt-10 flex justify-center items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] transition-all duration-500 ${step >= 1 ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]' : 'bg-white/5 text-slate-700'}`}>01</div>
              <p className={`text-[8px] font-black uppercase tracking-widest ${step >= 1 ? 'text-orange-500' : 'text-slate-800'}`}>IDENT</p>
            </div>
            <div className={`h-[1px] w-12 transition-all duration-500 ${step >= 2 ? 'bg-orange-500' : 'bg-white/5'}`}></div>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] transition-all duration-500 ${step >= 2 ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]' : 'bg-white/5 text-slate-700'}`}>02</div>
              <p className={`text-[8px] font-black uppercase tracking-widest ${step >= 2 ? 'text-orange-500' : 'text-slate-800'}`}>CIPHER</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
