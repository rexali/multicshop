'use client'
import ErrorBoundary from '@/components/ErrorBoundary';
import React, { useState } from 'react';
import { Select, FormControl, InputLabel, MenuItem, Box } from '@mui/material';
import { getSortedProductsAPI } from '../api/getSortedProductsAPI';
import SideDrawer from '@/components/common/side-drawer';
import ProductList from '../ProductList';
import ReactPagination from "@/components/react-pagination";
import { useSortData } from '../hooks/useSortData';
import Fallback from '@/components/common/fallback';

export default function TopbarFilter(props: any) {
    const [sort, setSort] = useState('');
    const [activePage, setActivePage] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const { data } = useSortData(activePage, sort);

    const handleFilter = (event: any) => {
        const { value }: { value: string } = event.target;
        setSort(value)
        setOpen(true);
    }

    const handleOpenCallback = (value: boolean) => {
        setOpen(value);
    }
    return (
        <ErrorBoundary>
            <Box sx={{ minWidth: 60 }}>
                <FormControl>
                    <InputLabel id='filterLabel'>Sort</InputLabel>
                    <Select
                        labelId='sort'
                        id='sort_item'
                        name='sort_item'
                        size='small'
                        value={sort}
                        label={'Sort'}
                        onChange={handleFilter}
                    >
                        <MenuItem value={''}>Sort by</MenuItem>
                        <MenuItem value={'low'}>Low - high Price</MenuItem>
                        <MenuItem value={'high'}>High - low Price </MenuItem>
                        <MenuItem value={'asc'}>Name (A-Z)</MenuItem>
                        <MenuItem value={'desc'}>Name (Z-A)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {open && <SideDrawer searchCallback={handleOpenCallback}>
                <Box sx={{ mt: 4 }}>
                    Filtering result:
                    {!data?.length && <Fallback item={'No product found yet. Wait..'} />}
                    <ProductList products={data} />
                    <Box marginTop={4} display={"flex"} justifyContent={'center'} >
                        <ReactPagination
                            activePage={activePage}
                            itemsCountPerPage={4}
                            totalItemsCount={data[0]?.totalProducts}
                            pageRangeDisplayed={5}
                            onchangeCallback={(v: any) => setActivePage(v)} />
                    </Box>
                </Box>
            </SideDrawer>
            }
        </ErrorBoundary>
    )
}
