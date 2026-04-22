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
  { name: '🥉 Basic Setup', href: '/web-cozumleri#temel' },
  { name: '🥈 Professional', href: '/web-cozumleri#profesyonel' },
  { name: '🥇 Full Ecosystem', href: '/web-cozumleri#ekosistem' },
  { name: '📞 Get a Quote', href: '/web-cozumleri#iletisim' },
];

const shops = [
  { name: 'eBay', href: '/shop/ebay' },
  { name: 'Amazon', href: '/shop/amazon' },
  { name: 'Etsy', href: '/shop/etsy' },
  { name: 'Shopify', href: '/shop/shopify' },
  { name: 'TikTok Shop', href: '/shop/tiktok' },
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

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
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

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name || null,
          avatarUrl: session.user.user_metadata?.avatar_url || null,
        });
      } else {
        setUser(null);
      }
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
    <nav className="bg-[#FAFAF9] shadow-lg shadow-black/50 sticky top-0 z-50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-stone-900 !text-white hover:bg-stone-800 rounded-lg flex items-center justify-center shadow-lg shadow-stone-200/50">
              <span className="text-stone-900 font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-stone-900 !text-white hover:bg-stone-800 bg-clip-text text-transparent">
              AllMySell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors font-medium flex items-center gap-1">
                Shop
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-stone-50 rounded-lg shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-stone-200/60">
                {shops.map((shop) => (
                  <Link
                    key={shop.name}
                    href={shop.href}
                    className="block px-4 py-3 text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {shop.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Web Solutions Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors font-medium flex items-center gap-1">
                Web Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-52 bg-stone-50 rounded-lg shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-stone-200/60">
                {webServices.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/allmysell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800 transition-colors p-2"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <div className="w-px h-6 bg-stone-100/50 mx-1"></div>

            {authLoading ? (
              <div className="w-20 h-9 bg-stone-50 rounded-lg animate-pulse"></div>
            ) : user ? (
              /* Logged in state */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#E8750A]/10 transition-colors"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-[#E8750A]/30"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-stone-900 !text-white hover:bg-stone-800 rounded-full flex items-center justify-center text-stone-900 font-bold text-sm">
                      {(user.fullName || user.email)[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-stone-900 text-sm font-medium max-w-[120px] truncate">
                    {user.fullName || user.email.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-stone-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-stone-50 rounded-xl shadow-xl shadow-black/50 z-50 border border-stone-200/60 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-sm font-medium text-stone-900 truncate">{user.fullName || 'User'}</p>
                        <p className="text-xs text-stone-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Not logged in */
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-lg text-stone-800 hover:bg-[#E8750A]/10 transition-colors font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-lg hover:shadow-lg hover:shadow-stone-200/50 transition-all font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button & Icons */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://www.instagram.com/allmysell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            {!authLoading && !user && (
              <Link
                href="/register"
                className="px-3 py-1.5 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded text-sm hover:shadow-lg transition-all font-medium"
              >
                Sign Up
              </Link>
            )}
            {!authLoading && user && (
              <Link
                href="/dashboard"
                className="p-1.5"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-[#E8750A]/30" />
                ) : (
                  <div className="w-8 h-8 bg-stone-900 !text-white hover:bg-stone-800 rounded-full flex items-center justify-center text-stone-900 font-bold text-sm">
                    {(user.fullName || user.email)[0].toUpperCase()}
                  </div>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-[#E8750A]/20"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-t border-stone-200/60">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Shop Menu */}
            <div className="px-2">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full text-left px-2 py-3 rounded-lg text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors font-medium flex items-center justify-between"
              >
                Shop
                <ChevronDown size={16} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <div className="bg-stone-50 rounded-lg mt-2 space-y-1">
                  {shops.map((shop) => (
                    <Link
                      key={shop.name}
                      href={shop.href}
                      className="block px-4 py-2 text-stone-600 hover:bg-[#E8750A]/20 hover:text-stone-800 transition-colors rounded"
                      onClick={() => {
                        setIsOpen(false);
                        setShopOpen(false);
                      }}
                    >
                      {shop.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Web Çözümleri */}
            <div className="px-2">
              <Link
                href="/web-cozumleri"
                className="block px-2 py-3 rounded-lg text-stone-800 hover:bg-[#E8750A]/20 transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                🌐 Web Solutions
              </Link>
            </div>

            {/* Mobile Auth Links */}
            {!authLoading && (
              <div className="px-2 pt-2 border-t border-white/5">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-2 py-3 rounded-lg text-stone-900 hover:bg-[#E8750A]/20 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-2 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium"
                    >
                      🚪 Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-2 py-3 rounded-lg text-stone-900 hover:bg-[#E8750A]/20 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    🔑 Log In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
