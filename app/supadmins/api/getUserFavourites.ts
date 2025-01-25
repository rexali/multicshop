import { SERVER_URL } from '../../../constants/url';

const getUsersFavouritesAPI = async (page: number = 1,subdomain: string = 'maindomain') => {

    try {
        let data = await fetch(`${SERVER_URL}/favourites?page=${page}&subdomain=${subdomain}`).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        return data.data?.favourites.map((favourite: any) => favourite.product);
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersFavouritesAPI
}