'use client'

import { changePasswordAPI } from "../api/changePasswordAPI";

const handleChangePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    rcode: string,
    successCallback: any,
    failureCallback: any,
    setLoading: any
) => {
    try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const confirm_password = data.get('confirm_password') as string;
        const password = data.get('current_password') as string;

        if (confirm_password === password && rcode && email) {

            const passwordData = {
                email: email,
                rcode: rcode,
                password,
                old_password: data.get('old_password') as string,
            };

            const result = await changePasswordAPI(passwordData);
            if (result.status === 'success') {
                successCallback("Success: Log in to your account now");
                setLoading('');
            } else {
                failureCallback("Error!");
                setLoading('');
            }

        } else {
            failureCallback("Error! Password mismatch");
            setLoading('');
        }
    } catch (error: any) {
        console.warn(error);
        failureCallback("Error! " + error.message);
        setLoading('');
    } finally {
        setTimeout(() => {
            successCallback("");
            failureCallback("");
            setLoading('');
        }, 20000);
    }

};

export {
    handleChangePasswordSubmit
}
