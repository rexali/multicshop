import React, { useContext } from "react";
import axios from "axios";
import { BASE_URL, SERVER_URL } from "../constants/url";
import { getToken } from "../utils/getToken";
import { AuthContext } from "../context/AuthContext";
import { restoreToken } from "../store/actions/auth-actions";

const useVerify = () => {

    // get dispatch from contex
    const { dispatch } = useContext(AuthContext);

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            // declare user token 
            let userToken;
            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userToken = getToken('token');
               
                // After restoring token, we may need to validate it in production apps
                const { data } = await axios.post(`${SERVER_URL}/auth/verify`, { token: userToken }, {
                    // header
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    }
                });
                // check if sign is a success
                if (data.status ==="success" && data.data.token) {
                    // restore token if found
                    dispatch(restoreToken(data.data.token));
                } else {
                    // make token null 
                    dispatch(restoreToken(null));
                }
            } catch (e) {
                // Restoring token failed
                console.warn(e);
            }

        };

        bootstrapAsync();
    }, [dispatch])
}

export { useVerify };
