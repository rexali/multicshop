'use client'

import CarouselView from '../components/carousel-view';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function Testimonials() {


    const images = [
        {
            label: 'Dr. Tahir Usman – Thank you for your service',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Mallam Fatima Adam – I am glad that I chose you for this project',
            imgPath:
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Hafsat Otaru – Good work. I am happy',
            imgPath:
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
            label: 'Aneku Jimoh – My brother It is good.',
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 10 }}>
            <h2>Testimonials</h2>
            <Typography>What people say</Typography><br/>
            <CarouselView images={images}  />
        </Container>
    );
}
