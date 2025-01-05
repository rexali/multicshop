'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const changePasswordAPI = async (passwordData: {
    rcode: string,
    email: string,
    password: string,
    old_password: string,
}) => {

    try {
        let { data } = await axios.post(`${SERVER_URL}/change`, passwordData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return data;
    } catch (error) {
        console.warn(error);
    }
};

export {
    changePasswordAPI
}