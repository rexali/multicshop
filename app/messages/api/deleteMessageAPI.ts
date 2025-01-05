'use client'

import { SERVER_URL } from "../../../constants/url";
// import { getMessages } from "@/store/actions/app-actions";
// import { getMessagesAPI } from "./getMessagesAPI";

const deleteMessageAPI = async (data: { messageId: any, dispatch: any }) => {
    try {
        let response = await fetch(`${SERVER_URL}/messages/` + data.messageId, {
            method: "delete",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data)
        });

        let result = await response.json();
        if (result.status === 'success') {
            // data.dispatch(getMessages(await getMessagesAPI()));
            return true
        }

        return false
    } catch (error) {
        console.log(error);
    }
};

export {
    deleteMessageAPI
}