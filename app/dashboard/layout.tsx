import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardShell from './dashboard-shell'

// Admin-only email whitelist
const ADMIN_EMAILS = [
  'melih20052005gs@gmail.com',
  'yunussukru7@gmail.com',
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

  // Not admin → redirect to home with message
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    redirect('/?access=denied')
  }

  return <DashboardShell>{children}</DashboardShell>
}
