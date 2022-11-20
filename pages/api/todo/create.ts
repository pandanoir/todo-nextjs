import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const post = await prisma.todo.create({ data: { title: '', done: false } });
  res.json(post);
}
