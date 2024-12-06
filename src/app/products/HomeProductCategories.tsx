'use client'
import Container from '@mui/material/Container';
import ErrorBoundary from '@/components/ErrorBoundary';
import React from 'react';
import HomeProductCategoryList from './HomeProductCategoryList';

export default function HomeProductCategories({ categories }: { categories: any }) {

    return (
        <ErrorBoundary>
            <Container maxWidth="md" component={'main'} sx={{ mt: 5 }}>
                <h3>Categories</h3>
                <HomeProductCategoryList categories={categories} />
            </Container>
        </ErrorBoundary>
    )
}
