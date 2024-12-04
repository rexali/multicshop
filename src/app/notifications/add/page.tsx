"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '@/components/common/copyright';
import { handleNotificationSubmit } from '../utils/handleNotificationSubmit';
import { getToken } from '@/utils/getToken';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddNotification() {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState('');

  const userId = getToken('_id') as string;

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Typography component="h1" variant="h5">
          Post Notice
        </Typography>

        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component={'form'}
          onSubmit={async (evt: any) => {
            setLoading('Sending data..')
            await handleNotificationSubmit(evt, setSuccess, setError, setLoading, userId)
          }
          }
          noValidate
        >

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="given_title"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="body"
            label="Message"
            type="default"
            id="body"
            autoComplete="given_body"
            multiline
          />

          {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
          {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
          {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='success'
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}