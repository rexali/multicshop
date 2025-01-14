'use client'
import { createSubscription } from "../api/createSubscription";

const handleSubscribeSubmit = async (event: any, setPostSuccess: any, setPostError: any, setLoading: any, subdomain: any) => {
    event.preventDefault();
    const {
        email
    } = event.target.elements;

    await createSubscription({ email: email.value, subdomain }, setPostSuccess, setPostError, setLoading);
};

export {
    handleSubscribeSubmit
}