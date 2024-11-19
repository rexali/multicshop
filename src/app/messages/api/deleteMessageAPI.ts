import { BASE_URL, SERVER_URL } from "@/constants/url";

const deleteMessageAPI = async (data: { messageId: any }) => {
    try {
        let result = await fetch(`${SERVER_URL}/messages`, {
            method: "delete",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return await result.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    deleteMessageAPI
}