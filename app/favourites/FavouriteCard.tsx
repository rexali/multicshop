import * as React from 'react';

import ProductCard from '../products/ProductCard';

export default function FavouriteCard({ product }: { product: any }) {

  return <ProductCard product={product} />;
}