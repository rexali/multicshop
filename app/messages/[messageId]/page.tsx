'use client'

import { Container } from "@mui/material";
import ViewMessage from "../view-message";
import { useMessage } from "../hooks/use-message";

export default function MessagePage({ params }: { params: { messageId: any } }) {
    const { message } = useMessage(params.messageId);

    return (
        <Container component={'main'} maxWidth={'md'} sx={{minHeight:420, display: "flex", justifyContent: 'center', alignItems:"center" }}>
            <ViewMessage message={message} />
        </Container>)
}
