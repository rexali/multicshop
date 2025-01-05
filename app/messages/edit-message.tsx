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
import Cancel from '@mui/icons-material/Cancel';
import { handleUpdateMessageAPI } from './api/handleUpdateMessageAPI';
import { AppContext } from '../../context/AppContext';
import { getMessages } from '../../store/actions/app-actions';
import { getMessagesAPI } from './api/getMessagesAPI';
import { getToken } from '../../utils/getToken';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme();

export default function EditMessage({ message, callback }: { message: any, callback: any }) {
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState('');
    const [firstName,] = React.useState(message.firstName ?? '');
    const [lastName,] = React.useState(message.lastName ?? '');
    const [email,] = React.useState(message.sender ?? '');
    const [messageId,] = React.useState(message._id);
    const [title,] = React.useState(message.title);
    const [comment,] = React.useState(message.comment);
    const { dispatch } = React.useContext(AppContext);

    const auth = useAuth();
    const userId = auth.user?._id as unknown as string || getToken('_id') as string;
    const router = useRouter()


    const handleSubmit = async (event: any) => {
        setLoading('Sending data..')
        await handleUpdateMessageAPI(event, setSuccess, setError, setLoading, userId);
        dispatch(getMessages(await getMessagesAPI()));
        router.refresh();
    };

    return (
        <ThemeProvider theme={defaultTheme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span>Edit Message</span>
                        <span onClick={() => callback(false)}><Cancel /></span>
                    </Typography>
                    <Box
                        component="form"
                        noValidate ={false}
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id="firstName"
                            name='firstName'
                            defaultValue={firstName}
                            hidden
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            defaultValue={lastName}
                            hidden
                        />
                        <TextField
                            id="messageId"
                            name="messageId"
                            defaultValue={messageId}
                            hidden
                        />
                        <TextField
                            id="email"
                            name="email"
                            defaultValue={email}
                            hidden
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Subject"
                            name="title"
                            defaultValue={title}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            name="comment"
                            defaultValue={comment}
                            label="Message"
                            type="text"
                            id="comment"
                        />
                        {success && <Box textAlign={'center'} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
                        {error && <Box textAlign={'center'} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
                        {loading && <Box textAlign={'center'} sx={{ color: "red" }}>{loading.toUpperCase()}</Box>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color='success'
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}