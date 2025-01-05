'use client'

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <html lang="en">
            <body>
                <Container maxWidth={'md'} component={'main'} >
                    <Box sx={{ minHeight: 420, display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Something went wrong</h2><br />
                        <p style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}><span>Name:</span> {error.name}</p><br />
                        <p style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}><span>Message:</span> {error.message}</p><br />
                        <Button
                            size="large"
                            variant='contained'
                            sx={{ display: 'block' }}
                            onClick={() => reset()}
                        >
                            Try again
                        </Button>
                    </Box>
                </Container>
            </body>
        </html>
    )
}