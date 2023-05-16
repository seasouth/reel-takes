import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

const CarouselItem = ({
    item,
    image
}) => {
    const [length, setLength] = useState(0);
    const [avgRating, setAvgRating] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const retValue = await fetch(`/api/get/comment/${item.media_type}/${item.id}`);
            const updatedComments = await retValue.json();

            if (updatedComments.length > 0) {
                setLength(updatedComments.length);
                const avgRating = updatedComments.reduce((a, b) => a + b.rating, 0) / updatedComments.length;
                setAvgRating(avgRating);
            }
        }

        if (item) {
            fetchData();
        }
    }, [item]);

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    sx={{ height: '100%', width: '100%' }}
                    component="img"
                    image={image}
                />
                <CardContent
                    sx={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}
                >
                    <Rating
                        name="reel-rating"
                        size="small"
                        value={avgRating}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'whitesmoke' }} fontSize="inherit" />}
                    />
                    <Badge badgeContent={length} color="primary">
                        <CommentIcon style={{color: "white"}} />
                    </Badge>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CarouselItem;