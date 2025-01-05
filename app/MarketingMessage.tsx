'use client'

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"

export default function MarketingMessage() {

  return (
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: 2
    }}>
      <Paper>
        <Typography sx={{ padding: 2, textAlign: "center", fontWeight: 'bold' }}>
          Want to get good value and price for any item you order?
        </Typography>
      </Paper>
      <br />
      <Typography sx={{ textAlign: "center", }}>
        Let Cshop help you today. We provide individuals, organisations and companies with all the products they need.
      </Typography>
    </Box>
  )
}
