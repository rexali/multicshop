'use client';

import { getToken } from "../../../utils/getToken";
import { Alert, Box, Container } from "@mui/material";
import Link from "next/link";

export default function ThankYouPage() {

    return (
        <Container maxWidth="md" component={'main'} sx={{ mt: 10, minHeight: 450, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Box sx={{ textAlign: "center" }}>Thank You</Box><br />
                <Alert color="success">Payment successfull</Alert><br />
                {getToken('role') as string === 'admin' && <Box sx={{ textAlign: "center" }}><Link href={"/admins"}>Go back</Link></Box>}
                {getToken('role') as string !== 'admin' && <Box sx={{ textAlign: "center" }}><Link href={"/"}>Go back</Link></Box>}
            </Box>
        </Container>
    )
}
