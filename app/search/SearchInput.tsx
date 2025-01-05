'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { instantSearchProductAPI } from './api/instantSearchAPI';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { useMediaQuery } from "react-responsive";


export default function SearchInput() {
  const [data, setData] = React.useState<any>([]);
  const [term, setTerm] = React.useState();
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });


  const handleSearch = useDebouncedCallback(async (term) => {
    setData(await instantSearchProductAPI(term));
  }, 400);

  let productNames = data.map((product: any) => product.product_name);

  return (
    <Paper
      component="form"
      sx={{ p: '2px 2px', maxWidth: 300, mt: isMobile ? 2 : 0, mr: !isMobile ? 2 : 0 }}
      action={"/search"}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search products"
        inputProps={{ 'aria-label': 'search products' }}
        name='term'
        defaultValue={term}
        onInput={async (event) => {
          const { value } = event.target as any;
          setTerm(term);
          await handleSearch(value);
        }
        }
      />
      <IconButton type="submit" sx={{ p: '2px' }} aria-label="search" >
        <SearchIcon />
      </IconButton>
      <Paper sx={{zIndex:9999}}>
        {
          productNames?.map((name: any, i: number) => <Link key={i} style={{ textDecoration: "none", color: 'black', textAlign: 'center', margin: 4, display: "block", padding: 4 }} href={"/search?term=" + name}>{name}</Link>)
        }
      </Paper>
    </Paper>
  );
}