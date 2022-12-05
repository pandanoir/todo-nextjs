import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const post = await prisma.todo.create({ data: { title: '', done: false } });
  res.json(post);
}
