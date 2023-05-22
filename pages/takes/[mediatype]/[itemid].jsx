import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';

import { axiosTMDBGet } from '@/src/hooks/useAxios';
import Take from '@/src/components/Takes/Take';
import Comment from '@/src/components/Takes/Comment';

import styles from '@/styles/Comments.module.css'

export const getServerSideProps = async ({ params }) => {
    const commentsList = await prisma.comments.findMany({
        where: {
            threadid: {
                equals: params.itemid
            },
            threadtype: {
                equals: params.mediatype
            }
        },
        select: {
            id: true,
            commenttext: true,
            commenter: true,
            numratings: true,
            rating: true,
            threadid: true,
            parentid: true
        }
    });
    return { props: { commentsList } };
};

const Takes = ({
    commentsList
}) => {
    const [replyToOpen, setReplyToOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [logo, setLogo] = useState("");
    const [scrollPosition, setScrollPosition] = useState(0);

    const imageRef = useRef(null);
    const contentRef = useRef(null);

    const router = useRouter();

    const { mediatype, itemid } = router.query;

    useEffect(() => {
        console.log(window.innerWidth);
        setReplyToOpen(replyToOpen ? false : true);
        if (commentsList.length > 0) {
            setComments(orderComments(commentsList, null));
        }

        axiosTMDBGet(`${mediatype}/${itemid}`).then((response) => {
            console.log(response);
            if (window.innerWidth > 500) {
                setLogo(response?.data?.backdrop_path);
            } else {
                setLogo(response?.data?.poster_path);
            }
        });

        function handleScroll() {
            const scrollPercentage = 1 - (window.scrollY / window.innerHeight);
            const blurPercentage = (window.scrollY / window.innerHeight) * 100;
            const opacityValue = (scrollPercentage * 0.75) - 0.5;
            if (opacityValue >= 0.05) {
                imageRef.current.style.opacity = opacityValue;
                imageRef.current.style.filter = `blur(${blurPercentage}px)`;
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const updateComments = async () => {
        const retValue = await fetch(`/api/get/comment/${mediatype}/${itemid}`)
        const updatedComments = retValue.json();
        setComments(orderComments(await updatedComments));
    }

    const orderComments = (list) => {
        let orderedComments = [];
        const nestedOrderComments = (nestedList, indentations) => {
            nestedList.sort((a, b) => b.rating - a.rating).map((comment) => {
                let updatedComment = comment;
                updatedComment = { ...updatedComment, numIndentations: indentations}
                orderedComments.push(updatedComment);
                nestedOrderComments(list.filter((nestedComment) => nestedComment.parentid === comment.id), indentations + 1);
            })
        }

        list.filter((comment) => !comment.parentid).sort((a, b) => b.rating - a.rating).map((comment) => {
            let updatedComment = comment;
            updatedComment = { ...updatedComment, numIndentations: 0}
            orderedComments.push(updatedComment);
            nestedOrderComments(list.filter((nestedComment) => nestedComment.parentid === comment.id), 1);
        });

        return orderedComments;
    }

    const handleOnReplyButton = (e) => {
        setReplyToOpen(true);
    }

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.imageContainer}
            >
                <IconButton 
                    aria-label="close" 
                    size="large"
                    onClick={() => router.replace('/')}
                    sx={{display: 'flex'}}
                >
                    <CancelRoundedIcon fontSize="inherit" sx={{color: 'whitesmoke'}} />
                </IconButton>
                {logo && <img
                    className={styles.image}
                    ref={imageRef}
                    src={`https://image.tmdb.org/t/p/original/${logo}`}
                />}
            </div>
            <div
                className={styles.content}
                ref={contentRef}
            >
                <h1 className={styles.commentsHeader}>Comments: </h1>
                <Take
                    className={styles.newComment}
                    parentId={null}
                    openReply
                    itemId={itemid}
                    threadType={mediatype}
                    onSubmit={updateComments}
                />
                {
                    comments.map((comment) =>
                    <Comment
                        key={comment.id}
                        details={comment}
                        numIndentations={comment.numIndentations}
                        commentText={comment.commenttext}
                        onReplyButton={handleOnReplyButton}
                        itemid={itemid}
                        threadtype={mediatype}
                        updateComments={updateComments}
                    />
                    )
                }
            </div>
        </div>
    )
}

export default Takes;