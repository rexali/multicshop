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
        <Container maxWidth={'md'} component={'main'} >
            <Box sx={{ minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <h2>Something went wrong</h2><br />
                <Button
                    sx={{ display: 'block' }}
                    onClick={() => reset()}
                >
                    Try again
                </Button>
            </Box>
        </Container>
    )
}