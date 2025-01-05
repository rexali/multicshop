'use client'

import { createNotificationAPI } from "../api/createNotificationAPI";

const handleNotificationSubmit = async (
    event: any,
    setSuccess: any,
    setError: any,
    setLoading: any,
    userId: any
) => {
    // prevent default
    event.preventDefault();
    try {
        const {
            title,
            body,
        } = event.target.elements;

        const notificationData = {
            userId: userId,
            title: title.value,
            body: body.value,
        }
        await createNotificationAPI(notificationData, setSuccess, setError, setLoading)
    } catch (error) {
        console.warn(error);
    }

}

export {
    handleNotificationSubmit
}