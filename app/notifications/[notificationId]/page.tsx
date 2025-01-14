'use client'

import { Container } from "@mui/material";
import ViewNotifcation from "../view-notification";
import { useNotification } from "../hooks/use-notification";
import { useParams } from "next/navigation";

export default function NotificationPage() {
    const {notificationId} = useParams()
    const { notification } = useNotification(notificationId);

    return (
        <Container component={'main'} maxWidth={'md'} sx={{minHeight:420,display: "flex", justifyContent: 'center', alignItems:"center" }}>
            <ViewNotifcation notification={notification} />
        </Container>)
}
