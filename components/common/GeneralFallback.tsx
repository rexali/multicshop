'use client'

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';


export default function GeneralFallback() {

    return (
        <Container maxWidth={'lg'} component={'main'} sx={{ minHeight: 680, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={1}>
                <Skeleton variant="circular" animation="wave" width={40} height={40} />
                <Skeleton variant="rectangular" animation="wave" width={240} height={60} />
                <Skeleton variant="rounded" animation="wave" width={240} height={60} />
                <Skeleton variant="text" animation="wave" width={240} sx={{ fontSize: '2rem' }} />
                <Skeleton variant="text" animation="wave" width={240} sx={{ fontSize: '2rem' }} />
            </Stack>
        </Container>
    );
}