"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleForgetPasswordSubmit } from '../utils/handleForgetPasswordSubmit';
import styles from "../../../styles/app.module.css"
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgetPassword() {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');

  const handleSubmit = async (event: any) => {
    // give user feedback
    setLoading("Sending data...");
    try {
      await handleForgetPasswordSubmit(event, setSuccess, setError, setLoading)
    } catch (error) {
      console.warn(error);
    }
   
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
          <Typography component="h1" variant="h5">
            Forget password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type='email'
              placeholder='enter email'
              autoFocus
            />
            {error && (<Box className={styles.formError} textAlign={'center'}>{error.toUpperCase()}</Box>)}
            {success && (<Box className={styles.formSuccess} textAlign={'center'}>{success.toUpperCase()}</Box>)}
            {loading && (<Box className={styles.formSuccess} textAlign={'center'}>{loading.toUpperCase()}</Box>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='success'
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}