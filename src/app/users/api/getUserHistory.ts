import { SERVER_URL } from "@/constants/url";

const getUserHistoryAPI = async (userId:string,page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/transactions?page=` + page +'&userId='+userId).then(res=>res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.transactions;
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUserHistoryAPI
}