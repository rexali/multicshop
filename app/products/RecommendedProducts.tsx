'use client'

import { Suspense } from "react";
import { Container } from "@mui/material";
import Fallback from "../../components/common/fallback";
import RecommendedProductList from "./RecommendedProductList";
import ErrorBoundary from "../../components/ErrorBoundary";
import { SERVER_URL } from "../../constants/url";
import useSWR from "swr";
import { fetchInitialDataAPI } from "../api/fetchInitialDataAPI";
import HomeFallback from "../../components/common/HomeFallback";

export default function RecommendedProducts(props: any) {

  const { data, isLoading, error } = useSWR(`${SERVER_URL}/initial?page=${1}&subdomain=${props.subdomain ?? 'maindomain'}`, fetchInitialDataAPI);

  if (error) {
    return <Fallback item={'Failed to load'} />
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="md" component={'main'} sx={{ mt: 2 }}>
        {/* People who viewed this item also bought: */}
        <h3><span>Recommended</span></h3>
        <Suspense fallback={<HomeFallback />}>
          <RecommendedProductList products={data?.recommendedData} />
        </Suspense>
      </Container>
    </ErrorBoundary>
  )
}
