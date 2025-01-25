import { SERVER_URL } from '../../../constants/url';
import axios from "axios";

const approveProductAPI = async (approvedData: any) => {

    try {
        let data = await axios.patch(`${SERVER_URL}/products/approveproduct`, approvedData, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (data.data.status === 'success') {
            return true;
        }

        return false;
    } catch (error) {
        console.warn(error);
    }
};

export {
    approveProductAPI
}