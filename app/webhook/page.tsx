'use client'

import { getToken } from "../../utils/getToken";
import Container from "@mui/material/Container";
import React from "react";
import { verifyPayment } from "../payment/verifyPaymentAPI";
import { Alert } from "@mui/material";

export default function WebhookPage() {
   
    const [result, setResult] = React.useState()
    const reference = getToken("reference");
    // TO DO 1: use reference to query paystack
    // TO DO 2: send  result or support data to database transaction table

    React.useEffect(() => {
        (async () => {
            try {
                setResult(await verifyPayment(reference));       
            } catch (error) {
                console.warn(error);
                
            } 
        })();

    }, [reference])

    if (!result) {

        return (
            <Container
                component={'main'}
                maxWidth="md"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}
            >
                <Alert severity="warning">Transaction failed {result}</Alert>
            </Container>
        )
    }

    return (
        <Container
            component={'main'}
            maxWidth="md"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400, }}
        >
            <Alert>Transaction successful {result}</Alert>
        </Container>
    )
}
