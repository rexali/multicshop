'use client'

import * as React from 'react';
import ProductCard from '../products/ProductCard';

export default function CategoryCard({ product }: { product: any }) {
  
  return <ProductCard product={product} />
}