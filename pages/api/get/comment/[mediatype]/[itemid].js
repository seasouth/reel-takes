import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';

export default async function handle(req, res) {
    console.log("requirement query: " + req.query.mediatype + " " + req.query.itemid);
    const commentsList = await prisma.comments.findMany({
        where: {
            threadid: {
                equals: req.query.itemid
            },
            threadtype: {
                equals: req.query.mediatype
            }
        }
    });
    res.status(200).json(commentsList);
}