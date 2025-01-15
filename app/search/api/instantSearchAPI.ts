'use client'

import { SERVER_URL } from "../../../constants/url";

export const instantSearchProductAPI = async (term: string, pageNumber?:number,subdomain: string = 'maindomain') => {
    try {
        let response = await fetch(`${SERVER_URL}/search?term=${term}&page=${pageNumber}&subdomain=${subdomain}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        return result.data?.products;    //.map((product:any)=>product.product_name);
    } catch (error) {
        console.log(error);
    }
};