'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { updateCartAPI } from './api/updateCartAPI';
import { SERVER_URL } from '../../constants/url';
import { useAuth } from '../../hooks/use-auth';
import { getToken } from '../../utils/getToken';
import { deleteUserCartAPI } from './api/deleteUserCartAPI';
import { AppContext } from '../../context/AppContext';
import CardImage from '../products/components/CardImage';

export default function CartCard({ product, refreshCart }: { product: any, refreshCart: any }) {
  const [quantity, setQuantity] = React.useState<number>(product?.cartQuantity ?? 0);
  const { dispatch } = React.useContext(AppContext)
  const auth = useAuth();
  const userId = auth.user?._id || getToken('_id') as string;

  var range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  
  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
        <Link href={"/products/" + product._id}>
          {product.product_pictures?.length ?
            <CardImage
              src={`${SERVER_URL}/uploads/${product.product_pictures[0]}`}
              alt={product.product_name}
              width={170}
              height={170}
              style={{
                borderRadius: 20,
              }}
            />
            :
            <CardImage
              src={"https://placehold.co/600x400/orange/white"}
              alt={'photo'}
              width={170}
              height={170}
              style={{
                borderRadius: 20,
              }}
            />
          }
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.product_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {product?.cartQuantity} x  &#x20A6; {product?.product_price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Button size="small" onClick={
          async () => {
            try {
              const cartDelete = await deleteUserCartAPI(product.cartId, userId);
              await refreshCart();
            } catch (error) {
              console.warn(error);
            }

          }
        }>Remove</Button>
        <label>Qty: <span style={{ marginRight: 2 }}>{quantity} </span>
          <select onChange={
            async (evt: any) => {
              const { value } = evt.target;
              setQuantity(value);
              try {
                let cartUpdate = await updateCartAPI({
                  _id: product.cartId,
                  product_id: product._id,
                  user_id: userId,
                  quantity: value,
                  price: product.product_price
                });
                await refreshCart();
              } catch (error) {
                console.warn(error);
              }

            }
          }>
            {range(0, Number(product?.product_quantity ?? 1)).slice(0, 10).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
      </CardActions>
    </Card>
  );
}