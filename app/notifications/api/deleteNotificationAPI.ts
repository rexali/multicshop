'use client'

import { SERVER_URL } from "../../../constants/url";

const deleteNotificationAPI = async (data: { notificationId: any }) => {
    try {
        let response = await fetch(`${SERVER_URL}/notifications/`+data.notificationId, {
            method: "delete",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.status==='success') {
            return true
        }

        return false
    } catch (error) {
        console.log(error);
    }
};

export {
    deleteNotificationAPI
}