"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../../components/common/copyright';
import { handleSignUpSubmit } from '../utils/handleSignUpSubmit';
import styles from "../styles/auth.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { SERVER_URL } from '../../../constants/url';
import { useDebouncedCallback } from 'use-debounce';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpBusiness() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = React.useState('');
    const [subdomain, setSubDomain] = React.useState('');
    const [name, setName] = React.useState('');
    const router = useRouter();
    const [isAvailable, setIsAvailable] = React.useState<any>();

    const handleSubmit = async (event: any) => {
        if (isAvailable) {
            handleSignUpSubmit(event, setError, setSuccess, setLoading, router)
        } else {
            event.preventDefault();
            setIsAvailable(false);
        }
    }

    const isSubdomainAvailable = async (subdomain: string) => {
        const { data } = await axios.get(`${SERVER_URL}/auth?subdomain=${subdomain}`);
        if (data.status === "success" && data.data.result) {
            setIsAvailable(false);
            // return false;
        } else {
            setIsAvailable(true);
            // return true;
        }
    }

    const handleCheckSubdomain = useDebouncedCallback(async (subdomain: string) => {
        await isSubdomainAvailable(subdomain)
    }, 500);

    const handleSetNameAndSubdomain = async (event: any) => {
        const { name, value } = event.target;
        setName(value)
        setSubDomain(value.trim().toLowerCase().split(' ').join(''));
        await handleCheckSubdomain(subdomain);
    }

    const handleSetSubdomain = async (event: any) => {
        const { name, value } = event.target;
        setSubDomain(value.trim().toLowerCase().split(' ').join(''));
        await handleCheckSubdomain(subdomain);
    }



    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate={false}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="business_name"
                                    fullWidth
                                    id="business_name"
                                    label="Business Name"
                                    type='text'
                                    autoFocus
                                    onChange={handleSetNameAndSubdomain}
                                    value={name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="subdomain"
                                    label="Subdomain"
                                    name="subdomain"
                                    type='text'
                                    autoComplete="family-name"
                                    value={subdomain}
                                    onChange={handleSetSubdomain}
                                />
                                <TextField size='small' fullWidth defaultValue={'.siniotech.com.ng'} disabled />

                                {isAvailable && isAvailable === true ? <Box sx={{ color: 'green' }}>It is available</Box> : isAvailable === false && <Box sx={{ color: 'red' }}>It is not available</Box>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type='email'
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {error && (<Box className={styles.formError} textAlign={'center'}>{error.toLowerCase()}</Box>)}
                                {success && (<Box className={styles.formSuccess} textAlign={'center'}>{success.toLowerCase()}</Box>)}
                                {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" name='remember_me' />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color='success'
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/auth/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider >
    );
}
