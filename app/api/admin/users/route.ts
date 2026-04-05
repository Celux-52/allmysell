import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), '.data', 'users.json');

async function getUsers() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();

    return NextResponse.json({
      success: true,
      count: users.length,
      users: users.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
