'use client'

/**
 * Post or get data using fetch api
 * @param url : an url of the api
 * @param option : optional parameters like body, get etc
 * @returns array or object result
 */
const fetchData = async (url: string, option: any) => {
    try {
        let response = await fetch(url, {
            ...option,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.warn(error);
    }
}

export {
    fetchData
}