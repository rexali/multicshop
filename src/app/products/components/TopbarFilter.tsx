'use client'
import ErrorBoundary from '@/components/ErrorBoundary';
import React, { useState } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

export default function TopbarFilter() {
    const [query, setQuery] = useState('');

    const handleFilter = (query: string) => {
        switch (query) {
            case 'Low':

                break;
            case 'High':

                break;
            case 'A-Z':

                break;
            case 'Z-A':

                break;
            default:

                break;

        }
    }

    return (
        <ErrorBoundary>
            <FormControl>
                <InputLabel id='filter'>Sort</InputLabel>
                <Select
                    labelId='sort'
                    id='sortitem'
                    value={query}
                    label={'Sort'}
                    onChange={(event) => {
                        const { name, value } = event.target;
                        setQuery(value)
                    }}
                // sx={{ height: 20 }}
                >
                    <MenuItem>Low</MenuItem>
                    <MenuItem>High</MenuItem>
                    <MenuItem>A-Z</MenuItem>
                    <MenuItem>Z-A</MenuItem>
                </Select>
            </FormControl>
        </ErrorBoundary>
    )
}