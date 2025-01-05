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
import RemoveIcon from '@mui/icons-material/Cancel';
import { handleUpdateNotificationAPI } from './api/handleUpdateNotificationAPI';
import { AppContext } from '../../context/AppContext';
import { getNotifications } from '../../store/actions/app-actions';
import { getNotificationsAPI } from './api/getNotificationsAPI';
import { getToken } from '../../utils/getToken';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme();

export default function EditNotification({ notification, callback }: { callback: any, notification: any }) {
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState('');
    const [title,] = React.useState(notification.title);
    const [body,] = React.useState(notification.body);
    const [notificationId,] = React.useState(notification._id);
    const { dispatch } = React.useContext(AppContext);
    const auth = useAuth();
    const userId = auth.user?._id as unknown as string || getToken('_id') as string;
    const router = useRouter()

    const handleSubmit = async (event: any) => {
        setLoading('Sending data..')
        await handleUpdateNotificationAPI(event, setSuccess, setError, setLoading, userId);
        dispatch(getNotifications(await getNotificationsAPI()));
        router.refresh();
    };

    return (
        <ThemeProvider theme={defaultTheme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span>Edit notification</span>
                        <span onClick={() => callback(false)}><RemoveIcon /></span>
                    </Typography>
                    <Box
                        component="form"
                        noValidate ={false}
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id="notificationId"
                            name="notificationId"
                            defaultValue={notificationId}
                            hidden
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            defaultValue={title}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            name="body"
                            defaultValue={body}
                            label="Message"
                            type="text"
                            id="body"
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
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}