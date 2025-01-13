import { SERVER_URL } from "../../../constants/url";

const getFilteredProductsAPI = async (filters: any, page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/filterings?page=${page}&filter1=${filters[0]}&filter2=${filters[1]}&subdomain=maindomain`).then(res => res.json());
        if (data.data === null) {
            return []
        }
        return data.data.products;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getFilteredProductsAPI
}