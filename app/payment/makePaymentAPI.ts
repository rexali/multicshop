import { BASE_URL } from "../../constants/url";
import { getToken } from "../../utils/getToken";
import { saveToken } from "../../utils/saveToken";
import axios from "axios";

export async function makePaymentAPI(amount: any, email: any) {

    try {
        let { data: {
            status,
            data: {
                authorization_url,
                reference
            }
        }
        } = await axios.post(`${BASE_URL}/get_transaction_url`, { amount, email }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken('jwtoken'),
            }
        });

        if (status) {
            if (typeof window !== "undefined") {
                saveToken('reference', reference);
                window.location.assign(authorization_url);
            }
        }

    } catch (error) {
        console.warn(error);
    }
};