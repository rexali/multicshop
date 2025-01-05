'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const createCartAPI = async (cartData: any) => {

    try {
        let { data } = await axios.post(`${SERVER_URL}/carts`, cartData, {
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
    createCartAPI
}