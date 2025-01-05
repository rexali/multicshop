'use client'

import * as React from "react";
import Grid from "@mui/material/Grid";
import QouteCard from "./QouteCard";

export default function QouteList(props: any) {

    return (
        <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
            {
                props.qoutes?.map((qoute: any, index: any) =>
                    <Grid item xs={12} md={6} key={qoute._id + index}>
                        <QouteCard qoute={qoute} />
                    </Grid>
                )
            }
       </Grid>
    )

}