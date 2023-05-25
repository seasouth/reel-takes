import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function StarRating({
  details,
  updateComments,
  type,
  setRating
}) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const handleChange = async (e, nv) => {
    setValue(nv);
    if (setRating) {
      setRating(nv);
    }

    if (type === 'comment') {
      const results = await fetch(`/api/update/comment`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          comment: details,
          newRating: nv
        })
      })
    }

    if (updateComments) {
      await updateComments();
    }
  }

  const getRatingValue = () => {
    if (type === 'comment') {
      return details.rating;
    } else if (type === 'media') {
      return details.mediarating;
    } else if (type === 'take') {
      return value;
    }
  }

  return (
    <Box
      textAlign="left"
      sx={{
        paddingTop: type === 'comment' ? '6px' : '0px',
        display: 'flex',
        alignItems: 'left',
      }}
    >
      <Rating
        name="hover-feedback"
        value={getRatingValue()}
        readOnly={type === 'media'}
        precision={0.5}
        size="xsmall"
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        //emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}