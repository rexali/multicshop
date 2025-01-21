"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/common/copyright';
import { handleMessageSubmit } from '../messages/utils/handleMessageSubmit';
import Share from "@mui/icons-material/Share";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import { shareLink } from "../../utils/shareLink";
import { useAuth } from '../../hooks/use-auth';
import { getToken } from '../../utils/getToken';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from "react-responsive";
import Grid from '@mui/material/Grid';

export default function ContactPage() {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const auth = useAuth();
  const userId = auth.user._id || getToken('_id') as string;
  const router = useRouter();
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const {
      title,
      comment
    } = event.target.elements;
    if (isMobile) {
      router.push(`mailto:siniotech@gmail.com?subject=${title.value}&body=${comment.value}`);
    } else {
      setLoading('Sending data..');
      await handleMessageSubmit(event, setSuccess, setError, setLoading, userId);
    }

  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: 8
    }}>
      <Typography component="h1" variant="h5" textAlign={'center'}>
        Contact us
      </Typography>

      <Box
        component={'form'}
        onSubmit={handleSubmit}
        noValidate={false}
      >
        <Grid container rowSpacing={1} columnSpacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {!isMobile && < TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type='email'
              autoComplete="email"
              autoFocus
            />}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {!isMobile && <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="default"
              id="firstName"
            />
            }
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            {!isMobile && <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="default"
              id="lastName"
            />
            }
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Subject"
              type="default"
              id="title"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="comment"
              label="Message"
              type='default'
              id="comment"
              multiline
            />
          </Grid>
        </Grid>

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
  );
}