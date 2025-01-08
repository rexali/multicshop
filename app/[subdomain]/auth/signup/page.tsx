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
import Copyright from '../../../../components/common/copyright';
import { handleSignUpSubmit } from '../../../auth/utils/handleSignUpSubmit'; //'../../auth/utils/handleSignUpSubmit';
import styles from "../../../auth/styles/auth.module.css";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default async function SubSignUpPage(props: any) {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = React.useState('');
    const router = useRouter();
    const { subdomain } = useParams();

    const handleSubmit = async (event: any) => {
        setLoading('Sending data..');
        handleSignUpSubmit(event, setError, setSuccess, setLoading, router, subdomain)
    };

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
                                    name="first_name"
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    type='text'
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    type='text'
                                    required
                                />
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
        </ThemeProvider>
    );
}
