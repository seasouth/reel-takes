import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StarRating({
  details,
  updateComments
}) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const handleChange = async (e, nv) => {
    setValue(nv);

    const results = await fetch(`/api/update/comment`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        comment: details,
        newRating: nv
      })
    })
    if (updateComments) {
      await updateComments();
    }
  }

  return (
    <Box
      textAlign="left"
      sx={{
        paddingTop: '6px',
        display: 'flex',
        alignItems: 'left',
      }}
    >
      <Rating
        name="hover-feedback"
        value={details.rating}
        precision={0.5}
        getLabelText={getLabelText}
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