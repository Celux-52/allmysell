import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

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

export async function POST(request: NextRequest) {
  try {
    await ensureDataFile();
    
    // Create test user with password "test123"
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    const testUser = {
      id: Date.now().toString(),
      email: 'test@gmail.com',
      password: hashedPassword,
      fullName: 'Test Kullanıcı',
      platform: 'amazon',
      monthlyOrders: 'high',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };

    await fs.writeFile(DATA_FILE, JSON.stringify([testUser], null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Test kullanıcı oluşturuldu',
      testUser: {
        email: testUser.email,
        password: 'test123',
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `Hata: ${errorMessage}` },
      { status: 500 }
    );
  }
}
