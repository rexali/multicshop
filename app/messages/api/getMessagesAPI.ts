'use client'

import { SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getMessagesAPI = async (pageNumber: any = 1,subdomain: string = 'maindomain') => {

  try {
    let { data } = await axios.get(`${SERVER_URL}/messages?page=${pageNumber}&subdomain=${subdomain}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return data.data?.messages;

  } catch (error) {
    console.warn(error);
  }

};

export {
  getMessagesAPI
}