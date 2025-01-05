'use client'

import { Container } from "@mui/material";
import ErrorBoundary from "../../components/ErrorBoundary";
import React from "react";
import NewProductList from "./NewProductList";

export default function NewProducts({ products }: { products: any }) {

  return (
    <ErrorBoundary>
      <Container maxWidth="md" component={'main'} sx={{ mt: 2 }}>
        <h3>New</h3>
        <NewProductList products={products}/>
      </Container>
    </ErrorBoundary>
  )
}
