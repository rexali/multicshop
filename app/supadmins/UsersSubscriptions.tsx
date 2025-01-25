'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";
import { getSubscriptionsAPI } from "../subscriptions/api/getSubscriptionsAPI";
import SubscriptionList from "../subscriptions/SubscriptionList";
import ReactPagination from "../../components/react-pagination";

export default function UsersSubscriptions() {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    async function getData() {
      try {
        const subscriptions = await getSubscriptionsAPI(activePage);
        setData(subscriptions);
      } catch (error) {
        console.warn(error);  
      }

    }

    getData();

  }, [activePage]);

  if (!data?.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No subscriptions yet</Box>
      </Container>
    )
  }

  return (
  <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <Box>Total Subscriptions: {data[0]?.totalSubscriptions}</Box>
        <SubscriptionList subscriptions={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totalSubscriptions}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>)

}
