'use client'

import {SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getNotificationsAPI = async (pageNumber: any = 1,subdomain: string = 'maindomain') => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/notifications?page=${pageNumber}&subdomain=${subdomain}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        return data.data.notifications;

    } catch (error) {
        console.warn(error);
    }
}

export {
    getNotificationsAPI
}