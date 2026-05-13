import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing Profile count...')
    const profileCount = await prisma.profile.count()
    console.log('Profile count:', profileCount)

    console.log('Testing SearchHistory count...')
    const searchHistoryCount = await prisma.searchHistory.count()
    console.log('SearchHistory count:', searchHistoryCount)

    console.log('Success!')
  } catch (error) {
    console.error('Prisma test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
