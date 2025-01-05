'use client'

import * as React from "react";
import MessageCard from "./message-card";
import Grid from "@mui/material/Grid";

export default function MessageList({ messages, role, refreshMessages}: { messages: any, role:any,refreshMessages?:any}) {

    return messages?.map((message: any, index: any) =>
        <Grid item xs={12} md={6} key={message._id+index}>
            <MessageCard 
            message={message} 
            role={role}
            refreshMessages={refreshMessages} 
            />
        </Grid>
    )
}