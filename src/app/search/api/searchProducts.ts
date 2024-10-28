'use client'

import {SERVER_URL } from "@/constants/url";

const searchProducts = async (term: any, pageNumber: any = 1) => {
   try {
      let response = await fetch(`${SERVER_URL}/search?term=${term}&page=${pageNumber}`, {
         method: "GET",
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json'
         }
      });

      let data = await response.json();
      return data.data.products;
   } catch (error) {
      console.log(error);
   }
}



export {
   searchProducts
}
