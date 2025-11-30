import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Prisma conectou-se ao banco de dados com sucesso.");
  } catch (error) {
    console.error("Falha ao conectar ao banco de dados:", error);
  }
}

connectToDatabase();

export default prisma;