"use client"

import Fallback from "../../components/common/fallback";
import { Box, Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { searchProductsCategoryAPI } from "./api/searchProductsCategoryAPI";
import ReactPagination from "../../components/react-pagination";
import CategoryList from "./CategoryList";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get('term') as string;
  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = useState<number>(1);


  useEffect(() => {
    async function getData() {
      try {
        let categoryData = await searchProductsCategoryAPI(term, activePage)
        setData(categoryData);
      } catch (error) {
        console.warn(error);
      }
    }
    getData();

  }, [activePage, term]);

  if (!data.length) {
    return <Fallback item={'No product matches your category yet'} />
  }

  return (
    <Container maxWidth="md" component={'main'} sx={{ mt: 10 }}>
      <h2>Product(s): <span style={{textTransform:'capitalize'}}>{term}</span></h2>
      <CategoryList products={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={data?.length}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
