import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';

export default async function handle(req, res) {
    const commentsList = await prisma.comments.findMany({
        where: {
            threadid: {
                equals: req.query.itemid
            }
        }
    });
    res.status(200).json(commentsList);
}