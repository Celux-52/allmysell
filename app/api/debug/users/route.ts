import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), '.data', 'users.json');

async function getUsers() {
  const dir = path.dirname(DATA_FILE);
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

export async function GET() {
  try {
    const users = await getUsers();
    const filePath = DATA_FILE;
    
    return NextResponse.json({
      success: true,
      filePath,
      userCount: users.length,
      users: users.map((u: any) => ({
        email: u.email,
        id: u.id,
        fullName: u.fullName,
      })),
      fileExists: true,
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
