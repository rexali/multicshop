'use client'

import { BASE_URL, SERVER_URL } from "../../../constants/url";
import axios from "axios";

const isAllReadyAddedToCartByUserAPI = async (userId: string, productId: string) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/carts/users/` + userId, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.data?.carts.map((cart: any) => cart.product._id).includes(productId)) {
            return true
        }

        return false

    } catch (error) {
        console.warn(error);

    }
};

export {
    isAllReadyAddedToCartByUserAPI
}