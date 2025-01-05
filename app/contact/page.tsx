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
      <Box component={'div'} textAlign={'center'} ml={'auto'} mr={'auto'}>
        <Button
          type='button'
          size="large"
          fullWidth
          variant="contained"
          color='success'
          sx={{ p: 2, mt: 3, mb: 2, display: 'block' }}
          key={'share'}
          onClick={() => shareLink()}
          startIcon={<Share sx={{ color: "white" }}
          />}>Share this</Button>
        <Button
          type='button'
          size="large"
          fullWidth
          variant="contained"
          color='success'
          sx={{ p: 2, mt: 3, mb: 2, display: 'block' }}
          key={"email"}
          href="mailto:alybaba2009@gmail.com"
          startIcon={<Email sx={{ color: "white" }}
          />}>Email us</Button>
        <Button
          type='button'
          size="large"
          fullWidth
          variant="contained"
          color='success'
          sx={{ p: 2, mt: 3, mb: 2, display: 'block' }}
          key={"tel"} href="tel:08065899144"
          startIcon={<Phone sx={{ color: "white" }}
          />}>Call us</Button>
        <Button
          type='button'
          size="large"
          fullWidth
          variant="contained"
          color='success'
          sx={{ p: 2, mt: 3, mb: 2, display: 'block' }}
          key={"loc"}
          href="http://maps.google.com/?q=19 Almubarak Waqf Foundation, Guda Abdullahi Road, Farm Center, Kano State"
          startIcon={<Place sx={{ color: "white" }}
          />}>Locate us</Button>
      </Box><br />

      <Box>Or</Box><br />

      <Box
        component={'form'}
        onSubmit={handleSubmit}
        noValidate={false}
      >
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="title"
          label="Subject"
          type="default"
          id="title"
        />

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