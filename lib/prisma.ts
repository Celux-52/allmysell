import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient() {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  
  if (!dbUrl) {
    const availableEnvVars = Object.keys(process.env).filter(key => key.includes('URL') || key.includes('POSTGRES')).join(', ');
    throw new Error(`Veritabanı bağlantı linki (DATABASE_URL) bulunamadı. Mevcut değişkenler: ${availableEnvVars || 'Yok'}. Lütfen Vercel panelinden Environment Variables kısmını kontrol edin.`);
  }
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl
        }
      }
    } as any);
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    return (client as any)[prop];
  },
});
