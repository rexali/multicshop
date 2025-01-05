'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from "./ProductCard";

export default function NewProductList(props: any) {
    let products = props.products ?? [];

    return (
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={2} display={"flex"} justifyContent={'center'}>
                {products.slice(0, 4).map((product: any) => {
                    return <Grid key={product._id + 'new'} item xs={6} md={4} lg={3}><ProductCard product={product} /></Grid>
                })}
            </Grid>
    )
}
