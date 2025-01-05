'use client'

import {SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getNotificationsAPI = async (pageNumber: any = 1) => {

    try {
        let { data } = await axios.get(`${SERVER_URL}/notifications?page=${pageNumber}`, {
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