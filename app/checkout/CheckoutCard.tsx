'use client'

import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { SERVER_URL } from '../../constants/url';
import { useAuth } from '../../hooks/use-auth';
import CardImage from '../products/components/CardImage';

export default function CheckoutCard({ product}: { product: any}) {
  const auth = useAuth(); // authenticate user

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
        <Link href={"/products/" + product._id}>
          {product.product_pictures?.length ?
            <CardImage
              src={`${SERVER_URL}/uploads/${product.product_pictures[0]}`}
              alt={product.product_name}
              width={80}
              height={80}
              style={{
                borderRadius: 10,
              }}
            />

            :
            <CardImage
              src={"https://placehold.co/600x400/orange/white"}
              alt={'photo'}
              width={100}
              height={100}
              style={{
                borderRadius: 10,
              }}
            />
          }
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product?.product_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {product?.cartQuantity} x  &#x20A6; {product?.product_price}
          </Typography>
        </CardContent>
      </Box>

    </Card>
  );
}