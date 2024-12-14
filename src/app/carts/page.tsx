'use client'

import { Container, Box } from "@mui/material";
import { useState, useContext, useCallback, useEffect } from "react";
import Fallback from "@/components/common/fallback";
import { AppContext } from "@/context/AppContext";
import { useAuth } from '@/hooks/use-auth';
import { getToken } from "@/utils/getToken";
import { getUserCartsAPI } from "../users/api/getUserCarts";
import { getCarts } from "@/store/actions/app-actions";
import { useRouter } from "next/navigation";
import { goToSavedLinkpath } from "@/utils/goToSavedLinkPath";
import CartList from "./CartList";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function CartPage() {

  const [activePage, setActivePage] = useState<number>(1);
  const { dispatch } = useContext(AppContext);
  const { user } = useAuth();
  const userId = user?._id || getToken('_id') as string;
  const [products, setProducts] = useState<Array<any>>([]);
  const router = useRouter();

  const getCartData = useCallback(async () => {
    if (userId) {
      try {
        let productsInCart = await getUserCartsAPI(userId, activePage);
        dispatch(getCarts(productsInCart));
        setProducts(productsInCart);
      } catch (error) {
        console.warn(error);
      }
    } else {
      router.push('/auth/signin?next=' + goToSavedLinkpath(activePage));
    }
  }, [activePage, dispatch, router, userId])

  useEffect(() => {

    getCartData();

  }, [getCartData, userId])


  if (!products?.length) {
    return <Fallback item={"No product in your cart yet"} />
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }} >
        <Box>Carts: {products[0]?.totalCarts}</Box>
        <CartList
          products={products}
          activePage={activePage}
          setActivePage={setActivePage}
          totalCarts={products[0]?.totalCarts}
          refreshCart={getCartData}
        />
      </Container>
    </ErrorBoundary>
  )
}
