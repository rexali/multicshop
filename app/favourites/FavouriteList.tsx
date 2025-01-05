import * as React from 'react';
import Grid from '@mui/material/Grid';
import FavouriteCard from "./FavouriteCard";

export default function FavouriteList(props: any) {
   
    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {props.products.map((product: any) => {
                return <Grid key={product._id} item xs={12} md={6}><FavouriteCard product={product} /></Grid>
            })}
        </Grid>
    )
}
