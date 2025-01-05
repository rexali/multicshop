import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function RatingReviewCard({ review,ratingScore}: { review: string, ratingScore: number }) {
    return (
        <Box>
            <Rating name="read-only" value={ratingScore} readOnly />
            <Typography component="p">{review}</Typography>
        </Box>
    )
}