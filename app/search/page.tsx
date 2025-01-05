"use client"

import Fallback from "../../components/common/fallback";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useRef, useEffect } from "react";
import SearchList from "./SearchList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { searchProducts } from "./api/searchProducts";

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = useState<number>(1);

  const term = searchParams.get('term');

  useEffect(() => {
      async function getData(){
        try {
          setData(await searchProducts(term, activePage));
        } catch (error) {
          console.warn(error);
        } 
    }
    getData();
  },[activePage, term])

  if (!data.length) {
    return <Fallback item={'No product matches your search term'} />
  }

  return (
    <Container maxWidth="md" component={'main'} sx={{ mt: 10 }}>
      <h2>Product(s): <span style={{textTransform:'capitalize'}}>{term}</span></h2>
        <SearchList products={data}/>
        <Box marginTop={4} display={"flex"} justifyContent={'center'} >
          <ReactPagination
            activePage={activePage}
            itemsCountPerPage={4}
            totalItemsCount={data?.length}
            pageRangeDisplayed={5}
            onchangeCallback={(v: any) => setActivePage(v)} />
        </Box>
    </Container>
  )
}
