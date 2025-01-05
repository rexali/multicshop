'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const createTransactionAPI = async (transactionData: any) => {
   try {
      let { data } = await axios.post(`${SERVER_URL}/transactions`, transactionData, {
         headers: {
            'Content-Type': 'application/json',
         }
      });
      if (data.data.transaction._id) {
         return true
      };
      return false
   } catch (error) {
      console.warn(error);
   }
}

export {
   createTransactionAPI
}