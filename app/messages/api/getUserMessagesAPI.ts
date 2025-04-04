'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getUserMessagesAPI = async (userId: string, pageNumber: any = 1, subdomain: string = 'maindomain') => {

    try {
        let { data: { data: { messages } } } = await axios.get(`${SERVER_URL}/messages/pages/${pageNumber}/users/${userId}/subdomains/${subdomain}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        return messages;

    } catch (error) {
        console.warn(error);
    }

};

export {
    getUserMessagesAPI
}