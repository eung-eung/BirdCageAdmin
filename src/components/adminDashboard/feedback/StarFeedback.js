import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
export default function StarFeedback({ rating }) {
    // console.log((rating))
    const stars = Array.from({ length: 5 }, () =>
        <StarOutlineOutlinedIcon
            color='disabled'
            fontSize='small' />);

    for (let i = 0; i < rating; i++) {
        stars[i] = <StarIcon color='warning' fontSize='small' />;
    }
    return (
        <div>{stars}</div>
    )
}