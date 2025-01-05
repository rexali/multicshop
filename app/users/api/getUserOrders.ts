import { SERVER_URL } from "../../../constants/url";

const getUserOrdersAPI = async (userId: string, page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/orders/${page}/users/${userId}`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.orders;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserOrdersAPI
}