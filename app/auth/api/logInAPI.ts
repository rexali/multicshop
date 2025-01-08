'use client'

import { SERVER_URL } from "../../../constants/url";
import { saveToken } from "../../../utils/saveToken";

/**
 * Sign in user with provided input
 * @param email 
 * @param password 
 * @returns boolean value
 */
export async function logInAPI(email: any, password: any, subdomain?:string) {
    try {
        // fetch data with email and password
        const resp = await fetch(SERVER_URL + "/auth/login", {
            method: 'POST',
            mode: "cors",
            // header
            headers: {
                'Content-Type': 'application/json'
            },
            // user entered data
            body: JSON.stringify({
                email, 
                password,
                subdomain
            }), 
        });
        // get the token and result
        const result = await resp.json();
        
        // check if login is success
        if (result.status === "success" && result.data.token) {
            // save token
            saveToken("token", result.data.token);

            return result;
        } else {

            return result;
        }

    } catch (error) {
        console.log(error);
    }

}
