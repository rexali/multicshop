'use client'

import Button from "@mui/material/Button";
import AddToCart from '@mui/icons-material/AddShoppingCart'
import Edit from '@mui/icons-material/Edit';
import Minus from '@mui/icons-material/RemoveCircle';
import Plus from '@mui/icons-material/AddCircle';
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import StatusModal from "../../../components/common/status-modal";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { createCartAPI } from "../../../app/carts/api/createCartAPI";
import { isAllReadyAddedToCartByUserAPI } from "../../../app/carts/api/isAlreadyAddedToCartByUserAPI";
import { getUserCartsAPI } from "../../../app/carts/api/getUserCartsAPI";
import { AppContext } from "../../../context/AppContext";
import { getCarts } from "../../../store/actions/app-actions";
import { getToken } from "../../../utils/getToken";
import GetQouteModal from "../../../app/qoutes/components/GetQuoteModal";
import { goToSavedLinkpath } from "../../../utils/goToSavedLinkPath";
import { CardActions } from "@mui/material";
import { toast } from "sonner";


export default function ProductBottomActions({ product, role, refreshProducts }: { product: any, role?: string, refreshProducts?: any }) {
    const [open, setOpen] = useState(false);
    const [openQoute, setOpenQoute] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const { state } = useContext(AuthContext);
    const { dispatch } = useContext(AppContext)
    const userId = state.user?._id || getToken('_id');
    const router = useRouter();

    const handleOpen = () => {
        setOpen(true)
    }

    const handleOpenQuote = () => {
        setOpenQoute(true)
    }

    const minusToCartCount = (evt: any) => {
        if (Number(evt.currentTarget.nextSibling.value) === 1) {
            evt.currentTarget.nextSibling.value = 1;
            setQuantity(evt.currentTarget.nextSibling.value)
        } else {
            evt.currentTarget.nextSibling.value = Number(evt.currentTarget.nextSibling.value) - 1;
            setQuantity(evt.currentTarget.nextSibling.value)
        }
    }

    const plusToCartCount = (evt: any) => {
        evt.currentTarget.previousSibling.value = Number(evt.currentTarget.previousSibling.value) + 1;
        setQuantity(evt.currentTarget.previousSibling.value)
    }

    return (
        <Box>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <Box><span onClick={(evt) => minusToCartCount(evt)}><Minus sx={{ mr: 1, fontSize: 14 }} /></span><input disabled={true} style={{ width: 15, fontSize: 11, textAlign: 'center', borderRadius: 8 }} value={quantity} /><span onClick={(evt) => plusToCartCount(evt)}><Plus sx={{ ml: 1, fontSize: 14 }} /></span></Box>
                {
                    (role === 'admin') && <Button
                        size="small"
                        onClick={() => { router.push(`/products/${product._id}/edit`) }}
                        startIcon={<Edit sx={{ fontSize: 11 }} />}></Button>
                }
                <Button
                    size="small"
                    onClick={async () => {
                        if (userId) {
                            if (!await isAllReadyAddedToCartByUserAPI(userId, product._id)) {
                                const cart = await createCartAPI({
                                    product_id: product._id,
                                    user_id: userId,
                                    quantity: quantity,
                                    price: product.product_price,
                                    subdomain: state.user.subdomain

                                });

                                if (cart._id) {
                                    handleOpen();
                                }

                                let userCarts = await getUserCartsAPI(userId);
                                dispatch(getCarts(userCarts));
                                // refreshProducts();

                            } else {
                                // alert('\n\n\n\n Already added');
                                toast.success('Already added to cart');
                            }

                        } else {
                            router.push('/auth/signin?next=' + goToSavedLinkpath(''));
                        }

                    }}
                    startIcon={<AddToCart sx={{ fontSize: 11 }} />}><span style={{ fontSize: 11 }}>Add</span></Button>
            </CardActions>
            {open && <StatusModal message={{
                title: "Cart Alert",
                body: "Product added to cart successfully"
            }} closeCallback={handleOpen} />}
            {openQoute && <GetQouteModal closeCallback={handleOpenQuote} productId={product._id} />}
        </Box>
    )
}
