'use client'

import React from "react"
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Share from "@mui/icons-material/Share";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import SMS from "@mui/icons-material/Sms";
import Whatsapp from "@mui/icons-material/WhatsApp";


import { useMediaQuery } from "react-responsive";
import { shareLink } from "../../utils/shareLink";


export default function BottomNavbar() {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 5, }} >
            {isMobile && <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'white'
            }}>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2, display: "block" }} key={'share'} onClick={() => shareLink()} startIcon={<Share sx={{ color: "green" }} />}></Button>
                    <span style={{ fontSize: 10, display: "block" }}>Share</span>
                </Box>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2, display: "block" }} key={"email"} href="mailto:alybaba2009@gmail.com" startIcon={<Email sx={{ color: "green" }} />}></Button>
                    <span style={{ fontSize: 10, display: "block" }}>Email</span>
                </Box>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2 }} key={"tel"} href="tel:08065899144" startIcon={<Phone sx={{ color: "green" }} />}></Button><br />
                    <span style={{ fontSize: 10 }}>Tel</span>
                </Box>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2 }} key={"sms"} href="sms://08065899144" startIcon={<SMS sx={{ color: "green" }} />}></Button><br />
                    <span style={{ fontSize: 10 }}>SMS</span>
                </Box>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2 }} key={"sms"} href="https://wa.me/+2347016807004?text=Hi" startIcon={<Whatsapp sx={{ color: "green" }} />}></Button><br />
                    <span style={{ fontSize: 10 }}>Whatsapp</span>
                </Box>
                <Box textAlign={'center'}>
                    <Button sx={{ pl: 2, pr: 2 }} key={"loc"} href="http://maps.google.com/?q= 19 Almubarak Waqf Foundation, Guda Abdullahi Road, Farm Center, Kano State" startIcon={<Place sx={{ color: "green" }} />}></Button><br />
                    <span style={{ fontSize: 10 }}>Map</span>
                </Box>
            </Box>
            }
        </Container>
    )
}
