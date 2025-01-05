import { fetchData } from "../../../app/messages/api/fetchDataAPI";
import { SERVER_URL } from "../../../constants/url";

const createQouteAPI = async (
    event: any,
    setSuccess: any,
    setError: any,
    setLoading:any
) => {
    // prevent default
    event.preventDefault();
    // check userId is defined
    try {
        const {
            email,
            phone,
            productId,
            message
        } = event.target.elements;

        const qouteData = {
            email: email.value,
            phone: phone.value,
            productId: productId.value,
            message: message.value
        }
        let result = await fetchData(`${SERVER_URL}/qoutes`, { body: JSON.stringify(qouteData), method: "post" });
        if (result.data.qoute._id) {
            setLoading('');
            setSuccess("Success")
        } else {
            setLoading('');
            setError("Error!")
        }
    } catch (error:any) {
        setLoading('');
        setError("Error! "+error.message)
        console.warn(error);
    }finally{
        setTimeout(() => {
            setLoading('');
            setSuccess("")
            setLoading('');       
        }, 20000);
       
    };
}

export {
    createQouteAPI
}