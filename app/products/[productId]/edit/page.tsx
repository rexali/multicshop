'use client'

import Send from "@material-ui/icons/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { handleProductEditSubmit } from "../../utils/handleProductEdit.Submit";
import Container from "@mui/material/Container";
import { SERVER_URL } from "../../../../constants/url";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import Fallback from "../../../../components/common/fallback";
import CardImage from "../../components/CardImage";
import Remove from "@mui/icons-material/Remove";
import { getProductAPI } from "../../api/getProductAPI";
import { removeProductPicture } from "../../api/removeProductPictureAPI";
import { useAuth } from "../../../../hooks/use-auth";

export default function Page() {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = React.useState('');
    const [data, setData] = useState<any>({});
    const pathname = usePathname();
    const params = pathname.split('/').filter(param => param !== '');
    const productId = params[1];

    const getProductData = useCallback(async () => {
        try {
            let product = await getProductAPI(productId)
            setData((c: any) => ({ ...c, ...product }));
        } catch (error) {
            console.warn(error);
        }
    }, [productId]);

    useEffect(() => {
        getProductData();
    }, [getProductData]);


    const removePictureAndGetProductData = async (event: any, productId: string, product_picture: string) => {
        try {
            await removeProductPicture({ productId: productId, product_picture: product_picture });
            await getProductData();
            event.currentTarget.disabled = true;
            event.currentTarget.textContent = 'REMOVED';
        } catch (error) {
            console.error(error);
        }

    }


    const handleSubmit = async (event: any) => {
        if (user?.role === 'admin') {
            setLoading('Sending data..')
            await handleProductEditSubmit(event, setSuccess, setError, setLoading, productId)
        } else {
            setLoading('You are not unauthorized')
        }
    };


    if (!Object.keys(data)?.length) {
        return <Fallback item={'No product details found yet. Wait..'} />
    }

    return (
        <Container maxWidth="md" component={'main'} sx={{ mt: 8 }}>
            <Typography component="h1" variant="h5" textAlign={"center"}>
                Edit product
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate={false}
                sx={{ mt: 1 }}
            >
                <Box style={{
                    backgroundColor: 'white',
                    overflow: 'auto',
                    whiteSpace: 'nowrap',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    maxWidth: 'fit-content',
                    borderRadius: 15
                }}>
                    {data.product_pictures?.length ?

                        data.product_pictures.map((product_picture: any, i: any) =>
                            <div key={i} style={{ display: 'inline-block', margin: 4 }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CardImage
                                        src={`${SERVER_URL}/uploads/${product_picture}`}
                                        alt={data.product_name}
                                        style={{
                                            display: 'block',
                                            marginRight: 'auto',
                                            marginLeft: 'auto',
                                            borderRadius: 20,
                                        }}
                                        width={140}
                                        height={140}
                                    />
                                    <Button
                                        color="warning"
                                        fullWidth
                                        variant='text'
                                        size="small"
                                        startIcon={<Remove />}
                                        onClick={async (event) => {
                                            await removePictureAndGetProductData(event, productId, product_picture)
                                        }}>
                                        Remove
                                    </Button>
                                </Box>
                            </div>
                        ) : <div style={{ display: 'inline-block', margin: 4 }}>
                            <Avatar />
                        </div>
                    }
                </Box>
                <TextField
                    name="product_name"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_name"
                    label="Product Name"
                    defaultValue={data?.product_name}
                    type='text'
                    autoFocus
                />

                <label>
                    Product Photo(s):
                    <input
                        type='file'
                        accept="image/*"
                        name="product_pictures"
                        id="product_pictures"
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
                    name="product_category"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_category"
                    label="Product Category"
                    defaultValue={data?.product_category}
                    type='text'
                />

                <TextField
                    name="product_sub_category"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_sub_category"
                    label="Product Sub-Category"
                    defaultValue={data?.product_sub_category}
                    type='text'
                />

                <TextField
                    name="product_description"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_description"
                    label="Product Description"
                    defaultValue={data?.product_description}
                    type='text'
                />

                <TextField
                    name="product_price"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_price"
                    label="Product Price"
                    defaultValue={data?.product_price}
                    type='number'
                />

                <TextField
                    name="product_quantity"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_quantity"
                    label="Product Quantity"
                    defaultValue={data?.product_quantity}
                    type='number'
                />


                <TextField
                    name="product_weight"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_weight"
                    label="Product Weight"
                    defaultValue={data?.product_weight}
                    type='number'
                />

                <TextField
                    name="product_size"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_size"
                    label="product_size"
                    defaultValue={data?.product_size}
                    type='text'
                    placeholder="e.g., 16cm by 4cm"
                />

                <TextField
                    name="product_code"
                    required
                    fullWidth
                    margin={"normal"}
                    id="product_code"
                    label="product_code"
                    defaultValue={data?.product_code}
                    type='text'
                />

                <TextField
                    name="product_demos_links"
                    required
                    fullWidth
                    margin={"normal"}
                    type='text'
                    id="product_demos_links"
                    label="Product Demo Video ID"
                    defaultValue={data?.product_demos_links}
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
                    UPDATE
                </Button>
            </Box>
        </Container >
    )
}