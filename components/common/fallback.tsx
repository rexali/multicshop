'use client'

import { Box, Container } from "@mui/material";

export default function Fallback(props: any) {

    return <Container maxWidth={'md'} component={'main'} sx={{ minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
        <Box textAlign={'center'}>
            {props.item ?? "Loading..."}
        </Box>
    </Container>
}
