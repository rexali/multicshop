'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const createProductAPI = async (productData: any, setPostSuccess: any, setPostError: any, setLoading: any) => {

    try {
        let { data } = await axios.post(`${SERVER_URL}/products`, productData, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },

        });
        if (data.status) {
            setPostSuccess(data.status);
            setLoading('')
        } else {
            setLoading('')
            setPostError(data.status)
        }

    } catch (error: any) {
        console.warn(error);
        setLoading('')
        setPostError("Error! " + error.message)
    } finally {
        setTimeout(() => {
            setPostSuccess('')
            setLoading('')
            setPostError('')
        }, 30000);
    }
};

export {
    createProductAPI
}