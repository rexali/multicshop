import { SERVER_URL } from "../../constants/url";

const getInitialDataAPI = async (subdomain: string='maindomain', page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/initial?page=${page}&subdomain=${subdomain}`, { next: { revalidate: 120 } }).then(res => res.json());

        return data.data;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getInitialDataAPI
}