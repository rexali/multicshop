import { SERVER_URL } from "../../../constants/url";

const getRatingReviewsAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/ratings?page=` + page).then(res=>res.json());

        return data.data?.products;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getRatingReviewsAPI
}