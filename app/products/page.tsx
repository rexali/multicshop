'use client'

import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import ProductList from "./ProductList";
import ReactPagination from "../../components/react-pagination";
import { getProductsAPI } from "./api/getProductsAPI";
import Fallback from "../../components/common/fallback";
import { getCategoriesAPI } from "./api/getCategoriesAPI";
import DesktopProductCategories from "./DesktopProductCategories";
import { useMediaQuery } from "react-responsive";
import SearchInput from "../search/SearchInput";
import TopbarFilter from "./components/TopbarFilter";
import SidebarFilter from "./components/SidebarFilter";
import { getProducts } from "../../store/actions/app-actions";
import { AppContext } from "../../context/AppContext";


export default function ProductsPage() {

  const [activePage, setActivePage] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([]);
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
  const { dispatch } = React.useContext(AppContext);

  const getProductsData = React.useCallback(async () => {
    try {
      let products = await getProductsAPI(activePage);
      let categories = await getCategoriesAPI(activePage);
      dispatch(getProducts(products));
      setCategoryData(categories);
      setProducts(products);
    } catch (error) {
      console.warn(error);
    }
  }, [activePage, dispatch])


  const handleSetProducts = (value: any) => {
    setProducts(value)
  }


  useEffect(() => {
    getProductsData();
  });


  if (!products.length) {
    return <Fallback item={'No product found yet. Wait..'} />
  }


  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }} >
      <h3 style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
        Products <TopbarFilter handleSetProducts={handleSetProducts} activePage={activePage} />
      </h3>
      {<Box display={"flex"} justifyContent={'center'}><SearchInput /></Box>}
      <Box marginTop={4} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
        <Box>
          {!isMobile && <DesktopProductCategories categoryData={categoryData} />}
          {!isMobile && <SidebarFilter handleSetProducts={handleSetProducts} activePage={activePage} />}
        </Box>
        <ProductList products={products} role={''} refreshProducts={getProductsData} />
      </Box>
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={products[0]?.totalProducts}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
      <Toaster />
    </Container>
  )
}
