'use client'

import * as React from 'react'
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" marginTop={4} style={{ position: 'relative', bottom: 0, left: 0, right: 0 }} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/" style={{ textDecoration: 'none' }}>
        www.cshop.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}