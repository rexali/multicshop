import useSWR from 'swr';
import { fetchUserProfile } from '../api/getUserProfileAPI';
import { SERVER_URL } from "../../../constants/url";

function useProfile(userId: string) {

    const { data, error, isLoading } = useSWR(`${SERVER_URL}/profiles/` + userId, fetchUserProfile);

    return { user: data, error, isLoading }
}

export {
    useProfile
}
