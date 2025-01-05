import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const removeProductPicture = async (photoData: { productId: string, product_picture: string }) => {
    try {
        const { data } = await axios.patch(`${SERVER_URL}/products/removeproductpicture`, photoData, {
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (data.status === 'success') {

            return true;
        }

        return false;
    } catch (error: any) {
        console.log(error);
        return false;
    }

}

export{
    removeProductPicture
}