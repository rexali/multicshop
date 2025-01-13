import { BASE_URL, SERVER_URL } from "../../../constants/url";
import axios from "axios";

const getQoutesAPI = async (pageNumber: any = 1,subdomain: string = 'maindomain') => {

  try {
    let { data } = await axios.get(`${SERVER_URL}/qoutes?page=${pageNumber}&subdomain=${subdomain}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    if (data.data === null) {
      return [];
    }
    return data.data?.qoutes;

  } catch (error) {
    console.warn(error);
  }

};

export {
  getQoutesAPI
}