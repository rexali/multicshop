'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import ProductList from "../products/ProductList";
import { getToken } from "../../utils/getToken";
import Fallback from "../../components/common/fallback";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../hooks/use-auth";
import { useUserCarts } from "../carts/hooks/useUserCarts";

export default function UserCarts(props: any) {
  const [activePage, setActivePage] = React.useState<number>(1);
  const { dispatch } = React.useContext(AppContext);

  const { user } = useAuth();
  const userId = user?._id || getToken('_id') as string; 
  const { carts } = useUserCarts(userId, dispatch, activePage); 

  if (!carts?.length) {
    return <Fallback item={"No product in your cart yet"} />
  }

  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 8}}>
      <React.Suspense fallback={<Fallback />} >
        <ProductList products={carts} />
      </React.Suspense>
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={carts[0]?.totalCarts}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
