import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactPagination from '@/components/react-pagination';
import Box from '@mui/material/Box';
import { getUsersOrdersAPI } from './api/getUsersOrders';


export default function UsersOrders() {
  const [data, setData] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(()=>{
       async function getData(){
        setData(await getUsersOrdersAPI(activePage));
       }
       getData();

  },[activePage])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Time&nbsp;</TableCell>
            <TableCell align="right">Total&nbsp;</TableCell>
            <TableCell align="right">Payment Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order: any) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="order">
                <link href={`mailto:${order.user.email}`}>{order.user.email}</link>
              </TableCell>
              <TableCell align="right">{order?.createdAt??'12-12-24'}</TableCell>
              <TableCell align="right">{order.total}</TableCell>
              <TableCell align="right">{order.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
      <Box sx={{ mr: "auto", ml: "auto", maxWidth: 100 }} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={data?.length}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </TableContainer>
  );
}