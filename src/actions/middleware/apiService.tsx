import axios from 'axios';
// import { API_URL } from '@env';
import { auth } from "src/config/firebase-config";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

class ApiService {
  #authToken = '';
  #instance;

  constructor() {
    this.#instance = axios.create({
      baseURL: `${API_URL}`,
    });

    console.log("API_URL: " + API_URL);
  }

  async refreshAuthToken() {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      if (this.#authToken != token) {
        this.#authToken = token;
        this.#instance.interceptors.request.use(config => {
          config.headers['FIREBASE_AUTH_TOKEN'] = `${this.#authToken}`;
          return config;
        });
      }
    }
  }

  async postDataWithAuth(url: string, data: any) {
    try {
      await this.refreshAuthToken();
      const response = await this.#instance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getDataWithAuth(url: string) {
    try {
      await this.refreshAuthToken();
      const response = await this.#instance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postData(url: string, data: any) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getData(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const apiService = new ApiService();

export default apiService;