'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import { getToken } from "../../utils/getToken";
import { getUserOrdersAPI } from "./api/getUserOrders";
import OrderList from "../orders/OrderList";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { useAuth } from "../../hooks/use-auth";

export default function UserOrders() {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const auth = useAuth();
  const userId = auth.user?._id as unknown as string || getToken('_id') as string;

  React.useEffect(() => {
    async function getData() {
      try {
        let orders = await getUserOrdersAPI(userId, activePage);
        setData(orders);
      } catch (error) {
        console.warn(error);
        
      }

    }

    getData();

  }, [userId, activePage]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No order(s) found</Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <OrderList orders={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totalOrders}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}