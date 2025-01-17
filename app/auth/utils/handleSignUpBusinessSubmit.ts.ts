'use client'

import { signUpAPI } from "../api/signUpAPI";
import { signUpBusinessAPI } from "../api/signUpBusinessAPI";

/**
 * 
 * @param event : a form event
 * @param setSignUpError : an error callback
 * @param setSignUpSuccess : a success callback
 * @param url : a given
 */
export const handleSignUpBusinessSubmit = (
    event: any,
    setSignUpError: any,
    setSignUpSuccess: any,
    setLoading: any,
    router?: any
) => {
    // prevent default behaviour
    event.preventDefault();
    // get user data
    const {
        email,
        password,
        confirm_password,
        remember_me,
        business_name,
        subdomain
    } = event.target.elements;
    //   check if user password and confirm password before posting user data 
    if (password.value === confirm_password.value) {
        setLoading('Sending data..');
        // call handleSignUp method and collect user data
        signUpBusinessAPI(
            business_name.value,
            subdomain.value,
            email.value,
            password.value,
            remember_me.value,
        ).then(((result) => {
            if (result.status === "success") {
                // send success message
                setLoading('');
                setSignUpError('');
                setSignUpSuccess(result.status + '. sign in now');
                setTimeout(() => {
                    router.replace('/auth/signin');
                }, 5000)
            } else {
                // send failure message
                setLoading('');
                setSignUpError('');
                setSignUpSuccess(result.status);
                setTimeout(() => {
                    setSignUpError('');
                    setSignUpSuccess('');
                    setLoading('');
                }, 10000)
            }
        })).catch((err) => {
            // log error message
            setLoading('');
            setSignUpError(err.message);
            console.warn(err);
        }).finally(() => {
            setTimeout(() => {
                setSignUpError('');
                setSignUpSuccess('');
                setLoading('');
            }, 20000)
        })

    } else {
        setSignUpError('Password and confirm password mismatch');
        setSignUpSuccess('');
        setTimeout(() => {
            setSignUpError('');
            setSignUpSuccess('');
            setLoading('');
        }, 20000)
    }

}