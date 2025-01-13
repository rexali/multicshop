import { SERVER_URL } from '../../../constants/url';

const getUsersOrdersAPI = async (page: number = 1,subdomain: string = 'maindomain') => {

    try {
        let data = await fetch(`${SERVER_URL}/orders?page=${page}&subdomain=${subdomain}`).then(res=>res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.orders;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersOrdersAPI
}