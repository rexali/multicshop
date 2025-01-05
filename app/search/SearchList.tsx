'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import SearchCard from './SearchCard';
import Fallback from '../../components/common/fallback';

export default function SearchList(props: any) {
    let products = props.products ?? [];


    if (!products.length) {
        return <Fallback item={'No product found yet'} />
    }


    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 5, marginLeft: "auto", marginRight: "auto" }}>
            {products.map((product: any) => {
                return <Grid key={product._id} item xs={6} md={4} lg={3}><SearchCard product={product} /></Grid>
            })}
        </Grid>
    )
}
