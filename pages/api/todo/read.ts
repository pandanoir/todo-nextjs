import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(posts);
}
