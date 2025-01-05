import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getProductAPI = async (productId: string) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/products/${productId}`, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        });

        return data.data?.product;
    } catch (error) {
        console.warn(error);
    }
};


export {
    getProductAPI
}