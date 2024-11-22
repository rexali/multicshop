'use client'

import { BASE_URL, SERVER_URL } from "@/constants/url";
import axios from "axios";

const deleteCartAPI = async (id: string) => {

    try {
        let { data} = await axios.delete(`${SERVER_URL}/carts/` + id, {
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
    deleteCartAPI
}