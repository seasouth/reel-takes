import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import StarRating from './StarRating';

import styles from '@/styles/Comments.module.css'


const StyledTextField = styled(TextField)({
    '& .MuiFilledInput-input': {
        color: 'whitesmoke'
    }
  });

const Take = ({
    parentId,
    openReply,
    itemId,
    threadType,
    onSubmit,
    topLevel
}) => {
    const [text, setText] = useState("");
    const [mediaRating, setMediaRating] = useState(0);

    const submitComment = async () => {
        let comment = {
            commenter: "Anonymous",
            commenttext: text,
            mediarating: mediaRating,
            threadid: itemId,
            threadtype: threadType,
            parentid: parentId
        }

        try {
            await fetch('/api/submit/comment', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(comment)
            })
            if (onSubmit) {
                setText("");
                setMediaRating(0);
                await onSubmit();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>{
            openReply ? 
            <div>
                <div
                    style={{display: 'flex', paddingLeft: '1rem'}}
                >
                    <StyledTextField
                        sx={{width: '100%'}}
                        id="new-take"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        multiline
                        placeholder="What do you think?"
                        variant="filled"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <div
                                        className={styles.sendButton}
                                    >
                                        <IconButton
                                            onClick={submitComment}
                                            edge="end"
                                        >
                                            <SendIcon
                                                sx={{color: 'whitesmoke', paddingBottom: '4px'}}
                                            />
                                        </IconButton>
                                    </div>
                                </InputAdornment>
                        }}
                    />
                </div>
                <div style={{display: 'flex', paddingTop: '6px', position: 'absolute', right: 0, paddingRight: '2rem'}}>
                    <div style={{display: 'flex', color: 'whitesmoke', paddingTop: '2px'}}>
                        Rate it?
                    </div>
                    <div style={{paddingBottom: '6px', paddingLeft: '6px'}}>
                        <StarRating
                            //details={details}
                            type="take"
                            rating={mediaRating}
                            setRating={setMediaRating}
                        />
                    </div>
                </div>
            </div> : 
            <></>
        }</div>
    )
}

export default Take;