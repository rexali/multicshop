'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const clearUserCartsAPI = async (userId: string) => {

    try {
        let { data } = await axios.delete(`${SERVER_URL}/carts/users/` + userId, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (data.status === 'success') {

            return true
        }

        return false;
    } catch (error) {
        console.warn(error);
    }
};

export {
    clearUserCartsAPI
}