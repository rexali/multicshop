import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const updateUserProfileAPI = async (profileData: any, setPostSuccess?: any, setPostError?: any, setLoading?:any) => {

    try {
        let { data } = await axios.patch(`${SERVER_URL}/profiles`, profileData, {
            withCredentials: false,
            headers: {
                'Content-Type': 'multipart/form-data',
            }, 
        });

        if (data.status) {
            setPostSuccess(data.status);
            setLoading('');
        } else {
            setPostError(data.status);
            setLoading('');
        }

    } catch (error: any) {
        console.warn(error);
        setPostError('Error! ' + error.message)
        setLoading('')

    }finally{
        setTimeout(() => {
            setPostSuccess('')
            setPostError("")
            setLoading('')
        }, 20000);
    }

};

export {
    updateUserProfileAPI
}