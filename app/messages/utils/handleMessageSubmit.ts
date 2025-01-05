'use client'

import { handleCreateMessageAPI } from "../api/handleCreateMessageAPI";

const handleMessageSubmit = async (event: any, setSuccess: any, setError: any, setLoading: any, userId?: any) => {
    // prevent default
    event.preventDefault();
    // check userId is defined
    try {
        const {
            title,
            comment
        } = event.target.elements;

        const messageData = {
            userId: userId ?? '',
            title: title.value,
            comment: comment.value,
            sender: event.target.elements.email?.value ?? '',
            lastName: event.target.elements.lastName?.value ?? '',
            firstName: event.target.elements.firstName?.value ?? '',
        }

        await handleCreateMessageAPI(messageData, setSuccess, setError, setLoading);
    } catch (error) {
        console.warn(error)
    }
}

export {
    handleMessageSubmit
}