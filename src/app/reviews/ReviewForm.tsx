'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleReviewSubmit } from './utils/handleReviewSubmit';


export default function ReviewForm(props: any) {
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    return (
        <Box
            component="form"
            onSubmit={(evt) => handleReviewSubmit(evt, setSuccess, setError)}
            noValidate
            sx={{ mt: 1 }}
        >
            <input
                required
                name="user_id"
                id="user_id"
                defaultValue={props.userId}
                hidden
            />
             <input
                required
                name="product_id"
                id="product_id"
                defaultValue={props.productId}
                hidden
            />

            <input
                required
                name="rating_score"
                id="rating_score"
                defaultValue={props.ratingScore}
                hidden
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="review"
                label="Comment"
                type='default'
                id="review"
                multiline
            />
            {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
            {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color='success'
                sx={{ mt: 3, mb: 2 }}
            >
                Send review
            </Button>
            {/* <Button
                type="reset"
                fullWidth
                variant="contained"
                color='success'
                sx={{ mt: 3, mb: 2 }}
            >
                reset
            </Button> */}

        </Box>
    );
}