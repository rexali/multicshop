"use client";

const getToken = (key: string) => {
    try {
        if (typeof window !== "undefined") {
            
            return  window.localStorage.getItem(key)
        }
    } catch (error) {
        console.warn(error);
    }
}

export {
    getToken,
} 