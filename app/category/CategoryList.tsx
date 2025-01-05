'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import CategoryCard from './CategoryCard';

export default function CategoryList(props: any) {
    let products = props.products ?? [];

    return (
        <div>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:5, marginLeft: "auto", marginRight: "auto"}}>
                {products.map((product: any) => {
                    return <Grid key={product._id} item xs={6} md={4} lg={3}><CategoryCard product={product} /></Grid>
                })}
            </Grid>
        </div>
    )
}
