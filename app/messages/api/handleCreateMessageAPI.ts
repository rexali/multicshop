'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const handleCreateMessageAPI = async (
    messageData: any,
    setSuccess: any,
    setError: any,
    setLoading:any
) => {
    try {
        let { data } = await axios.post(`${SERVER_URL}/messages`, messageData, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (data.status) {
            setSuccess(data.status);
            setLoading('')
        } else {
            setError(data.status);
            setLoading('')
        }
    } catch (error: any) {
        console.warn(error);
        setError('ERROR! ' + error.message);
    } finally {
        setTimeout(() => {
            setSuccess('');
            setError("");
            setLoading('')
        }, 10000);
    }

}

export {
    handleCreateMessageAPI
}