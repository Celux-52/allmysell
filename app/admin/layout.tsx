'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, Package, Settings,
  ChevronLeft, ChevronRight, LogOut, Home, Shield,
  BarChart3, Bot, Star
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'User Saves', href: '/admin/saves', icon: Star },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Bot Automation', href: '/admin/bots', icon: Bot },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      const adminEmails = [
        'melih@allmysell.com',
        'melih20052005gs@gmail.com',
        'melihbicak@gmail.com',
        'yunus@allmysell.com',
        'yunussukur7@gmail.com'
      ];

      const isAdmin = authUser.user_metadata?.role === 'admin' ||
                       (authUser.email && adminEmails.includes(authUser.email.toLowerCase()));

      if (!isAdmin) {
        router.push('/dashboard');
        return;
      }

      setUser(authUser);
      setLoading(false);
    }
    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-stone-500">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-white/5 flex flex-col transition-all duration-300 sticky top-0 h-screen`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="text-stone-900" size={20} />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-stone-900">Admin</h1>
                <p className="text-xs text-stone-400">AllMySell</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/20'
                    : 'text-stone-500 hover:bg-white/5 hover:text-gray-200'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon size={20} className={`flex-shrink-0 ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Area */}
        <div className="p-2 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-500 hover:bg-white/5 hover:text-gray-200 transition-all"
            title={collapsed ? 'Back to Site' : undefined}
          >
            <Home size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Back to Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
            title={collapsed ? 'Log Out' : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Log Out</span>}
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-400 hover:bg-white/5 hover:text-stone-600 transition-all w-full"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>

        {/* User Info */}
        {!collapsed && user && (
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-stone-900 text-xs font-bold flex-shrink-0">
                {(user.email || 'A')[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-stone-900 truncate">{user.user_metadata?.full_name || 'Admin'}</p>
                <p className="text-xs text-stone-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
