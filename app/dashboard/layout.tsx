import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardShell from './dashboard-shell'
import { prisma } from '@/lib/prisma'

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

  // Admin Override - check first (no DB needed)
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  const isUserAdmin = user.email && adminEmails.includes(user.email.toLowerCase())

  // Admins always get through - no DB check needed
  if (isUserAdmin) {
    return <DashboardShell>{children}</DashboardShell>
  }

  // For non-admin users, check subscription status
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { subscriptionStatus: true }
    })

    // If no profile or FREE status → redirect to pricing
    if (!profile || profile.subscriptionStatus === 'FREE') {
      redirect('/pricing')
    }
  } catch (dbError) {
    // If DB is unreachable, block access to be safe
    console.warn('[Dashboard Layout] Profile check failed:', dbError)
    redirect('/pricing')
  }

  return <DashboardShell>{children}</DashboardShell>
}
