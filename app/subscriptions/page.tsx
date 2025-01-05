'use client'

import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubscriptionList from "./SubscriptionList";
import { getSubscriptionsAPI } from "./api/getSubscriptionsAPI";
import ReactPagination from "../../components/react-pagination";

export default function QoutesPage() {
  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  useEffect(() => {
    async function getData() {
      try {
        setData(await getSubscriptionsAPI(activePage));
      } catch (error) {
        console.warn(error); 
      }
     
    }
    getData();

  }, [activePage])

  
  if (!data.length) {
    <Container component={"main"} maxWidth="md" sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
      <Box textAlign={'center'}>No subscription(s) found</Box>
    </Container>
  }

  return (
    <Container component={'main'} sx={{ mt: 10 }}>
      <SubscriptionList subscriptions={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={data[0]?.totalSubscriptions}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) =>setActivePage(v)} />
      </Box>
    </Container>
  )
}
