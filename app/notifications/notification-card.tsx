'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import Link from 'next/link';
import EditNotification from './edit-notification';
import DeleleModal from '../../components/delete-modal';
import { deleteNotificationAPI } from './api/deleteNotificationAPI';

export default function NotificationCard({
    notification,
    role,
    refreshNotifications
}: { notification: any, role?: any,  refreshNotifications?:any }) {

    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    if (edit) {
        return <EditNotification callback={setEdit} notification={notification} />
    }

    return (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    {notification?.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    component={'a'}
                    href={`/notifications/${notification._id}`}
                    sx={{ textDecoration: 'none' }}
                >
                    {notification?.body}
                </Typography>
                {role === 'admin' && <Typography sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Link href={''} style={{ textDecoration: 'none' }} onClick={() => setEdit(true)} ><Edit /> Edit</Link>
                    <Link href={''} style={{ textDecoration: 'none' }} onClick={() => setOpen(true)}><DeleteForever /> Delete</Link>
                </Typography>}
            </CardContent>
            {open && <DeleleModal
                cb={async () => await deleteNotificationAPI({ notificationId: notification._id })}
                closeCallback={setOpen}
                refreshCallback={refreshNotifications}
            />}

        </Card>
    );
}