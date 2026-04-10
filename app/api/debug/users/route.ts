import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    
    return NextResponse.json({
      success: true,
      database: 'PostgreSQL (Prisma)',
      userCount: users.length,
      users: users.map((u) => ({
        email: u.email,
        id: u.id,
        fullName: u.fullName,
      })),
      databaseConnected: true,
    });
  } catch (error) {
    console.error('Debug error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}
