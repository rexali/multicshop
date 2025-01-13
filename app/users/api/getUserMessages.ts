import { SERVER_URL } from "../../../constants/url";

const getUserMessagesAPI = async (userId: string, page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/messages/pages/${page}/users/${userId}/subdomains/maindomain`).then(res => res.json());
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