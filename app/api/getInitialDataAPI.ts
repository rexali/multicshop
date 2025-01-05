import { SERVER_URL } from "../../constants/url";

const getInitialDataAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/products/${page}/initial`, { next: { revalidate: 3600 } }).then(res => res.json());

        return data.data;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getInitialDataAPI
}