import { BASE_URL, SERVER_URL } from "../../../constants/url";

const createReviewAPI = async (data: any, setPostSuccess: any, setPostError: any, setLoading: any) => {
    try {
        let response = await fetch(`${SERVER_URL}/ratings`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const { status, data: { rating } } = await response.json();
        if (status === "success" && rating._id) {
            setPostSuccess(status);
        } else {
            setPostError(status);
        }
    } catch (error: any) {
        setPostError("Error! " + error.message);
        console.warn(error);
    } finally {
        setTimeout(() => {
            setLoading('')
            setPostSuccess('');
            setPostSuccess('');
        }, 20000);
    }
}

export {
    createReviewAPI
}