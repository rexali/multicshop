'use client'

import * as React from 'react';
import ProductCard from '../products/ProductCard';

export default function SearchCard({ product }: { product: any }) {
  
  return <ProductCard product={product} />
}