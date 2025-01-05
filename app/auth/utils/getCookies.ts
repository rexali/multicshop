import {  cookies  } from "next/headers";
/**
 * Get a given cookie
 * @param name name of the cookie
 * @returns cookie object e.g., {name:"", value:""}
 */
export async function getCookies(name:string) {
    // get all the cookies
    const store = cookies();
    // get cookie object with the name token
    const cookieObject = (await store).get(name);

    return cookieObject;
}
