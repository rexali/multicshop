import { SERVER_URL } from "../../../constants/url";

const getCategoriesAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/products?page=${page}&subdomain=maindomain`).then(res => res.json());

        return data.data.products;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getCategoriesAPI
}