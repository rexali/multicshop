import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const deleteFavouriteAPI = async (productId: string, userId: string) => {

    try {
        let { data } = await axios.delete(`${SERVER_URL}/favourites/products/` + productId + '/users/' + userId, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.status === 'success') {
            return true
        }
        return false;
    } catch (error) {
        console.warn(error);
    }
};

export {
    deleteFavouriteAPI
}