'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedCallback } from 'use-debounce'
import Box from '@mui/material/Box';
import SearchList from '../search/SearchList';
import { instantSearchProductAPI } from '../search/api/instantSearchAPI';

export default function SellProducts() {
    const [data, setData] = React.useState([]);
    const [term, setTerm] = React.useState();

    const handleSearch = useDebouncedCallback(async (term) => {
        setData(await instantSearchProductAPI(term));
    }, 400);

    return (
        <Box marginTop={10} >
            <Paper
                component="form"
                sx={{ p: '2px 2px', maxWidth: 300, mt: 2, mr: 'auto', ml: 'auto' }}
            // action={"/search"}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search products to sell.."
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
                <IconButton
                    // type="submit" 
                    sx={{ p: '10px' }}
                    aria-label="search" >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <SearchList products={data} />
        </Box>
    );
}