'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Search, TrendingUp, Bookmark, Clock,
  Settings, LogOut, ChevronLeft, ChevronRight, Shield, Sparkles,
  Menu, X, Bot, Trophy
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Research', href: '/dashboard/research', icon: Search },
  { name: 'Trends', href: '/dashboard/trends', icon: TrendingUp },
  { name: 'Saved Products', href: '/dashboard/saved', icon: Bookmark },
  { name: 'History', href: '/dashboard/history', icon: Clock },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
  // { name: 'Bot Automation', href: '/dashboard/automation', icon: Bot }, // Temporarily disabled (Under Construction)
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardUser {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        fullName: authUser.user_metadata?.full_name || null,
        avatarUrl: authUser.user_metadata?.avatar_url || null,
        role: authUser.user_metadata?.role || 'user',
      });
      setLoading(false);
    }
    getUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#E8750A]/30 border-t-[#E8750A] rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin' ||
                  user?.email === 'melih@allmysell.com' ||
                  user?.email === 'yunus@allmysell.com';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E8750A]/20">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#E8750A] to-[#F59E0B] bg-clip-text text-transparent">AllMySell</h1>
              <p className="text-[10px] text-gray-600 -mt-0.5">Product Research Platform</p>
            </div>
          )}
        </Link>
      </div>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-[#E8750A]/10 to-[#F59E0B]/5 rounded-xl border border-[#E8750A]/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-[#F59E0B]" size={14} />
            <span className="text-xs font-semibold text-[#F59E0B]">Free Plan</span>
          </div>
          <p className="text-[10px] text-gray-500">Upgrade for unlimited AI searches</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#E8750A]/15 text-[#E8750A] border border-[#E8750A]/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
              title={collapsed ? item.name : undefined}
            >
              <item.icon size={20} className={`flex-shrink-0 ${isActive ? 'text-[#E8750A]' : 'group-hover:text-[#E8750A]'}`} />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-white/5 space-y-1">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-all"
            title={collapsed ? 'Admin Panel' : undefined}
          >
            <Shield size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Admin Panel</span>}
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
          title={collapsed ? 'Log Out' : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all w-full"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>

      {/* User Card */}
      {!collapsed && user && (
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E8750A]/20 flex-shrink-0" />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {(user.fullName || user.email)[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium text-cornsilk truncate">{user.fullName || 'User'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${collapsed ? 'w-20' : 'w-64'} bg-[#111111] border-r border-white/5 flex-col transition-all duration-300 sticky top-0 h-screen`}>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111111] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold bg-gradient-to-r from-[#E8750A] to-[#F59E0B] bg-clip-text text-transparent">AllMySell</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-gray-300 hover:bg-white/5">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#111111] z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
