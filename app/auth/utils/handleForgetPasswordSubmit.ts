'use client'

import { forgetPasswordAPI } from "../api/forgetPasswordAPI";

const handleForgetPasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    successCallback: any,
    failureCallback: any,
    setLoading: any
) => {
    try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const result = await forgetPasswordAPI({ email });
        if (result.status) {
            setLoading('');
            successCallback('Success: Check your inbox');
        } else {
            setLoading('');
            failureCallback('Error!');
        }
    } catch (error: any) {
        console.warn(error);
        setLoading('');
        failureCallback('Error! ' + error.message);

    } finally {
        setTimeout(() => {
            successCallback("");
            failureCallback("");
            setLoading('');
        }, 20000);
    }
};

export {
    handleForgetPasswordSubmit
}