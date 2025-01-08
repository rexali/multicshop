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
import { getUsersHistoryAPI } from './api/getUsersHistory';
import Container from '@mui/material/Container';
import Link from 'next/link';

export default function UsersTransactions(props:any) {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    async function getData() {
      try {
        setData(await getUsersHistoryAPI(activePage));
      } catch (error) {
        console.error(error);
      }

    }
    getData();

  }, [activePage]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No transaction(s) found</Box>
      </Container>
    )
  }

  return (
    <Box>
      <Box>Total Transactions: {data[0]?.totalTransactions}</Box>
      <Box>Total Amount: {data[0]?.totalAmount}</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Amount(&#x20A6;)</TableCell>
              <TableCell align="right">Pay Method</TableCell>
              <TableCell align="right">Ref</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">View</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((transaction: any) => (
              <TableRow
                key={transaction._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                < TableCell align="right">{transaction?.type}</TableCell>
                <TableCell align="right">{transaction?.createdAt?.split('T')[0]}</TableCell>
                <TableCell align="right">{transaction.currency}</TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.paymentMethod}</TableCell>
                <TableCell align="right">{transaction.reference?.slice(0,10)}</TableCell>
                <TableCell align="right">{transaction.order?.paymentStatus}</TableCell>
                <TableCell align="right">
                  <Link href={`mailto:${transaction?.user?.email}`}>{transaction?.user?.email}</Link>
                </TableCell>
                <TableCell align="right">
                  <Link href={'/orders/' + transaction?.order?._id}>View order</Link>
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
          totalItemsCount={data[0]?.totalTransactions}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Box>
  );
}