'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const updateProductAPI = async (productData: any, setPostSuccess: any, setPostError: any, setLoading: any) => {

    try {
        let { data } = await axios.patch(`${SERVER_URL}/products`, productData, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type':'multipart/form-data'
            },

        });
        if (data.status === "success") {
            setLoading('');
            setPostSuccess(data.status);
        } else {
            setLoading('');
            setPostError(data.status);
        }

    } catch (error: any) {
        console.warn(error);
        setLoading('');
        setPostError("Error! " + error.message);
    } finally {
        setTimeout(() => {
            setLoading('');
            setPostSuccess('')
            setPostError('')
        }, 20000);
    }
};

export {
    updateProductAPI
}