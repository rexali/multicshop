import { SERVER_URL } from '../../../constants/url';

const getUsersNotificationsAPI = async (page: number = 1,subdomain: string = 'maindomain',) => {

    try {
        let data = await fetch(`${SERVER_URL}/notifications?page=${page}&subdomain=${subdomain}`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.notifications;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersNotificationsAPI
}