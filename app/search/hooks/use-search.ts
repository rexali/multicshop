'use client'

import { BASE_URL } from "../../../constants/url";
import React from "react";

export function useSearch(term: any, pageNumber: any) {
    
    const [data, setData] = React.useState();

    React.useEffect(() => {
        const searchProducts = async () => {
            try {
                let response = await fetch(`${BASE_URL}/searchs?term=${term}&page=${pageNumber}&subdomain=maindomain`, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json()

                setData(result.data.products);
            } catch (error) {
                console.log(error);
            }
        };

        searchProducts();

    }, [term, pageNumber]);


    return { data };
}
