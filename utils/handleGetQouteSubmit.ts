import { SERVER_URL } from "@/constants/url";
import axios from "axios";

const handleGetQouteSubmit = async (favouriteData: any) => {

    try {
        let { data: { data: { qoute } } } = await axios.post(`${SERVER_URL}/qoutes`, favouriteData, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return qoute;
    } catch (error) {
        console.warn(error);
    }
};

export {
    handleGetQouteSubmit
}