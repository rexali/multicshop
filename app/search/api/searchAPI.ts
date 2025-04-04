'use client'

import {SERVER_URL } from "../../../constants/url";

const searchAPI = async (term: any, pageNumber: any = 1,subdomain: string = 'maindomain') => {
   try {
      let response = await fetch(`${SERVER_URL}/search?term=${term}&page=${pageNumber}&subdomain=${subdomain}`, {
         method: "GET",
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json'
         }
      });

      let data = await response.json();
      return data.data?.products;
   } catch (error) {
      console.log(error);
   }
}



export {
   searchAPI
}
