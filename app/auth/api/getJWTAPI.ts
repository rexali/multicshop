'use client'

import { getJWToken } from "../../../utils/getJWToken";
import { saveToken } from "../../../utils/saveToken";

const getJWTAPI = async () => {
    try {
        const jwt = await getJWToken();
        saveToken('jwtoken', jwt?.jwtoken);
        return jwt?.jwtoken;
    } catch (error) {
        console.warn(error);
    }

};

export {
    getJWTAPI
}
