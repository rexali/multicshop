'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./styles/styles.css";
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function HomeProductCategoryList(props: any) {
    let categoryData = props.categoryData ?? [];
    let categories = categoryData.map((product: any) => product.product_category);
    const categoriex = Array.from(new Set([...categories]));

    return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2, marginLeft: "auto", marginRight: "auto"}}>
                {
                    categoriex.map((catx: any, i: number) => {
                        return (
                            <Grid item key={catx + i} xs={6} sm={6} md={6}>
                                <Link style={{ textDecoration: 'none', }} href={`/category/?term=${catx.toLowerCase()}`}>
                                    <Card sx={{ backgroundColor: 'green', maxWidth: '100%', MaxHeight: '100%', textAlign: 'center', alignSelf: 'center' }}>
                                        <CardContent>
                                            <Button sx={{ fontSize: 11, color: 'white' }}>
                                                {catx}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        )
                    })}
            </Grid>
    )
}
