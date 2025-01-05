
import React from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import Link from "next/link";

export default function PolicyTerms() {

    return (
        <Container component="main" maxWidth="lg" sx={{mt:2,mb:2}} style={{position:'relative', bottom:0, left:0, right:0}}>
            <Box>
                <Grid container spacing={1}>
                    <Grid xs={12} md={6} sx={{textAlign:"center"}}>
                        <Link
                            type="button"
                            color="success"
                            href={"/waqf/create"}
                            >
                            Privacy policy
                        </Link>
                    </Grid>
                    <Grid xs={12} md={6} sx={{textAlign:"center"}}>
                        <Link
                            type="button" 
                            color="success"
                            href={"/waqf/create"}
                        >
                            Terms and conditions
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
