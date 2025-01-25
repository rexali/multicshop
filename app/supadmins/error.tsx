'use client'

import Container from "@mui/material/Container";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <Container maxWidth={'md'} component={'main'} sx={{ minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ width: '100%' }}>Something went wrong</h2><br />
            <p style={{ width: '100%' }}>
                <button
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </p>
        </Container>
    )
}