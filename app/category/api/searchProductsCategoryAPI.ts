'use client'

import { SERVER_URL } from "../../../constants/url";

export const searchProductsCategoryAPI = async (term: string, pageNumber?: number, subdomain: string = 'maindomain') => {
    try {
        let response = await fetch(`${SERVER_URL}/category?term=${term}&page=${pageNumber}&subdomain=${subdomain}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        return result.data?.products;
    } catch (error) {
        console.log(error);
    }
};
