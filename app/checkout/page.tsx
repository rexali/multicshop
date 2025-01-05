'use client'

import { Container, Box } from "@mui/material";
import { useState, useContext, useCallback, useEffect } from "react";
import Fallback from "../../components/common/fallback";
import { CheckoutListComponent } from "./CheckoutListComponent";
import { AppContext } from "../../context/AppContext";
import { useAuth } from '../../hooks/use-auth';
import { getToken } from "../../utils/getToken";
import { getUserCartsAPI } from "../users/api/getUserCarts";
import { getCarts } from "../../store/actions/app-actions";
import { useRouter } from "next/navigation";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function CheckoutPage() {

  const [activePage, setActivePage] = useState<number>(1);
  const { dispatch } = useContext(AppContext);
  const { user } = useAuth();
  const userId = user?._id as string || getToken('_id') as string;
  const [products, setProducts] = useState<Array<any>>([]);
  const router = useRouter();

  const getCartData = useCallback(async () => {
    try {
      let productsInCart = await getUserCartsAPI(userId, activePage);
      dispatch(getCarts([...productsInCart]));
      setProducts((c: any) => [...c, ...productsInCart]);
    } catch (error) {
      console.warn(error)
    }

  }, [activePage, dispatch, userId])

  useEffect(() => {
    getCartData();
  }, [getCartData])


  if (!products?.length) {
    return <Fallback item={"No product in your cart yet. Wait.."} />
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }} >
        <Box>Items: {products[0]?.totalCarts}</Box>
        <CheckoutListComponent
          products={products}
          activePage={activePage}
          setActivePage={setActivePage}
          totalCarts={products[0]?.totalCarts}
          refreshCart={() => getCartData()}
        />
      </Container>
    </ErrorBoundary>
  )
}
