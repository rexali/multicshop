'use client'

import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
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


export default function ProductsPage(props: any) {

  const [activePage, setActivePage] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([]);
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
  const { dispatch } = React.useContext(AppContext);

  const getProductsData = React.useCallback(async () => {
    try {
      let subdomain = props?.subdomain ?? "maindomain";
      let products = await getProductsAPI(activePage, subdomain);
      let categories = await getCategoriesAPI(activePage, subdomain);
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
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} item xs={12} sm={12} md={2} lg={2}>
          {!isMobile && <DesktopProductCategories categoryData={categoryData} />}
          {!isMobile && <SidebarFilter handleSetProducts={handleSetProducts} activePage={activePage} />}
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10}>
          <ProductList products={products} role={''} refreshProducts={getProductsData} />
        </Grid>
      </Grid>
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={products[0]?.totalProducts}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
