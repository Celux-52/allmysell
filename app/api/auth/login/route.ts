import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), '.data', 'users.json');

async function ensureDataFile() {
  try {
    await fs.readFile(DATA_FILE, 'utf-8');
  } catch {
    const dir = path.dirname(DATA_FILE);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      // Dir might already exist
    }
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function getUsers() {
  await ensureDataFile();
  const content = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(content || '[]');
}

async function saveUser(user: any) {
  await ensureDataFile();
  const users = await getUsers();
  users.push({
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  });
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email ve şifre gerekli' },
        { status: 400 }
      );
    }

    const users = await getUsers();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Şifre yanlış' },
        { status: 401 }
      );
    }

    // Password hashing yapılmalı ama şimdilik basit demo
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
