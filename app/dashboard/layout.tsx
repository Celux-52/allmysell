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

  // Check subscription status
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { subscriptionStatus: true }
  })

  // Admin Override
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  const isUserAdmin = user.email && adminEmails.includes(user.email.toLowerCase())

  // If FREE and NOT admin → redirect to pricing
  if (!isUserAdmin && (!profile || profile.subscriptionStatus === 'FREE')) {
    redirect('/pricing')
  }

  return <DashboardShell>{children}</DashboardShell>
}
