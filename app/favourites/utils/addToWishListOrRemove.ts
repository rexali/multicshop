import { toast } from "sonner";
import { createFavouriteAPI } from "../api/createFavouriteAPI";
import { deleteFavouriteAPI } from "../api/deleteFavouriteAPI";
import { isAlReadyAddedToFavouriteByUserAPI } from "../api/isAlreadyAddedToFavouriteByUserAPI";

export async function addToWishListOrRemove(userId: string, productId: string, statusCallback?:any) {

    if (await isAlReadyAddedToFavouriteByUserAPI(userId, productId)) {
        if (await deleteFavouriteAPI(productId, userId)) {
            // alert('Remove successfully');
            toast.success('Remove successfully');
        }
    } else { 
        let favourite = await createFavouriteAPI({
            product_id: productId,
            user_id: userId
        });
        if (favourite._id) {
            toast.success('Added successfully');
            // statusCallback();
        }
    }
}