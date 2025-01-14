'use client'

import { Container } from "@mui/material";
import ViewMessage from "../view-message";
import { useMessage } from "../hooks/use-message";
import { useParams } from "next/navigation";

export default function MessagePage() {
     const {messageId} = useParams()
    const { message } = useMessage(messageId);

    return (
        <Container component={'main'} maxWidth={'md'} sx={{minHeight:420, display: "flex", justifyContent: 'center', alignItems:"center" }}>
            <ViewMessage message={message} />
        </Container>)
}
