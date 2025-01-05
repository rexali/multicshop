'use client'

import { BASE_URL, SERVER_URL } from "../../../constants/url";
import axios from "axios";

const deleteUserCartAPI = async (cartId: string, userId: string) => {

    try {
        let { data } = await axios.delete(`${SERVER_URL}/carts/` + cartId + '/users/' + userId, {
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
    deleteUserCartAPI
}