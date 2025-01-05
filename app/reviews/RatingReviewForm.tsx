'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ReviewForm from './ReviewForm';
import { getToken } from '../../utils/getToken';
import { useAuth } from '../../hooks/use-auth';
import { Container } from '@mui/material';

export default function RatingReviewForm(props: any) {
  const [value, setValue] = React.useState<number | null>(1);
  const auth = useAuth();
  const userId = auth.user?._id || getToken('_id') as string;
  return (
    <Container component={"main"} maxWidth="md">
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <Typography component="legend">Rate this product</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <ReviewForm productId={props.productId} userId={userId} ratingScore={value} />
      </Box>
    </Container>
  );
}