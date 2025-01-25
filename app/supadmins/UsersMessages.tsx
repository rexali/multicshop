'use client'

import * as React from "react";
import MessagesPage from "../messages/page";

export default function UserMessages(props:any) {

  return <MessagesPage role={'admin'} subdomain={props.subdomain} />
  
}
