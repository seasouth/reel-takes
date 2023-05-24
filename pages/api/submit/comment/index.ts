// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const result = await prisma.comments.create({
        data: req.body
    });
    res.status(200).json({ message: 'Success' });
}