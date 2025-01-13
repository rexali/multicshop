import { SERVER_URL } from "../../../constants/url";

const getUserMessagesAPI = async (userId: string, page: number = 1,subdomain: string = 'maindomain') => {

    try {
        let data = await fetch(`${SERVER_URL}/messages/pages/${page}/users/${userId}/subdomains/${subdomain}`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.messages;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserMessagesAPI
}