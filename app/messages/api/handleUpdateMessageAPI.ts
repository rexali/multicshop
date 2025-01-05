'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const handleUpdateMessageAPI = async (
    event: any,
    setUpdateSuccess: any,
    setUpdateError: any,
    setLoading: any,
    userId: any
) => {
    // prevent default
    event.preventDefault();
    // check userId is defined
    try {
        const {
            title,
            comment,
            messageId,
            firstName,
            lastName,
            email
        } = event.target.elements;

        const updateData = {
            userId: userId??'',
            title: title.value,
            comment: comment.value,
            sender: email.value ??'',
            lastName: lastName.value ??'',
            firstName: firstName.value??'',
            messageId: messageId.value
        }
        let { data } = await axios.patch(`${SERVER_URL}/messages`, updateData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (data.status) {
            setLoading('');
            setUpdateSuccess(data.status)
        } else {
            setLoading('');
            setUpdateError(data.status);
        }
    } catch (error: any) {
        setLoading('');
        setUpdateError('ERROR! ' + error.message);
    } finally {
        setTimeout(() => {
            setLoading('');
            setUpdateSuccess('');
            setUpdateSuccess("");
        }, 20000);
    }

}

export {
    handleUpdateMessageAPI
}