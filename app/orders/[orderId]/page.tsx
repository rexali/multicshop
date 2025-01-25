import { getOrderAPI } from "../../../app/supadmins/api/getOrderAPI";
import { SERVER_URL } from "../../../constants/url";
import { CardContent, Box, Typography, Container } from "@mui/material";
import Card from "@mui/material/Card";
import Link from "next/link";
import * as React from "react";

export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const data = await fetch(SERVER_URL + "/orders").then(res => res.json());
        return data.data.orders.map((order: any) => ({
            orderId: order._id
        }))
    } catch (error) {
        console.warn(error);
    }
}

export default async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
    const {orderId} = await params;
    let order: any
    try {
        order = await getOrderAPI(orderId) ?? {};
    } catch (error) {
        console.warn(error);
    }


    if (!Object.keys(order).length) {

        return (
            <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
                <Box textAlign={'center'}>No order found</Box>
            </Container>
        )
    }


    return (
        <Container sx={{ mt: 8 }} component={"main"} maxWidth="lg">
            <Card sx={{
                maxWidth: "100%",
                marginTop: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10
            }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    {
                        order.items.map((item: any, i: number) => (
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography gutterBottom fontSize={11} variant="body1" component="div">
                                        item  {i + 1}
                                    </Typography>
                                    <Typography gutterBottom fontSize={11} variant="body1" component="div">
                                        Item Qty: {item?.quantity}
                                    </Typography>
                                </Box>
                                <Typography gutterBottom fontSize={11} variant="body1" component="div">
                                    <Link href={'/products/' + item?.product}>View product</Link>
                                </Typography>
                                <Typography gutterBottom fontSize={11} variant="body1" component="div">
                                    Item Price:  N {item?.price}
                                </Typography>
                                <Typography gutterBottom fontSize={11} variant="body1" component="div">
                                    Sub-total:  N {item?.total}
                                </Typography>
                            </Box>
                        ))
                    }

                    <Box>
                        <Typography gutterBottom fontSize={11} variant="body1" component="div">
                            Email:  {order?.user?.email}
                        </Typography>

                        <Typography gutterBottom fontSize={11} variant="body1" component="div">
                            Total:  N {order?.total}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography gutterBottom fontSize={11} variant="body1" component="div">
                            Payment Status: {order?.paymentStatus}
                        </Typography>
                        <Typography gutterBottom fontSize={11} variant="body1" component="div">
                            Date:  {order?.createdAt}
                        </Typography>
                    </Box>

                </CardContent>
            </Card>
        </Container>
    )

}