"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Menu, X, Zap, History, Star, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/isAdmin";

const navigation = [
  { name: "SaaS Panel", href: "/dashboard/saas", icon: Zap },
  { name: "Saved Items", href: "/dashboard/saved", icon: Star },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Pricing", href: "/pricing", icon: Zap },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email && isAdmin(user.email)) {
        setIsAdminUser(true);
      }
    };
    checkAdmin();
  }, []);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex overflow-hidden selection:bg-orange-500/30">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#030712] border-r border-white/5 flex flex-col transform lg:relative lg:translate-x-0 transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-sm font-black text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              A
            </div>
            <span className="text-lg font-bold text-white tracking-tight">AllMySell</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative group",
                  isActive
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg border border-orange-500/20 bg-orange-500/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-[#030712]/50 backdrop-blur-xl px-4 shadow-sm sm:gap-6 sm:px-6 lg:px-8 z-30 relative">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-end items-center gap-4">
            {isAdminUser && (
              <Link href="/admin/saves" className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1 text-sm font-medium text-orange-400 transition-colors">
                <SparklesIcon className="h-4 w-4" />
                Admin
              </Link>
            )}
            <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-sm font-medium text-slate-300">
              Premium SaaS
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 ring-2 ring-white/10" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#030712] relative">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
