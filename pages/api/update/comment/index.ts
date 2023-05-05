import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';

export default async function handle(req, res) {
    console.log(req.body);

    const newNumRatings = req.body.comment.numratings + 1;
    console.log("newNumRatings: " + newNumRatings);
    console.log("numerator: " + ((req.body.comment.rating * req.body.comment.numratings) + req.body.newRating))
    const newRating = ((req.body.comment.rating * req.body.comment.numratings) + req.body.newRating) / newNumRatings;

    console.log("newRating: " + newRating);

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