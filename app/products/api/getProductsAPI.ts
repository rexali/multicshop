import { SERVER_URL } from "../../../constants/url";

const getProductsAPI = async (page: number = 1, subdomain: string = 'maindomain') => {

    try {
        let data = await fetch(`${SERVER_URL}/products?page=${page}&subdomain=${subdomain}`).then(res => res.json());

        return data.data?.products;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getProductsAPI
}