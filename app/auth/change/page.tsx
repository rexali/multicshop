"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import styles from "../../../styles/app.module.css"
import { handleChangePasswordSubmit } from '../utils/handleChangePasswordSubmit';
import Fallback from '../../../components/common/fallback';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ChangePassword() {
  const rcode = useSearchParams().get('rcode') as string;
  const email = useSearchParams().get('email') as string;
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState('');

  const handleSubmit = async (event: any) => {
    // give user feedback
    setLoading("Sending data...");
    try {
      await handleChangePasswordSubmit(event, email, rcode, setSuccess, setError, setLoading)
    } catch (error) {
      console.warn(error);
    }

  }

  return (
    <React.Suspense fallback={<Fallback />}>
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
              Change password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="old_password"
                label="Old Password"
                type="password"
                id="old_password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="current_password"
                label="Current Password"
                type="password"
                id="current_password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
              />
              {error && (<Box className={styles.formError} textAlign={'center'}>{error.toUpperCase()}</Box>)}
              {success && (<Box className={styles.formSuccess} textAlign={'center'}>{success.toUpperCase()}</Box>)}
              {loading && (<Box className={styles.formSuccess} textAlign={'center'}>{loading.toUpperCase()}</Box>)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Suspense>
  );
}