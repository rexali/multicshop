'use client'

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import ProductList from "../products/ProductList";
import { getUserProductsAPI } from "./api/getUserProductsAPI";
import { getToken } from "../../utils/getToken";
import ReactPagination from "../../components/react-pagination";
import { useAuth } from "../../hooks/use-auth";

export default function UserProducts(props:any) {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const auth = useAuth();
  const userId = auth.user?._id || getToken('_id') as string;

  React.useEffect(() => {
    async function getData() {
      try {
        const products = await getUserProductsAPI(userId, activePage);
        setData(products);
      } catch (error) {
        console.warn(error);
        
      }

    }

    getData();

  }, [userId, activePage]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="lg">
        <Box textAlign={'center'}>No product(s) found</Box>
      </Container>
    )
  }
  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <ProductList products={data} activePage={activePage} setActivePage={setActivePage} role={'user'} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totalProducts}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
