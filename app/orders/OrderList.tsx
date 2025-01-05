'use client'

import * as React from "react";
import Grid from "@mui/material/Grid";
import OrderCard from "./OrderCard";

export default function OrderList(props: any) {

    return (
        <div>
            {
                props.orders?.map((order: any, index: any) =>
                    <Grid item xs={12} md={6} key={order._id + index}>
                        <OrderCard order={order} />
                    </Grid>
                )
            }
        </div>
    )

}