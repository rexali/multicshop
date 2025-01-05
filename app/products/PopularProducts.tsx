'use client'

import { Container } from "@mui/material";
import PopularProductList from "./PopularProductList";
import ErrorBoundary from "../../components/ErrorBoundary";
import React from "react";

export default function PopularProducts({ products }: { products: any }) {

  return (
    <ErrorBoundary>
      <Container maxWidth="md" component={'main'} sx={{ mt: 2 }}>
        <h3>Popular</h3>
        <PopularProductList products={products} />
      </Container>
    </ErrorBoundary>
  )
}
