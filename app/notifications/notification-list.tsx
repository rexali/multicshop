'use client'

import * as React from "react";
import NotificationCard from "./notification-card";
import Grid from "@mui/material/Grid";

export default function NotificationList({ 
    notifications, 
    role,
    refreshNotifications
}: { notifications: any, role?:any,refreshNotifications?:any }) {

    return notifications.map((notification: any, index: any) =>
        <Grid item xs={12} md={6} key={notification._id+index}>
            <NotificationCard notification={notification} role={role} refreshNotifications={refreshNotifications} />
        </Grid>
    )
}