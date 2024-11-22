'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import EditMessage from './edit-message';
import DeleleModal from '@/components/delete-modal';
import { deleteMessageAPI } from './api/deleteMessageAPI';
import Message from '@mui/icons-material/Message';
import { useMediaQuery } from 'react-responsive';

export default function MessageCard({
    message,
    role
}: { message: any, role:any }) {

    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });

    if (edit) {
        return <EditMessage callback={setEdit} message={message} />
    }

    return (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
            <CardContent  >
                <Typography gutterBottom variant="h5" component="div">
                    {message?.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    component={'a'}
                    href={`/messages/${message._id}`}
                    sx={{ textDecoration: 'none' }}
                >
                    {message?.message}
                </Typography>
                {role === 'admin' && <Typography sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {!isMobile && message.sender && <Link href={{
                        pathname: '/admins/messages',
                        query: { email: message.sender }
                    }} style={{ textDecoration: 'none' }}><Message /> Reply</Link>} 
                    {isMobile && message.sender && <Link href={`mailto:${message.sender}`} style={{ textDecoration: 'none' }}><Message /> Reply</Link>}
                    <Link href={'#'} style={{ textDecoration: 'none' }} onClick={() => setEdit(true)}><Edit /> Edit</Link>
                    <Link href={'#'} style={{ textDecoration: 'none' }} onClick={() => setOpen(true)}><DeleteForever /> Delete</Link>
                </Typography>}
            </CardContent>
            {open && <DeleleModal cb={() => deleteMessageAPI({ messageId: message._id })} closeCallback={setOpen} />}
        </Card>
    );
}