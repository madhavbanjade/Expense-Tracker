import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
//should be aware with the import of prismaclient otherwise. it through error

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma