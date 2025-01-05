'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const handleUpdateNotificationAPI = async (
    event: any,
    setUpdateSuccess: any,
    setUpdateError: any,
    setLoading: any,
    userId: any,
) => {
    // prevent default
    event.preventDefault();
    // check userId is defined
    try {
        const {
            title,
            body,
            notificationId
        } = event.target.elements;

        const updateData = {
            userId: userId ?? '',
            title: title.value,
            body: body.value,
            notificationId: notificationId.value,
        }
        let { data } = await axios.patch(`${SERVER_URL}/notifications`, updateData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (data.status) {
            setLoading('');
            setUpdateSuccess(data.status);
        } else {
            setLoading('');
            setUpdateError(data.status)
        }
    } catch (error) {
        setLoading('');
        setUpdateError("Error!")
        console.warn(error);
    };
}

export {
    handleUpdateNotificationAPI
}