'use client'

import { SERVER_URL } from "../../../constants/url";

/**
 * Register a new user
 * @param firstName : user first name 
 * @param lastName : user last name
 * @param email : user email
 * @param password : user password
 * @param remember_me : remember user next time
 * @returns a booleen value
 */
export async function signUpBusinessAPI(
    businessName: any,
    subdomain: any,
    email: any,
    password: any,
    remember_me?: any
) {

    try {
        // fetch a data with method and mode set
        const resp = await fetch(`${SERVER_URL}/auth/register`, {
            method: 'POST',
            mode: "cors",
            // set content type and authorization headers
            headers: {
                'Content-Type': 'application/json'
            },
            // convert the body or data to json string
            body: JSON.stringify({
                email: email,
                password: password,
                remember_me: remember_me,
                subdomain: subdomain,
                businessName: businessName
            }),
        });
        // wait for registration result
        const result = await resp.json();

        // check result value
        if (result.status === "success") {
            // return result
            return result;
        } else {
            return result;
        }

    } catch (error) {
        // log error if any
        console.warn(error);
    }

}
