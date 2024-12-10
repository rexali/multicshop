import React, { useState } from "react";
import { SERVER_URL } from "@/constants/url";

export const useSortData = (page: number, sort: string) => {
    const [data, setData] = useState<any>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetch(`${SERVER_URL}/sortings?page=${page}&sort=${sort}`).then(res => res.json());
                if (data.data === null) {
                    return []
                }
                setData(data.data.products);
            } catch (error) {
                console.warn(error);
            }
        }
        fetchData();

    }, [sort, page]);

    return { data };
}