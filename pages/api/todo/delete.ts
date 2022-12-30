import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);
    if (!session) {
      throw new Error('authorization required');
    }
    if (
      (await prisma.todo.findFirst({ where: { id: req.body.id as string } }))
        ?.userId !== session.user.sub
    ) {
      throw new Error('permission denied');
    }
    const post = await prisma.todo.delete({
      where: { id: req.body.id },
    });
    res.json(post);
  }
);
