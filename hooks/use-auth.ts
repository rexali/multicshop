'use client'

import { signIn } from '../store/actions/auth-actions';
import { SERVER_URL } from '../constants/url';
import { AuthContext } from '../context/AuthContext';
import { getToken } from '../utils/getToken';
import { saveToken } from '../utils/saveToken';
import React, { useState, useEffect, useContext } from 'react';

/**
 * Verify user authentication
 * @returns user session data
 */
export function useAuth() {
    // define login state
    const [loggedIn, setLoggedIn] = useState(false);
    // define user state
    const [user, setUser] = useState({
        token: "",
        _id: "",
        email: "",
        role: "",
        photo: ""
    });
    // declare and assign loading state
    const [loading, setLoading] = useState(true);
    // declare and initialize error state
    const [error, setError] = useState(null);
    // get the stored token 
    const token = getToken('token');
    // get the dispatch method
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        // set loading state to true
        setLoading(true);
        // fetch data
        fetch(SERVER_URL + "/auth/verify", {
            mode: 'cors',
            method: "POST",
            // body is token
            body: JSON.stringify({ token }),
            // header with authorization header jwt token
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            }
        })
            //    convert the response to json
            .then((res) => res.json())
            // destructure new response and get token
            .then((res) => {
                // check if token is true
                if (res.status === "success") {
                    // set loggedIn state to true
                    setLoggedIn(true);
                    // and the user state to 'rest'                     
                    setUser((c) => res.data);
                    saveToken("_id", res.data._id);
                    saveToken("email", res.data.email);
                    saveToken("role", res.data.role);
                    // dispatch the sign-in action 
                    dispatch(signIn({ ...res.data }));
                } else {
                    dispatch(signIn({}))
                }
            })
            // catch the error and set the error state
            .catch((err) => setError(err))
            // finally set the loading state to false
            .finally(() => {
                setLoading(false);
            });

    }, [dispatch, token]);

    return {
        user,
        loggedIn,
        loading,
        error,
        setLoggedIn
    };
}