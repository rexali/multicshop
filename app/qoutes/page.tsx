'use client'

import { Box, Container } from "@mui/material";
import QouteList from "./QouteList";
import React, { useState, useEffect } from "react";
import { getQoutesAPI } from "./api/getQoutesAPI";

export default function QoutesPage() {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = React.useState(1);

  useEffect(() => {
    async function getData() {
      try {
        setData(await getQoutesAPI(activePage));
      } catch (error) {
        console.warn(error);
      }
     
    }
    getData();

  }, [activePage]);

  if (!data.length) {
    <Container component={"main"} maxWidth="md" sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
      <Box textAlign={'center'}>No qoute(s) found</Box>
    </Container>
  }

  return (
    <Container component={'main'} sx={{ mt: 10 }}>
      <QouteList qoutes={data} activePage={activePage} setActivePage={setActivePage} />
    </Container>
  )
}
