import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

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
    onSubmit
}) => {
    const [text, setText] = useState("");

    const submitComment = async () => {
        let comment = {
            commenter: "Anonymous",
            commenttext: text,
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
                console.log("on submit");
                setText("");
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
                                        className={styles.SendButton}
                                    >
                                        <IconButton
                                            onClick={submitComment}
                                            edge="end"
                                        >
                                            <Avatar
                                                sx={{ width: 32, height: 32 }}
                                            >
                                                <SendIcon
                                                    color="primary"
                                                />
                                            </Avatar>
                                        </IconButton>
                                    </div>
                                </InputAdornment>
                        }}
                    />
                </div>
            </div> : 
            <></>
        }</div>
    )
}

export default Take;