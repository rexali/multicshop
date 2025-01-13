import React, { useState } from "react";
import { SERVER_URL } from "../../../constants/url";

export const useFilterData = (page: number, filters: any[]) => {
    const [data, setData] = useState<any>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetch(`${SERVER_URL}/filterings?page=${page}&filter1=${filters[0]}&filter2=${filters[1]}&subdomain=maindomain`).then(res => res.json());
                if (data.data === null) {
                    setData([]);
                }
                setData(data.data.products);
            } catch (error) {
                console.warn(error);
            }
        }
        fetchData();

    }, [filters, page]);

    return { data };
}