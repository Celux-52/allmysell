import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Çıkış yapıldı',
  });

  // Clear auth cookie
  response.cookies.delete('authToken');

  return response;
}
