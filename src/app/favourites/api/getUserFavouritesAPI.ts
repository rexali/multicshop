import { BASE_URL, SERVER_URL } from "@/constants/url";
import axios from "axios";

const getUserFavouritesAPI = async (userId: string, page?: number) => {

    try {
        let data = await fetch(`${SERVER_URL}/favourites?page=` + page + '&userId=' + userId).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.favourites.map((favourite: any) => ({
            favouriteId: favourite._id,
            userId: favourite.user._id,
            ...favourite.product,
            totalFavourites: favourite.totalFavourites
        }));
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserFavouritesAPI
}