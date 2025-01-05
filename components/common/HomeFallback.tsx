'use client'

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function HomeFallback() {
  return (
    <Box sx={{ minHeight: 580, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color='success' />
    </Box>
  );

}
