import { SERVER_URL } from '../../../constants/url';

const getUsersMessagesAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/messages?page=${page}&subdomain=maindomain`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.messages;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersMessagesAPI
}