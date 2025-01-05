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
import Copyright from '../../../components/common/copyright';
import styles from "../../../styles/app.module.css"
import { handleLoginSubmit } from '../utils/handleLoginSubmit';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const defaultTheme = createTheme();

export default function SignIn() {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const params = useSearchParams();
  const router = useRouter();
  let next = params.get('next');

  const handleSubmit = (event: any) => {
    // give user feedback
    setLoading("Sending data...");
    handleLoginSubmit(event, setSuccess, setError, setLoading, router,next)
  }

  return (
    <ThemeProvider theme={defaultTheme} >
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
            Sign in
          </Typography>
          <Box component="form"
            onSubmit={handleSubmit}
            noValidate ={false} 
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
            />
            {error && (<Box className={styles.formError} textAlign={'center'}>{error.toUpperCase()}</Box>)}
            {success && (<Box className={styles.formSuccess} textAlign={'center'}>{success.toUpperCase()}</Box>)}
            {loading && (<Box className={styles.formSuccess} textAlign={'center'}>{loading.toUpperCase()}</Box>)}
            <FormControlLabel
              control={
                <Checkbox
                  // onChange={ (evt)=>handleCheckbox(evt) }  
                  color="primary" />
              }
              label="Remember me"
              name='remeber_me'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='success'
              disabled={!loading ? false : true}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/auth/forget" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
