import React, { useState, useEffect } from 'react';
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
    threadtype,
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
                        <React.Fragment key={details.id}>
                            <div style={{width: '0.75rem'}} />
                            <div className={styles.threadLine} />
                            <div style={{width: '0.75rem'}} />
                        </React.Fragment>
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
                        <Button
                            onClick={handleOnClick}
                            sx={{
                                color: 'whitesmoke',
                                marginBottom: '5px'
                            }}
                        >
                            Reply
                        </Button>
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
                        threadType={threadtype}
                        handleOnReplyButton={handleOnReplyButton}
                    />
                }
            </div>
        </div>
    )
}

export default Comment;