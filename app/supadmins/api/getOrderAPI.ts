import { SERVER_URL } from '../../../constants/url';

const getOrderAPI = async (orderId: string) => {

    try {
        let data = await fetch(`${SERVER_URL}/orders/` + orderId).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.order;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getOrderAPI
}