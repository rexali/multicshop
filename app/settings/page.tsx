"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SettingPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirm-password'),
    });
  };

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
            Change password
          </Typography>
          <Box component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="old-password"
              label="Old password"
              type="password"
              id="old-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="current-password"
              label="Current password"
              type="password"
              id="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm password"
              type="password"
              id="confirm-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='success'
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}