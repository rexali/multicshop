'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from "./ProductCard";

export default function ProductList(props: any) {
    let products = props.products ?? []
    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {products.map((product: any) => {
                return <Grid key={product._id} item xs={6} sm={6} md={4} lg={3}>
                    <ProductCard product={product} role={props?.role} refreshProducts={props.refreshProducts} />
                </Grid>
            })}
        </Grid>
    )
}
// marginTop={2} display={"flex"} justifyContent={'center'}