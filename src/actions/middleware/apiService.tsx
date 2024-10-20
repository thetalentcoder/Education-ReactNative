import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "https://ptfe-game-backend-a0cc7b8d3a77.herokuapp.com";

class ApiService {
  #instance;
  #authToken = null; // Token stored at the class level

  constructor() {
    this.#instance = axios.create({
      baseURL: `${API_URL}`,
    });

    this.#instance.interceptors.request.use((config) => {
      if (this.#authToken) {
        // Use the token if it exists
        config.headers["AUTH_TOKEN"] = this.#authToken;
      }
      return config;
    });

    this.#instance.interceptors.response.use(
      (response) => {
        // Logging or other operations on response
        return response;
      },
      (error) => {
        console.log("Error in response", error);
        return Promise.reject(error);
      }
    );

    console.log("API_URL: " + API_URL);
  }

  async refreshAuthToken() {
    const token = await AsyncStorage.getItem("token");
    this.#authToken = token; // Update the token at the class level
    console.log("###API token", token);
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
      this.#instance.interceptors.response.use(
        (response) => {
          console.log(
            "Token from request headers: ",
            response.config.headers["AUTH_TOKEN"]
          );
          return response;
        },
        (error) => {
          console.log("Error in response", error);
          return Promise.reject(error);
        }
      );

      const response = await this.#instance.get(url);
      console.log(response.data.fullname);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async putDataWithAuth(url: string, data: any) {
    try {
      await this.refreshAuthToken();
      const response = await this.#instance.put(url, data);
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
