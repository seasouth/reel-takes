import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';

export default async function handle(req, res) {
    const newNumRatings = req.body.comment.numratings + 1;
    const newRating = ((req.body.comment.rating * req.body.comment.numratings) + req.body.newRating) / newNumRatings;

    const updateComment = await prisma.comments.update({
        where: {
            id: req.body.comment.id
        },
        data: {
            numratings: newNumRatings,
            rating: newRating
        },
    });

    res.status(200).json(updateComment);
}