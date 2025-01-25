'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import { getToken } from "../../utils/getToken";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { useAuth } from "../../hooks/use-auth";
import { getUserOrdersAPI } from "../users/api/getUserOrders";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import Link from "next/link";
import { orderStatusAPI } from "../supadmins/api/orderStatusAPI";

export default function UserOrders(props:any) {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const auth = useAuth();
  const userId = auth.user?._id || getToken('_id') as string;


  const getOrderData = React.useCallback(async () => {
    try {
      let orders = await getUserOrdersAPI(userId, activePage);
      setData(orders);
    } catch (error) {
      console.warn(error);
    }
  }, [activePage, userId]);


  React.useEffect(() => {
    getOrderData()
  }, [getOrderData]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No order(s) found</Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Pay Status</TableCell>
              <TableCell align="right">Ship Method</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order: any) => (
              <TableRow
                key={order._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{order?.orderStatus}</TableCell>
                <TableCell align="right">{order?.createdAt}</TableCell>
                <TableCell align="right">{order?.total}</TableCell>
                <TableCell align="right">{order?.paymentStatus}</TableCell>
                <TableCell align="right">{order?.shippingMethod}</TableCell>
                <TableCell align="center">
                  <Link href={'/orders/' + order._id}>View</Link>
                </TableCell>
                <TableCell align="center">
                  <Button
                    disabled={order.orderStatus === 'delivered' || order.orderStatus === 'shipped' || order.orderStatus === 'canceled' ? true : false}
                    size="small"
                    onClick={async () => {
                      await orderStatusAPI({ orderId: order?._id, orderStatus: 'canceled', paymentStatus: order?.paymentStatus === 'paid' ? 'Pay to be returned' : 'No pay to be returned' });
                      await getOrderData();
                    }}>
                    {order.orderStatus === 'canceled' ? 'Canceled' : 'Cancel'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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