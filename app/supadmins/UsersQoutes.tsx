'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";
import { getQoutesAPI } from "../qoutes/api/getQoutesAPI";
import QouteList from "../qoutes/QouteList";
import ReactPagination from "../../components/react-pagination";

export default function UsersQoutes(props:any) {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    async function getData() {
      try {
        const qoutes = await getQoutesAPI(activePage);
        setData(qoutes);
      } catch (error) {
        console.warn(error);
      }
      
    }

    getData();

  }, [activePage]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No qoutes yet</Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <Box>Total Qoutes: {data[0]?.totalQoutes}</Box>
        <QouteList qoutes={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totalQoutes}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
