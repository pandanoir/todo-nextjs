import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(posts);
}
