'use client'

import { Container } from "@mui/material";
import ViewNotifcation from "../view-notification";
import { useNotification } from "../hooks/use-notification";

export default function NotificationPage({ params }: { params: { notificationId: any } }) {
    const { notification } = useNotification(params.notificationId);

    return (
        <Container component={'main'} maxWidth={'md'} sx={{minHeight:420,display: "flex", justifyContent: 'center', alignItems:"center" }}>
            <ViewNotifcation notification={notification} />
        </Container>)
}
