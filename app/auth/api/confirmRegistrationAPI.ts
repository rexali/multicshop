'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const confirmRegistrationAPI = async (confirmData: { rcode: any, email: any }) => {

    try {
        let { data } = await axios.post(`${SERVER_URL}/confirm`, confirmData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        return data;
    } catch (error) {
        console.warn(error);
    }
};

export{
confirmRegistrationAPI
}