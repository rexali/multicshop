import { SERVER_URL } from '../../../constants/url';
import axios from "axios";

const getUsersProfilesAPI = async (page: number) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/profiles?page=${page}&subdomain=maindomain`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.data === null) {
            return [];
        }

        return data.data?.profiles;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersProfilesAPI
}