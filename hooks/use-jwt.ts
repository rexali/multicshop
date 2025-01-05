import React, { useState } from "react";
import { saveToken } from "../utils/saveToken";
import { getJWToken } from "../utils/getJWToken";

export const useJWT = () => {
    const [token, setToken] = useState<string>();

    const fetchData = async () => {
        try {
            const jwt = await getJWToken();
            saveToken('jwtoken',jwt?.jwtoken);
            setToken(jwt?.jwtoken);
        } catch (error) {
            console.warn(error);
        } 
    };

    React.useEffect(() => {

            fetchData();

    }, []);

    return {token};
}