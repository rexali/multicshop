import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactPagination from '../../components/react-pagination';
import Box from '@mui/material/Box';
import { getUsersOrdersAPI } from './api/getUsersOrders';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { Button } from '@mui/material';
import { orderStatusAPI } from './api/orderStatusAPI';


export default function UsersOrders(props:any) {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const getOrderData = React.useCallback(async () => {
    try {
      let orders = await getUsersOrdersAPI(activePage)
      setData(orders);
    } catch (error) {
      console.warn(error);
    }
  }, [activePage])

  React.useEffect(() => {
    getOrderData();
  }, [getOrderData])

  if (!data?.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No order(s) found</Box>
      </Container>
    )
  }

  return (
    <Box>
      <Box>Total Orders: {data[0]?.totalOrders}</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User&apos;s email</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Total(&#x20A6;)</TableCell>
              <TableCell align="right">Pay Status</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="center" colSpan={4}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order: any) => (
              <TableRow
                key={order._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="order">
                  <Link href={`mailto:${order?.user?.email}`}>{order?.user?.email}</Link>
                </TableCell>
                <TableCell align="right">{order?.orderStatus}</TableCell>
                <TableCell align="right">{order?.createdAt?.split('T')[0]}</TableCell>
                <TableCell align="right">{order?.total}</TableCell>
                <TableCell align="right">{order?.paymentStatus}</TableCell>
                <TableCell align="right">
                  <Link href={'/orders/' + order._id}>View</Link>
                </TableCell>
                <TableCell align="right">
                  <TableCell align="right">
                    <Button
                      size='small'
                      disabled={order.orderStatus === 'returned' || order.orderStatus === 'delivered' || order.orderStatus === 'shipped' ? true : false}
                      sx={{ m: 1, }}
                      onClick={async () => {
                        await orderStatusAPI({
                          orderId: order?._id,
                          orderStatus: 'shipped',
                          paymentStatus: 'paid'
                        });
                        await getOrderData();
                      }}>
                      <span style={{ fontSize: 12 }}>{
                        order.orderStatus === 'pending' ? 'Ship' : 'Shipped'
                      }</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={order.orderStatus === 'pending' || order.orderStatus === 'returned' || order.orderStatus === 'delivered' ? true : false}
                      size='small'
                      sx={{ m: 1 }}
                      onClick={async () => {
                        await orderStatusAPI({
                          orderId: order?._id,
                          orderStatus: 'delivered',
                          paymentStatus: 'paid'
                        });
                        await getOrderData();
                      }}>
                      <span style={{ fontSize: 12 }}>{
                        order.orderStatus === 'shipped' ? 'Deliver' : 'Delivered'
                      }</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={order.orderStatus === 'pending' || order.orderStatus === 'shipped' || order.orderStatus === 'returned' ? true : false}
                      size='small'
                      sx={{ m: 1 }}
                      onClick={
                        async () => {
                          await orderStatusAPI({
                            orderId: order?._id,
                            orderStatus: 'returned',
                            paymentStatus: 'reversed'
                          });
                          await getOrderData();
                        }}>
                      <span style={{ fontSize: 12 }}>{
                        order.orderStatus === 'delivered' ? 'Return' : 'Returned'
                      }</span>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={order.orderStatus === 'canceled' ? true : false}
                      size="small"
                      onClick={async () => {
                        await orderStatusAPI({
                          orderId: order?._id,
                          orderStatus: 'canceled',
                          paymentStatus: order.paymentStatus
                        });
                        await getOrderData();
                      }}>
                      {order.orderStatus === 'canceled' ? 'Canceled' : 'Cancel'}
                    </Button>
                  </TableCell>
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
    </Box>
  );
}