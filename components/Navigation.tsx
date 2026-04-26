'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Instagram, User, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'SaaS Panel', href: '/dashboard' },
];

const webServices = [
  { name: '🥉 Basic Setup', href: '/web-solutions#basic' },
  { name: '🥈 Professional', href: '/web-solutions#professional' },
  { name: '🥇 Full Ecosystem', href: '/web-solutions#ecosystem' },
  { name: '📞 Get a Quote', href: '/web-solutions#contact' },
];

interface AuthUser {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

export default function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          email: authUser.email || '',
          fullName: authUser.user_metadata?.full_name || null,
          avatarUrl: authUser.user_metadata?.avatar_url || null,
        });
      }
      setAuthLoading(false);
    }
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email || '', fullName: session.user.user_metadata?.full_name || null, avatarUrl: session.user.user_metadata?.avatar_url || null });
      } else { setUser(null); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all group-hover:scale-105">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">AllMySell</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm">{item.name}</Link>
            ))}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium flex items-center gap-1 text-sm">Web Solutions<ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" /></button>
              <div className="absolute left-0 mt-1 w-52 glass-card rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                {webServices.map((item) => (<Link key={item.name} href={item.href} className="block px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all">{item.name}</Link>))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.instagram.com/allmysell/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-400 transition-colors p-2" aria-label="Instagram"><Instagram size={20} /></a>
            <div className="w-px h-5 bg-white/10 mx-1"></div>
            {authLoading ? (<div className="w-20 h-8 bg-white/5 rounded-lg animate-pulse"></div>) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
                  {user.avatarUrl ? (<img src={user.avatarUrl} alt={user.fullName || 'User'} className="w-7 h-7 rounded-full object-cover border border-orange-500/30" />) : (<div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs">{(user.fullName || user.email)[0].toUpperCase()}</div>)}
                  <span className="text-slate-300 text-sm font-medium max-w-[100px] truncate">{user.fullName || user.email.split('@')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (<><div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div><div className="absolute right-0 mt-2 w-56 glass-card rounded-xl z-50 overflow-hidden"><div className="px-4 py-3 border-b border-white/[0.06]"><p className="text-sm font-medium text-white truncate">{user.fullName || 'User'}</p><p className="text-xs text-slate-500 truncate">{user.email}</p></div><Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors" onClick={() => setUserMenuOpen(false)}><User size={16} />Dashboard</Link><button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"><LogOut size={16} />Log Out</button></div></>)}
              </div>
            ) : (<><Link href="/login" className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm">Log In</Link><Link href="/register" className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all font-medium text-sm hover:scale-[1.02]">Get Started</Link></>)}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <a href="https://www.instagram.com/allmysell/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-400 transition-colors p-1" aria-label="Instagram"><Instagram size={20} /></a>
            {!authLoading && !user && (<Link href="/register" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium">Sign Up</Link>)}
            {!authLoading && user && (<Link href="/dashboard" className="p-1.5">{user.avatarUrl ? (<img src={user.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover border border-orange-500/30" />) : (<div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs">{(user.fullName || user.email)[0].toUpperCase()}</div>)}</Link>)}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]">{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-nav border-t border-white/[0.06]">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (<Link key={item.name} href={item.href} className="block px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm" onClick={() => setIsOpen(false)}>{item.name}</Link>))}
            <div className="px-2">
              <button onClick={() => setShopOpen(!shopOpen)} className="w-full text-left px-2 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium flex items-center justify-between text-sm">Shop<ChevronDown size={14} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} /></button>
              {shopOpen && (<div className="bg-white/[0.03] rounded-lg mt-1">{shops.map((shop) => (<Link key={shop.name} href={shop.href} className="block px-4 py-2.5 text-sm text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all" onClick={() => { setIsOpen(false); setShopOpen(false); }}>{shop.name}</Link>))}</div>)}
            </div>
            <div className="px-2"><Link href="/web-cozumleri" className="block px-2 py-3 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-all font-semibold text-sm" onClick={() => setIsOpen(false)}>🌐 Web Solutions</Link></div>
            {!authLoading && (<div className="px-2 pt-2 border-t border-white/[0.06]">{user ? (<><Link href="/dashboard" className="block px-2 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm" onClick={() => setIsOpen(false)}>📊 Dashboard</Link><button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left px-2 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm">🚪 Log Out</button></>) : (<Link href="/login" className="block px-2 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm" onClick={() => setIsOpen(false)}>🔑 Log In</Link>)}</div>)}
          </div>
        </div>
      )}
    </nav>
  );
}
