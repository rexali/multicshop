import { SERVER_URL } from "../../../constants/url";

const getReviewsAPI = async (productId: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/ratings/` + productId + "/products").then(res => res.json());

        return data.data.products;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getReviewsAPI
}