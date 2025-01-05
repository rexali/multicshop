'use client'

import { logInAPI } from "../api/logInAPI";

/**
 * Sign in a user
 * @param event : form event
 * @param setLoginError : login callback
 * @param url : URL of a given route
 */
export const handleLoginSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    setLoginSuccess: Function,
    setLoginError: Function,
    setLoading: Function,
    router: any,
    next:any
) => {
    // prevent defaut behaviour
    event.preventDefault();
    // get current form data
    const data = new FormData(event.currentTarget);
    // get email
    const email = data.get("email");
    // get password 
    const password = data.get("password");
    // handle login
    logInAPI(email, password)
        .then((result: any) => {
            if (result.status === "success") {
                setLoading('');
                setLoginSuccess(result.status);
                // check if window is defined
                if (typeof window !== "undefined") {
                    // check if token is defined
                    if (result.data.token) {
                        // redirect user to a given url
                        // window.location.assign('/users');
                        if(next){
                            router.push(next);   
                        }else{
                            router.push('/');             
                        }
                    } else {
                        // window.location.assign('/');
                        router.push('/auth/signin');
                    }

                } else {
                    setLoading('');
                    setLoginError("Error! Let the developer knows");
                }
            } else {
                setLoading('');
                setLoginError(result.status);
            }
        }).catch((err) => {
            // collect error thru error callback
            setLoading('');
            setLoginError(err.message);
            console.warn(err);
        }).finally(() => {
            setTimeout(() => {
                setLoginError('');
                setLoginSuccess('');
                setLoading("");
            }, 20000);
        })
}
