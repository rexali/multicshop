'use client'

import Send from "@material-ui/icons/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";
import React from "react";
import { handleProductSubmit } from "../utils/handleProductSubmit";
import { getToken } from "../../../utils/getToken";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../hooks/use-auth";

export default function AddProduct() {

    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [loading, setLoading] = React.useState('');

    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;

    const handleSubmit = async (event: any) => {
        setLoading('Sending data..');
        try {
            await handleProductSubmit(event, setSuccess, setError, setLoading, userId)
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <Container maxWidth="md" component={'main'}>
            <Typography component="h1" variant="h5" sx={{ mt: 15 }} textAlign={'center'}>
                Add product
            </Typography>
            <Box
                sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                component={'form'}
                onSubmit={handleSubmit}
                noValidate={false}
            >
                <TextField
                    autoComplete="given-name"
                    name="product_name"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_name"
                    label="Product Name"
                    autoFocus
                />

                <label>
                    Product Photo(s)
                    <input
                        type='file'
                        accept="image/*"
                        name="product_pictures"
                        id="product_pictures"
                        required
                        multiple
                        formEncType="multipart/form-data"
                        style={{
                            maxWidth: '100%',
                            borderRadius: 5,
                            borderColor: 'black',
                        }}
                    />
                </label>

                <TextField
                    autoComplete="given-name"
                    name="product_category"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_category"
                    label="Product Category"
                    type='text'

                />

                <TextField
                    name="product_sub_category"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_sub_category"
                    label="Product Sub-Category"
                    type="text"
                />

                <TextField
                    name="product_price"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_price"
                    label="Product Price"
                    type="number"
                />

                <TextField
                    name="product_description"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_description"
                    label="Product Description"
                    type="text"
                />

                <TextField
                    name="product_quantity"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_quantity"
                    label="Product Quantity"
                    type='number'
                />

                <TextField
                    name="product_weight"
                    required
                    fullWidth
                    type="number"
                    margin={"normal"}
                    id="product_weight"
                    label="Product Weight"
                />

                <TextField
                    name="product_size"
                    required
                    type="text"
                    fullWidth
                    margin={"normal"}
                    id="product_size"
                    label="product_size"
                    placeholder="e.g., 16 by 4"
                />

                <TextField
                    name="product_code"
                    required
                    type="text"
                    fullWidth
                    margin={"normal"}
                    id="product_code"
                    label="product_code"
                />

                <TextField
                    name="product_demo_links"
                    required
                    fullWidth
                    margin={"normal"}
                    type='text'
                    id="product_demos_links"
                    label="Product Video Demo ID"
                    placeholder="enter your youtube video ID"
                />


                {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
                {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
                {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}

                <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    color='success'
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<Send />}
                >
                    Add Product
                </Button>
            </Box>

        </Container>

    )
}