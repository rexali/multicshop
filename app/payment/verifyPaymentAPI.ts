import { BASE_URL } from "../../constants/url";
import { getToken } from "../../utils/getToken";
import axios from "axios";

export async function verifyPayment(reference: any) {

    try {
        let { data } = await axios.post(`${BASE_URL}/verify_transaction`, { reference }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken('jwtoken'),
            }
        });

        return data;

    } catch (error) {
        console.warn(error);
    }
};