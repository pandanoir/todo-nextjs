import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = await prisma.todo.update({
    where: { id: req.body.id as string },
    data: { title: req.body.title, done: req.body.done },
  });
  res.json(post);
}
