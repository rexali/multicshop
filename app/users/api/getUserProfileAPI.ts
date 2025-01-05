import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getUserProfileAPI = async (userId: string) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/profiles/${userId}`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.data === null) {
            return {};
        }
        return data.data?.profile;
    } catch (error) {
        console.warn(error);
    }
};

const fetchUserProfile = async (url: string) => {
    try {
        let data = await fetch(url).then(res => res.json());
        if (data.data === null) {
            return {};
        }
        return data.data?.profile;
    } catch (error) {
        console.warn(error);
    }
}


export {
    getUserProfileAPI,
    fetchUserProfile
}