import { BASE_URL, SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getUserFavouritesAPI = async (userId: string, page?: number,subdomain: string = 'maindomain') => {

    try {
        let data = await fetch(`${SERVER_URL}/favourites/pages/${page}/users/${userId}/subdomains/${subdomain}`).then(res => res.json());
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