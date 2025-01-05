'use client'

import { BASE_URL, SERVER_URL } from "../../../constants/url";
import axios from "axios";

const isBoughtByUserAPI = async (userId: string, productId: string) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/orders/` + userId, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.data?.orders.map((order: any) => order.items.map((item: { product: any })=>item.product))[0].includes(productId)) {
            return true
        }

        return false

    } catch (error) {
        console.warn(error);

    }
};

export {
    isBoughtByUserAPI
}