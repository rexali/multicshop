'use client'
import Container from '@mui/material/Container';
import ErrorBoundary from '../../components/ErrorBoundary';
import React from 'react';
import "./styles/styles.css";
import Link from 'next/link';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export default function DesktopProductCategories(props: any) {
    let categoryData = props.categoryData ?? [];
    let categories = categoryData.map((product: any) => product.product_category);
    const categoriex = Array.from(new Set([...categories]));

    const renderListItems = (data: any) => {
        return data.map((catx: string, i: number) =>
            <Link
                key={i}    
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    textAlign: 'center',
                    alignSelf: 'center',
                    textDecoration: 'none',
                    display: 'block',
                    marginRight: 2,
                    marginBottom: 1,
                    color:'black'
                }}
                href={`/category/?term=${catx.toLowerCase()}`}>
                <ListItem>
                    {/* <ListItemButton> */}
                    <ListItemText style={{textTransform:'capitalize'}} primary={catx} />
                    {/* </ListItemButton> */}
                </ListItem>
            </Link>
        )
    }

    return (
        <ErrorBoundary>
            <Container maxWidth="lg" component={'main'} sx={{ mt: 2 }}>
                <p>CATEGORIES</p>
                <List>
                    {renderListItems(categoriex)}
                </List>
            </Container>
        </ErrorBoundary>
    )
}
