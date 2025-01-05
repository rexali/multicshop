'use client'

import axios from "axios";
import { SERVER_URL } from "../../../constants/url"


async function createNotificationAPI(notificationData: any, setSuccess: any, setError: any, setLoading:any) {
    try {
        const { data } = await axios.post(`${SERVER_URL}/notifications`, notificationData, {
            headers: {
                "Content-Type": 'application/json',
            }
        });
        if (data.data.notification._id) {
            setSuccess('SUCCESS');
            setLoading('');
        } else {
            setError('ERROR');
            setLoading('');
        }
    } catch (error: any) {
        console.warn(error);
        setError('ERROR! ' + error.message);
        setLoading('');
    } finally {
        setTimeout(() => {
            setSuccess('')
            setError("")
        }, 10000);
    }
}

export {
    createNotificationAPI
}