'use client'

import * as React from "react";
import Grid from "@mui/material/Grid";
import TransactionCard from "./TransactionCard";

export default function TransactionList(props: any) {

    return (
       
        <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
            {
                props.transactions?.map((transaction: any, index: any) =>
                    <Grid item xs={12} md={6} key={transaction._id + index}>
                        <TransactionCard transaction={transaction} />
                    </Grid>

                )
            }
        </Grid>
    )

}