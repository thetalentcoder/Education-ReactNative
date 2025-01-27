import Axios from 'axios';
import { getStorageItem } from 'utils/storage';

// import { auth } from 'config/firebase-config';

const baseURL = process.env.REACT_APP_API_URL;

export const apiCall = async () => {
  try {
    // Headers
    const headers: any = { 
      Accept: 'application/json',
      "Access-Control-Allow-Origin" : "*",
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Methods" : "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
    };

    // const TOKEN = await auth.currentUser?.getIdToken();
    const TOKEN = getStorageItem("TOKEN");

    if (TOKEN) {
      headers['auth_token'] = `${TOKEN}`;
    }
    // Create axios instance
    const axios = Axios.create({ baseURL, headers });
    // Add a request interceptor
    axios.interceptors.response.use(
      (data) => Promise.resolve(data),
      ({ response }) => {
        console.error(response);
        return Promise.reject(response);
      }
    );

    return axios;
  } catch (err: any) {
    return Promise.reject(err);
  }
};
