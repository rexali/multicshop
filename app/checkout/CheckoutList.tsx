'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAuth } from '../../hooks/use-auth';
import { getToken } from '../../utils/getToken';
import CheckoutForm from './CheckoutForm';
import CheckoutCard from './CheckoutCard';
import Box from '@mui/material/Box';


export default function CheckoutList(props: any) {
    const [cartTotal, setCartTotal] = React.useState<number>();
    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;

    let totalAmount = props.products
        .map((product: any) => Number(product.product_price) * Number(product.cartQuantity))
        .reduce((prev: any, cur: any) => {
            return prev + cur;
        }, 0); 

    const orderItems = props.products.map((product: any) => ({
        product: product._id,
        quantity: product.cartQuantity,
        price: product.product_price,
        total: parseInt(product.cartQuantity) * parseInt(product.product_price)
    }))

    const orderData = {
        userId: userId,
        items: orderItems,
        orderStatus: "pending",
        tax: 0,
        shippingCost: 0,
        subtotal: orderItems
            .map((item: any) => parseInt(item.price))
            .reduce((prev: any, cur: any) => {
                return prev + cur;
            }, 0)
        ,
        total: totalAmount,
        paymentStatus: "pending",
        shippingMethod: "GENERAL",
        subdomain:auth.user.subdomain
    };

    const transactionData = {
        userId: userId,
        orderId: "",
        amount: orderData.total,
        type: "payment", // tranfer, withdraw
        reference: "",
        currency: "NG",
        paymentMethod: "Paystack",
        subdomain:auth.user.subdomain
    }

    React.useEffect(() => {
        setCartTotal(totalAmount);
    }, [totalAmount])

    return (
        <Container>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item xs={12} md={8} sx={{ marginTop: 1 }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {props?.products?.map((product: any) => {
                            return <Grid key={product._id} item xs={12} md={6}><CheckoutCard product={product} /></Grid>
                        })}
                    </Grid>
                    <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>Total <span>&#x20A6; {cartTotal}</span></Box>
                </Grid>

                <Grid item xs={12} md={4} sx={{ marginTop: 1 }}>
                    <CheckoutForm
                        orderData={orderData}
                        transactionData={transactionData}
                        tax={0}
                        shippingMethod={'GENERAL'}
                        shippingCost={0}
                        cartTotal={cartTotal} />
                </Grid>
            </Grid>
        </Container>
    )
}
