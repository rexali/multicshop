'use client'

import axios from "axios";
import { SERVER_URL } from "../../../constants/url"


async function createSubscription(email: any, setSuccess: any, setError: any, setLoading:any) {
    try {
        const {data} = await axios.post(`${SERVER_URL}/subscriptions`, { email }, {
            headers: {
                "Content-Type": 'application/json',
            }
        }); 
        if (data.data.subscription._id) {
            setLoading('');
            setSuccess('SUCCESS');
        } else {
            setLoading('');
            setError('ERROR');
        }
    } catch (error: any) {
        console.warn(error);
        setLoading('');
        setError('ERROR! ' + error.message);
    }finally{
        setTimeout(() => {
            setSuccess('')
            setError("")
            setLoading('');
        }, 20000);
    }
}

export {
    createSubscription
}