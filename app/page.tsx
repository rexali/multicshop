'use client';

import React, { useCallback, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MarketingMessage from './MarketingMessage';
import FAQHowItWorks from './FAQHowItWorks';
import Copyright from '../components/common/copyright';
import CreateSubscription from "./subscriptions/CreateSubscription";
import Testimonials from './testimonials';
import Portfolios from './portfolios';
import Team from './team';
import Partners from './partners';
import Link from 'next/link';
import Box from '@mui/material/Box';
import ProductCategories from './products/ProductCategory';
import ErrorBoundary from '../components/ErrorBoundary';
import Container from '@mui/material/Container';
import FeaturedProductList from './products/FeaturedProductList';
import PopularProductList from './products/PopularProductList';
import NewProductList from './products/NewProductList';
import RecommendedProductList from './products/RecommendedProductList';
import { Grid } from '@mui/material';
import { Toaster } from 'sonner';
import SearchProduct from '../components/SearchProduct';
import { SidebarProductCategories } from './products/SidebarProductCategories';
import { getInitialDataAPI } from './api/getInitialDataAPI';
import { AppContext } from '../context/AppContext';
import { getInitialData } from '../store/actions/app-actions';
import HomeFallback from '../components/common/HomeFallback';

export default function AppPage(props: any) {

  const subdomain = props.subdomain ?? "maindomain"
  const [data, setData] = useState<any>({});
  const { dispatch } = useContext(AppContext)

  const getData = useCallback(async () => {
    try {
      let data = await getInitialDataAPI(subdomain);
      dispatch(getInitialData(data))
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }, [subdomain])

  React.useEffect(() => {
    getData();
  })

  if (!Object.keys(data).length) {
    return <HomeFallback />
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }} >
        {/* <CssBaseline /> */}
        <SearchProduct />
        <ProductCategories categoryData={data?.categoryData} />
        <MarketingMessage /> <br />
        <Grid container rowSpacing={1} columnSpacing={4}>
          <Grid sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} item xs={12} sm={12} md={2} lg={2}>
            <SidebarProductCategories categoryData={data?.categoryData} />
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Box>
              <Box marginTop={2} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
                <span>Featured</span>
                <Link
                  style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                  type="button"
                  color="success"
                  href={`/products`}
                >
                  View all
                </Link>
              </Box>
              <FeaturedProductList products={data?.featuredData} />

              <Box marginTop={2} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
                <span>Popular</span>
                <Link
                  style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                  type="button"
                  color="success"
                  href={`/products`}
                >
                  View all
                </Link>
              </Box>
              <PopularProductList products={data?.popularData} />
              <Box marginTop={2} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
                <span>Recommeded</span>
                <Link
                  style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                  type="button"
                  color="success"
                  href={`/products`}
                >
                  View all
                </Link>
              </Box>
              <RecommendedProductList products={data?.recommendedData} />
              <Box marginTop={2} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
                <span>New</span>
                <Link
                  style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                  type="button"
                  color="success"
                  href={`/products`}
                >
                  View all
                </Link>
              </Box>
              <NewProductList products={data?.productData} />
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Grid container rowSpacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Testimonials />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Portfolios />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Team />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Partners />
            </Grid>
          </Grid>
        </Box>
        <FAQHowItWorks />
        <CreateSubscription />
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
      <Toaster />
    </ErrorBoundary>
  );
}