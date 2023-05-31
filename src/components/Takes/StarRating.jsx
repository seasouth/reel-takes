import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function StarRating({
  details,
  updateRating,
  type,
  rating,
  setRating
}) {
  const handleChange = async (e, nv) => {
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

    if (updateRating) {
      await updateRating();
    }
  }

  const getRatingValue = () => {
    if (type === 'comment') {
      return details.rating;
    } else if (type === 'media') {
      return details.mediarating;
    } else if (type === 'take') {
      return rating;
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
        //emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}