'use client'

import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import SubscriptionCard from "./SubscriptionCard";

export default function SubscriptionList(props: any) {

    return (
        <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
            {
                props.subscriptions?.map((subscription: any, index: any) =>
                    <Grid item xs={12} md={6} key={subscription._id + index}>
                        <SubscriptionCard subscription={{ ...subscription, id: index + 1 }} />
                    </Grid>
                )
            }
        </Grid>
    )

}