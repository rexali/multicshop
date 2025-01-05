'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getUserCartsAPI = async (userId: string, page: number = 1) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/carts/pages/${page}/users/${userId}`, {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (data.data === null) {
            return [];
        }

        if (!data.data.carts?.length) {
            return [];
        }

        let newcarts = data.data.carts?.map((cart: any) => {
            return {
                ...cart,
                product: {
                    ...cart.product,
                    cartId: cart._id,
                    cartQuantity: cart.quantity,
                    totalCarts: cart.totalCarts
                }
            }
        });


        return newcarts?.map((cart: any) => cart?.product);
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserCartsAPI
}