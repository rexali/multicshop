'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import { getToken } from "../../utils/getToken";
import { getUserHistoryAPI } from "./api/getUserHistory";
import TransactionList from "../transactions/TransactionList";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { useAuth } from "../../hooks/use-auth";

export default function UserHistory() {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const auth = useAuth();
  const userId = auth.user?._id as unknown as string || getToken('_id') as string;

  React.useEffect(() => {
    async function getData() {
      try {
        const transactions = await getUserHistoryAPI(userId, activePage);
      setData(transactions);
      } catch (error) {
        console.warn(error);
        
      }
      
    }

    getData();

  }, [userId, activePage]);
 
  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No transaction(s) found</Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
        <TransactionList transactions={data} />      
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
                <ReactPagination
                    activePage={activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={data[0]?.totalTransactions}
                    pageRangeDisplayed={5}
                    onchangeCallback={(v: any) => setActivePage(v)} />
            </Box>
    </Container>
  )
}