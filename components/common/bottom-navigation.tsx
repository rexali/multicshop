'use client'

import React from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import Link from "next/link";

export default function BottomNavigation() {

    const pages = [
        "Home",
        "About",
        "Services",
        "Contact",
        "News",
        "Site map",
        "Privacy policy",
        "Terms and Conditions"
    ];

    const renderGridItems = pages.map((page, index) => (<Grid xs={12} md={6} sx={{ textAlign: "center" }} key={index}>
        <Link
            type="button"
            color="success"
            href={`${page === "Waqf" ? "/waqfs" : page === "Home" ? "/" : page === "Privacy policy" ? "/privacy" : page === 'Site map' ? "/sitemap" : page === "Terms and Conditions" ? "/terms" : "/" + page.toLocaleLowerCase()}`}
        >
            {page}
        </Link>
    </Grid>))

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 8 }} >
            <Box sx={{ position: "relative", bottom: 0, left: 0, right: 0, m: 1, }}>
                <Grid container spacing={1}>
                    {renderGridItems}
                </Grid>
            </Box>
        </Container>
    )
}
