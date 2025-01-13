import { SERVER_URL } from '../../../constants/url';

const getUsersHistoryAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/transactions?page=${page}&subdomain=maindomain`).then(res=>res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.transactions;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersHistoryAPI
}