import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import prisma from '@/lib/prisma';
import CancelIcon from '@mui/icons-material/Cancel';

import { axiosGet, axiosTMDBGet } from '@/src/hooks/useAxios';
import Take from '@/src/components/Takes/Take';
import Comment from '@/src/components/Takes/Comment';

import styles from '@/styles/Comments.module.css'

export const getServerSideProps = async ({ params }) => {
    const commentsList = await prisma.comments.findMany({
        where: {
            threadid: {
                equals: params.itemid
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
    const [newTake, setNewTake] = useState(false);

    const router = useRouter();

    const { mediatype, itemid } = router.query;

    useEffect(() => {
        setReplyToOpen(false);
        if (commentsList.length > 0) {
            setComments(orderComments(commentsList, null));
        }
        axiosTMDBGet(`${mediatype}/${itemid}/images`).then((response) => {
            setLogo(response?.data?.logos[0]?.file_path);
        });
    }, []);

    const updateComments = async () => {
        console.log(itemid)
        const retValue = await fetch(`/api/get/comment/${itemid}`)
        const updatedComments = retValue.json();
        setComments(orderComments(await updatedComments));
    }

    const orderComments = (list) => {
        let orderedComments = [];

        const nestedOrderComments = (nestedList, indentations) => {

            nestedList.sort((a, b) => a.rating - b.rating).map((comment) => {
                let updatedComment = comment;
                updatedComment = { ...updatedComment, numIndentations: indentations}

                orderedComments.push(updatedComment);

                nestedOrderComments(list.filter((nestedComment) => nestedComment.parentid === comment.id), indentations + 1);
            })
        }

        list.filter((comment) => !comment.parentid).sort((a, b) => a.rating - b.rating).map((comment) => {
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
        <div>
            <CancelIcon
                className={styles.btnClose}
                onClick={() => router.replace('/')}
            />
            <br />
            <img
                style={{maxHeight: '30vh', maxWidth: '100%'}}
                src={`https://image.tmdb.org/t/p/original/${logo}`}
            />
            <hr />
            <h4 className={styles.commentsHeader}>Comments: </h4>
            {comments.length === 0 ?
                <Take
                    className={styles.newComment}
                    parentId={null}
                    openReply
                    itemId={itemid}
                    onSubmit={updateComments}
                />
                :
                <React.Fragment>
                    {
                        comments.map((comment) => 
                            <Comment
                                key={comment}
                                details={comment}
                                numIndentations={comment.numIndentations}
                                commentText={comment.commenttext}
                                onReplyButton={handleOnReplyButton}
                                itemid={itemid}
                                updateComments={updateComments}
                            />
                        )
                    }
                </React.Fragment>
            }
            <hr />
            <br />
            <div 
                style={{padding: '2px'}} 
            >
                <button
                    className='btn btn-outline-light btn-sm'
                    onClick={() => setNewTake(true)}
                >
                    Reply
                </button>
            </div>
            <br />
        </div>
    )
}

export default Takes;