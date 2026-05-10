'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Sparkles, Github, ShieldCheck, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
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
      if (!fullName.trim() || !email.trim()) {
        setError('Missing identity vectors. Input required.');
        return;
      }
      setStep(2);
      return;
    }

    if (password.length < 6) {
      setError('Cipher strength insufficient. Min. 6 chars.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Access protocols mismatch. Re-verify cipher.');
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
        setError(authError.message.includes('already registered') 
          ? 'Identity vector already enrolled. Use direct login.' 
          : authError.message);
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
      setError('Initialization error. Node connection failed.');
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
      setError('OAuth gateway timeout. Try direct entry.');
      setSocialLoading(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050810] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* --- CINEMATIC AMBIANCE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-50"
        />

        {/* HUD Elements */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Node: ACTIVE</span>
             <Activity className="w-4 h-4 text-blue-500/40" />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Protocol: ENROLL</span>
             <ShieldCheck className="w-4 h-4 text-orange-500/40" />
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="relative inline-block">
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15px] border border-blue-500/20 rounded-full border-dashed"
            />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-20 w-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/20 border border-white/20"
            >
              <Sparkles className="w-10 h-10 text-white fill-white/20" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            AMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ENROLLMENT</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Initialize New Intelligence Operative</p>
        </div>

        {/* Enrollment Matrix */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0d111c]/70 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-10 border border-white/10 overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Gateway Override */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                          onClick={() => handleSocialLogin('google')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                        >
                          {socialLoading === 'google' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                              <path fill="currentColor" className="opacity-60" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                            </svg>
                          )}
                          Node.Google
                        </button>
                        <button
                          onClick={() => handleSocialLogin('github')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                        >
                          {socialLoading === 'github' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Github className="w-4 h-4" />}
                          Node.GitHub
                        </button>
                      </div>

                      <div className="relative mb-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[9px]"><span className="px-6 bg-[#131926] text-slate-600 font-black uppercase tracking-[0.4em]">Secure Protocol</span></div>
                      </div>
                    </>
                  )}

                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                      {step === 1 ? 'IDENTITY INPUT' : 'ACCESS CIPHER'}
                    </h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                      {step === 1 ? 'Primary Data Collection' : 'Encryption Setup'}
                    </p>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-red-200 text-[11px] font-bold uppercase tracking-tight leading-tight">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <label htmlFor="fullName" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Legal Designation</label>
                            <div className="relative group/input">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="OPERATIVE NAME"
                                required
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Comm Channel</label>
                            <div className="relative group/input">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="VECTOR@ETSY.AI"
                                required
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
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
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Protocol</label>
                            <div className="relative group/input">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="MIN. 6 CHARS"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Verify Cipher</label>
                            <div className="relative group/input">
                              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="RE-ENTER PROTOCOL"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-6">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => { setStep(1); setError(''); }}
                          className="flex-1 py-5 px-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest italic"
                        >
                          RELOAD
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-orange-600 to-orange-700 py-5 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden relative group/btn"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                        {loading ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : step === 1 ? (
                          <>NEXT PHASE <ArrowRight size={20} /></>
                        ) : (
                          <>INITIATE LINK <Zap size={18} /></>
                        )}
                      </motion.button>
                    </div>
                  </form>

                  <div className="mt-10 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                      Existing Operative?{' '}
                      <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors ml-1 border-b border-orange-500/20 pb-0.5">
                        Initiate Login <ArrowRight className="inline w-3 h-3 mb-0.5" />
                      </Link>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/10">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3 italic">ENROLLMENT ACTIVE</h3>
                  <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] leading-relaxed mb-10">
                    Auth link transmitted to node:<br />
                    <span className="text-green-400 font-mono tracking-normal">{email}</span>
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] border border-orange-500/20 px-8 py-4 rounded-2xl bg-orange-500/5 transition-all"
                  >
                    DEPLOY TO LOGIN <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Neural Link Progress */}
        {!success && (
          <div className="mt-12 flex justify-center items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-700 ${step >= 1 ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40' : 'bg-white/5 text-slate-700'}`}>01</div>
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${step >= 1 ? 'text-orange-500' : 'text-slate-800'}`}>IDENT</p>
            </div>
            <div className={`h-[1px] w-16 transition-all duration-1000 ${step >= 2 ? 'bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]' : 'bg-white/5'}`}></div>
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-700 ${step >= 2 ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40' : 'bg-white/5 text-slate-700'}`}>02</div>
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${step >= 2 ? 'text-orange-500' : 'text-slate-800'}`}>CIPHER</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function RegisterForm() {
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
      if (!fullName.trim() || !email.trim()) {
        setError('Missing identity vectors. Input required.');
        return;
      }
      setStep(2);
      return;
    }

    if (password.length < 6) {
      setError('Cipher strength insufficient. Min. 6 chars.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Access protocols mismatch. Re-verify cipher.');
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
        setError(authError.message.includes('already registered') 
          ? 'Identity vector already enrolled. Use direct login.' 
          : authError.message);
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
      setError('Initialization error. Node connection failed.');
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
      setError('OAuth gateway timeout. Try direct entry.');
      setSocialLoading(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050810] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* --- CINEMATIC AMBIANCE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-50"
        />

        {/* HUD Elements */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Node: ACTIVE</span>
             <Activity className="w-4 h-4 text-blue-500/40" />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase italic">Protocol: ENROLL</span>
             <ShieldCheck className="w-4 h-4 text-orange-500/40" />
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="relative inline-block">
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15px] border border-blue-500/20 rounded-full border-dashed"
            />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-20 w-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/20 border border-white/20"
            >
              <Sparkles className="w-10 h-10 text-white fill-white/20" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            AMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ENROLLMENT</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Initialize New Intelligence Operative</p>
        </div>

        {/* Enrollment Matrix */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0d111c]/70 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-10 border border-white/10 overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Gateway Override */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                          onClick={() => handleSocialLogin('google')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                        >
                          {socialLoading === 'google' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"/>
                              <path fill="currentColor" className="opacity-60" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.06C3.555 21.31 7.565 24 12.255 24z"/>
                            </svg>
                          )}
                          Node.Google
                        </button>
                        <button
                          onClick={() => handleSocialLogin('github')}
                          disabled={!!socialLoading}
                          className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                        >
                          {socialLoading === 'github' ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Github className="w-4 h-4" />}
                          Node.GitHub
                        </button>
                      </div>

                      <div className="relative mb-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[9px]"><span className="px-6 bg-[#131926] text-slate-600 font-black uppercase tracking-[0.4em]">Secure Protocol</span></div>
                      </div>
                    </>
                  )}

                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                      {step === 1 ? 'IDENTITY INPUT' : 'ACCESS CIPHER'}
                    </h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                      {step === 1 ? 'Primary Data Collection' : 'Encryption Setup'}
                    </p>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-red-200 text-[11px] font-bold uppercase tracking-tight leading-tight">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <label htmlFor="fullName" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Legal Designation</label>
                            <div className="relative group/input">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="OPERATIVE NAME"
                                required
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Comm Channel</label>
                            <div className="relative group/input">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="VECTOR@ETSY.AI"
                                required
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
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
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Protocol</label>
                            <div className="relative group/input">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="MIN. 6 CHARS"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Verify Cipher</label>
                            <div className="relative group/input">
                              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-orange-500 transition-colors" size={20} />
                              <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="RE-ENTER PROTOCOL"
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-medium"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-6">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => { setStep(1); setError(''); }}
                          className="flex-1 py-5 px-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest italic"
                        >
                          RELOAD
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-orange-600 to-orange-700 py-5 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden relative group/btn"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                        {loading ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : step === 1 ? (
                          <>NEXT PHASE <ArrowRight size={20} /></>
                        ) : (
                          <>INITIATE LINK <Zap size={18} /></>
                        )}
                      </motion.button>
                    </div>
                  </form>

                  <div className="mt-10 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                      Existing Operative?{' '}
                      <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors ml-1 border-b border-orange-500/20 pb-0.5">
                        Initiate Login <ArrowRight className="inline w-3 h-3 mb-0.5" />
                      </Link>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/10">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3 italic">ENROLLMENT ACTIVE</h3>
                  <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] leading-relaxed mb-10">
                    Auth link transmitted to node:<br />
                    <span className="text-green-400 font-mono tracking-normal">{email}</span>
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] border border-orange-500/20 px-8 py-4 rounded-2xl bg-orange-500/5 transition-all"
                  >
                    DEPLOY TO LOGIN <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Neural Link Progress */}
        {!success && (
          <div className="mt-12 flex justify-center items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-700 ${step >= 1 ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40' : 'bg-white/5 text-slate-700'}`}>01</div>
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${step >= 1 ? 'text-orange-500' : 'text-slate-800'}`}>IDENT</p>
            </div>
            <div className={`h-[1px] w-16 transition-all duration-1000 ${step >= 2 ? 'bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]' : 'bg-white/5'}`}></div>
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-700 ${step >= 2 ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40' : 'bg-white/5 text-slate-700'}`}>02</div>
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${step >= 2 ? 'text-orange-500' : 'text-slate-800'}`}>CIPHER</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
