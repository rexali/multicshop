"use client"

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import { Alert } from '@mui/material';
import { confirmRegistrationAPI } from '../api/confirmRegistrationAPI';
import { Suspense, useState } from 'react'
import Fallback from "../../../components/common/fallback";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ConfirmRegistration() {
  const [result, setResult] = useState<any>({})
  const email = useSearchParams().get('email');
  const rcode = useSearchParams().get('rcode');


  // TO DO: verify that email and rCode match what are in the database
  React.useEffect(() => {
    //  send the rCode and email to database, to verify
    async function getConfirmed() {
      try {
        setResult(await confirmRegistrationAPI({ email, rcode }));
      } catch (error) {
        console.warn(error);
      }
    }
    getConfirmed();
  }, [email, rcode])

  return (
    <Suspense fallback={<Fallback />}>
      <ThemeProvider theme={defaultTheme} >
        <Container component="main" maxWidth="xs" sx={{
          minHeight: 410,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <CssBaseline />
          <Box>
            <Typography component="h1" variant="h5">
              {result.status === 'success' ? <Alert>Confirmation successful</Alert> : <Alert severity='warning'>Confirmation failed</Alert>}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </Suspense>
  );
}