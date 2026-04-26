import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardShell from './dashboard-shell'
import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Admin-only email whitelist
const ADMIN_EMAILS = [
  'melih20052005gs@gmail.com',
  'yunussukru7@gmail.com',
  'yunusukur7@gmail.com'
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → redirect to login
  if (!user) {
    redirect('/login')
  }

  // Not admin → show coming soon page
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-orange-500/30">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-md w-full p-8 rounded-2xl border border-white/10 bg-[#080c16] shadow-2xl text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-orange-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-3">SaaS Panel Çok Yakında!</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            AllMySell SaaS paneli şu anda kapalı beta testindedir. Yakında tüm kullanıcıların erişimine açılacaktır. İlginiz için teşekkür ederiz!
          </p>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/"
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <DashboardShell>{children}</DashboardShell>
}
