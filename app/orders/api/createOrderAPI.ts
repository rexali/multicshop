'use client'

import axios from "axios";
import { SERVER_URL } from "../../../constants/url";


const createOrderAPI = async (orderData: any) => {
   try {
      let { data } = await axios.post(`${SERVER_URL}/orders`, orderData, {
         headers: {
            'Content-Type': 'application/json',
         },
      });

      return data.data?.order;

   } catch (error) {
      console.warn(error);
   }
}

export {
   createOrderAPI
}