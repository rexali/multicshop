import { SERVER_URL } from "../../../constants/url";

const getUserNotificationsAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/notifications?page=${page}&subdomain=maindomain`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.notifications;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserNotificationsAPI
}