import React, { useState, useEffect } from 'react';
import prisma from '@/lib/prisma';
import { axiosTMDBGet } from '@/src/hooks/useAxios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
const TMDB_API_KEY = 'f13366d7e39e24b8870e5dc2937769c9';

const handle = async (req, res) => {
    const commentsList = await prisma.comments.findMany({
        distinct: ['threadtype', 'threadid'],
        orderBy: {
            timestamp: 'desc'
        },
        select: {
            threadtype: true,
            threadid: true
        }
    });

    const responses = [];

    for (let i = 0; i < 12; i++) {
        const response = await fetch(`${TMDB_BASE_URL}${commentsList[i].threadtype}/${commentsList[i].threadid}?api_key=${TMDB_API_KEY}`);
        const dataUnprepped = await response.json();
        dataUnprepped["media_type"] = commentsList[i].threadtype;
        responses.push(dataUnprepped);
    }

    res.status(200).json(responses);
}

export default handle;