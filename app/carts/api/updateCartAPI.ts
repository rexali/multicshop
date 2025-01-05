'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const updateCartAPI = async (cartData: any) => {

    try {
        let { data } = await axios.patch(`${SERVER_URL}/carts`, cartData, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.data?.cart;
    } catch (error) {
        console.warn(error);
    }
};

export {
    updateCartAPI
}