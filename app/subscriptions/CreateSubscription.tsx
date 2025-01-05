"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useMediaQuery } from "react-responsive"
import { useState } from "react"
import { handleSubscribeSubmit } from "./utils/handleSubscribeSubmit"


export default function CreateSubscription() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
    const [loading, setLoading] = useState('');

    const handleSubmit = async (event: any) => {
        setLoading('Sending data..')
        await handleSubscribeSubmit(event, setSuccess, setError, setLoading)
    };

    return (
        <center>
            <Box component={"form"}
                sx={{ maxWidth: "lg", mt: 5 }}
                noValidate={false}
                onSubmit={handleSubmit}
            >
                <Box component={'h5'} textAlign={'center'}>Subscribe</Box>
                <Grid container columnSpacing={1} rowSpacing={1}>
                    <Grid item xs={12} md={6} sx={{ textAlign: isMobile ? "" : 'right' }} >
                        <TextField id="email" type="email" name="email" size="small" label="Subscribe to newsletter" placeholder="email" required />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: isMobile ? "" : 'left' }}>
                        <Button type="submit" variant="contained" size="large" color="success">Subscribe</Button>
                    </Grid>
                </Grid>
                {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}
                {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
                {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
            </Box>
        </center>
    )
}
