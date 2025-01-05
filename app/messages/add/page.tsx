"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { handleMessageSubmit } from '../utils/handleMessageSubmit';
import { useAuth } from '../../..//hooks/use-auth';

const defaultTheme = createTheme();

export default function AddMessage() {
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState('');
    const auth = useAuth();
    const userId = auth.user._id;
    
  const handleSubmit = async (event: any) => {
    setLoading('Sending data..')
    await handleMessageSubmit(event, setSuccess, setError,setLoading, userId);
  }

    return (
        <ThemeProvider theme={defaultTheme} >
            <Container component="main" maxWidth="md">
                {/* <CssBaseline /> */}

                    <Typography component="h1" variant="h5" textAlign={'center'}>
                        Post Message
                    </Typography>
                    <Box
                     sx={{
                        mt: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                        component={'form'}
                        noValidate={false}
                        onSubmit={handleSubmit}
                    
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Subject"
                            name="title"
                            type="text"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            name="comment"
                            label="Message"
                            type="text"
                            id="comment"
                        />
                        {success && <Box textAlign={'center'} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
                        {error && <Box textAlign={'center'} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
                        {loading && <Box textAlign={'center'} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color='success'
                        >
                            Send
                        </Button>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}