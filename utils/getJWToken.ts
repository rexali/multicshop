'use client'

import { BASE_URL } from "@/constants/url";
/**
 * Get a jwt token strin
 * @returns a token object
 */
async function getJWToken() {
  try {
    // fetch data
    const res = await fetch(BASE_URL + "/jwt", { mode: "cors", method: "GET" });
    // get jwtoken
    const { jwtoken } = await res.json();
    // return jwtoken
    return { jwtoken };
  } catch (error) {
    // print error
    console.warn(error);
  }

}

export {
  getJWToken
}
