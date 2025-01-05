"use client"

const saveToken = (key: string, value: string) => {
    try {
        if (typeof window !== "undefined") {
            
            window.localStorage.setItem(key, value)
        }
       
    } catch (error) {
        console.warn(error);

    }
}
export {
    saveToken
}