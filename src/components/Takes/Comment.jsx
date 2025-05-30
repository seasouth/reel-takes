import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import StarRating from '@/src/components/Takes/StarRating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Take from '@/src/components/Takes/Take';

import styles from '@/styles/Comments.module.css'

const Comment = ({
    details,
    username,
    commentText,
    itemid,
    updateComments
}) => {
    const [replyToOpen, setReplyToOpen] = useState(false);

    const handleOnClick = (e) => {
        setReplyToOpen(replyToOpen ? false : true);
        console.log(details);
    }

    const handleOnReplyButton = (e) => {
        setReplyToOpen(true);
    }

    const handleOnSubmit = () => {
        setReplyToOpen(false);
        updateComments();
    }

    return (
        <div
            style={{display: 'flex'}}
        >
            { 
                <div
                    style={{display: 'flex'}}
                >{
                    [...Array(details.numIndentations)].map(() =>

                        <>
                            <div style={{width: '0.75rem'}} />
                            <div className={styles.threadLine} />
                            <div style={{width: '0.75rem'}} />
                        </>
                    )
                }</div>

            }
            <div className={styles.comment}>
                <div className={styles.commentInner}>
                    { username ? 
                    <div className={styles.commentAuthor}>
                        {username}
                    </div>
                    :
                    <div className={styles.commentHeading}>
                        <AccountCircleIcon 
                            sx={{color: 'khaki'}}
                        />
                        <div className={styles.commentAuthor}>Anonymous</div>
                    </div>}
                    <div className={styles.commentText}>
                        {commentText}
                    </div>
                    <div className={styles.commentMenu}>
                        <StarRating 
                            details={details}
                            updateComments={updateComments}
                        />
                        <br />
                        <div 
                            style={{padding: '2px'}} 
                        >
                            <Button
                                onClick={handleOnClick}
                                color="primary"
                            >
                                Reply
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    replyToOpen &&
                    <Take
                        className={styles.newComment}
                        parentId={details.id}
                        openReply={replyToOpen}
                        onSubmit={handleOnSubmit}
                        itemId={itemid}
                        handleOnReplyButton={handleOnReplyButton}
                    />
                }
            </div>
        </div>
    )
}

export default Comment;