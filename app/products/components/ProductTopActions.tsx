'use client'

import Share from "@mui/icons-material/Share";
import Remove from "@mui/icons-material/RemoveCircle";

import Button from "@mui/material/Button";
import Favourite from '@mui/icons-material/Favorite';
import { getToken } from "../../../utils/getToken";
import { useState } from "react";
import StatusModal from "../../../components/common/status-modal";
import { shareLink } from "../../../utils/shareLink";
import { useRouter } from "next/navigation";
import { addToWishListOrRemove } from "../../../app/favourites/utils/addToWishListOrRemove";
import { useAuth } from "../../../hooks/use-auth";
import { goToSavedLinkpath } from "../../../utils/goToSavedLinkPath";
import { CardActions } from "@mui/material";

export default function ProductTopActions({ product, role, refreshProducts }: { product: any, role?: string, refreshProducts?: any }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;

    let likes = product?.likes ?? [];
    let userLikes = likes.map((like: any) => like?.user);

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>

            {
                role === 'admin' &&
                <Button
                    size="small"
                    onClick={() => {
                        router.push(`/products/${product._id}/delete`);
                    }
                    }
                    startIcon={<Remove sx={{ fontSize: 11 }} />}>
                    <span style={{ fontSize: 11 }}>Remove</span>
                </Button>
            }
            <Button
                size="small"
                onClick={(() => shareLink(product._id))}
                startIcon={<Share sx={{ fontSize: 11 }} />}>
                <span style={{ fontSize: 11 }}>Share</span>
            </Button>

            <Button
                size="small"
                onClick={async () => {
                    if (userId) {
                        await addToWishListOrRemove(userId, product._id, handleOpen);
                        refreshProducts();
                    } else {
                        router.push('/auth/signin?next=' + goToSavedLinkpath(''));
                    }

                }}
                startIcon={<Favourite sx={{ fontSize: 11, color: userLikes?.includes(userId) ? 'red' : 'green' }} />}>
                <span style={{ fontSize: 11 }}>Like</span>
            </Button>
            {open && <StatusModal message={{
                title: "Favourite Alert",
                body: "Product added to wish list"
            }} closeCallback={handleOpen} />}
        </CardActions>
    )
}
