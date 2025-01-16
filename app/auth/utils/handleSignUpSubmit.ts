'use client'

import { signUpAPI } from "../api/signUpAPI";

/**
 * 
 * @param event : a form event
 * @param setSignUpError : an error callback
 * @param setSignUpSuccess : a success callback
 * @param url : a given
 */
export const handleSignUpSubmit = (
    event: any,
    setSignUpError: any,
    setSignUpSuccess: any,
    setLoading: any,
    router?: any,
    domain: any = 'maindomain'
) => {
    // prevent default behaviour
    event.preventDefault();
    // get user data
    const {
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        remember_me,
        business_name,
    } = event.target.elements;
    //   check if user password and confirm password before posting user data 
    let subdomainx = event.target.elements.subdomain?.value ?? domain;

    if (password.value === confirm_password.value) {
        setLoading('Sending data..');
        // call handleSignUp method and collect user data
        signUpAPI(
            first_name.value,
            last_name.value,
            email.value,
            password.value,
            remember_me.value,
            subdomainx,
            business_name.value,
        ).then(((result) => {
            if (result.status === "success") {
                // send success message
                setLoading('');
                setSignUpError('');
                setSignUpSuccess(result.status + '. Sign in now');
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