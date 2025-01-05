import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../constants/url";

export const useProduct = (productId: string) => {
    const [data, setData] = useState<any>({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${SERVER_URL}/products/${productId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setData(data.data?.product);
            } catch (error) {
                console.warn(error);
            }
        };
        fetchData();
    }, [productId]);

    return { data };
}