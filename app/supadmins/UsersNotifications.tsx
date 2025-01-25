'use client'

import * as React from "react";
import NotificationsPage from "../notifications/page";

export default function UsersNotifications(props:any) {

    return <NotificationsPage role='admin' subdomain={props.subdomain}/>
}
