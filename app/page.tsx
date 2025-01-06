'use client'
import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MarketingMessage from './MarketingMessage';
import FAQHowItWorks from './FAQHowItWorks';
import Copyright from '../components/common/copyright';
import SearchInput from "./search/SearchInput";
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
import DesktopProductCategories from './products/DesktopProductCategories';
import { useMediaQuery } from "react-responsive";
import FeaturedProductList from './products/FeaturedProductList';
import PopularProductList from './products/PopularProductList';
import NewProductList from './products/NewProductList';
import RecommendedProductList from './products/RecommendedProductList';
import useSWR from 'swr';
import { SERVER_URL } from '../constants/url';
import HomeFallback from '../components/common/HomeFallback';
import Fallback from '../components/common/fallback';
import { fetchInitialDataAPI } from './api/fetchInitialDataAPI';
import { Grid } from '@mui/material';
import { Toaster } from 'sonner';

export default function AppPage() {
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });

  const { data, isLoading, error } = useSWR(`${SERVER_URL}/products/${1}/initial`, fetchInitialDataAPI);

  if (error) {
    return <Fallback item={'failed to load'} />
  }

  if (isLoading) {
    return <HomeFallback />
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }} >
        {/* <CssBaseline /> */}
        {isMobile && <Box display={"flex"} justifyContent={'center'}><SearchInput /></Box>} <br />
        <ProductCategories categoryData={data?.categoryData} />
        <MarketingMessage /> <br />
        <Box marginTop={4} display={"flex"} flexDirection={'row'} justifyContent={'space-between'} >
          <Box>
            {!isMobile && <DesktopProductCategories categoryData={data?.categoryData} />}
          </Box>
          <Box>
            <Box>Featured</Box>
            <FeaturedProductList products={data?.featuredData} />
            <Box margin={2} padding={2} display={"flex"} justifyContent={'center'}>
              <Link
                style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                type="button"
                color="success"
                href={`/products`}
              >
                View all
              </Link>
            </Box>
            <Box>Popular</Box>
            <PopularProductList products={data?.popularData} />
            <Box marginTop={2} padding={2} display={"flex"} justifyContent={'center'}>
              <Link
                style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                type="button"
                color="success"
                href={`/products`}
              >
                View all
              </Link>
            </Box>
            <Box>Recommended</Box>
            <RecommendedProductList products={data?.recommendedData} />
            <Box marginTop={2} padding={2} display={"flex"} justifyContent={'center'}>
              <Link
                style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                type="button"
                color="success"
                href={`/products`}
              >
                View all
              </Link>
            </Box>
            <Box>New</Box>
            <NewProductList products={data?.productData} />
            <Box marginTop={2} padding={2} display={"flex"} justifyContent={'center'}>
              <Link
                style={{ textDecoration: "none", color: 'green', borderColor: 'green' }}
                type="button"
                color="success"
                href={`/products`}
              >
                View all
              </Link>
            </Box>
          </Box>
        </Box>
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