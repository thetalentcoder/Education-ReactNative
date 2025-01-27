import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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
        return Promise.reject(error);
      }
    );

  }

  async refreshAuthToken() {
    const token = await AsyncStorage.getItem("token");
    this.#authToken = token; // Update the token at the class level
    
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
          return response;
        },
        (error) => {
          console.log("Error in response", error);
          return Promise.reject(error);
        }
      );

      const response = await this.#instance.get(url);
      
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
  async postData1(url: string) {
    try {
      const response = await axios.post(
        url,
        {}, // If the body is empty, you can pass an empty object
        {
          headers: {
            'Content-Type': 'application/json', // Define Content-Type
            'Accept': 'application/json'
          },
        }
      );
      return response["data"];
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to load slides. Please try again later.");
      throw error;
    }
  }
  async postlogin(url: string, data: any) {
    try {
      const response = await axios.post(
        url,
        data, // If the body is empty, you can pass an empty object
        {
          headers: {
            'Content-Type': 'application/json', // Define Content-Type
            'Accept': 'application/json'
          },
        }
      );
      await AsyncStorage.setItem("token", response["data"].token);
      return response["data"];
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to login.");
      throw error;
    }
  }

  async postregister(url: string, data: any) {
    try {
      const response = await axios.post(
        url,
        data, // If the body is empty, you can pass an empty object
        {
          headers: {
            'Content-Type': 'application/json', // Define Content-Type
            'Accept': 'application/json'
          },
        }
      );
      return response["data"];
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to register.");
      throw error;
    }
  }
  async postCategory(url: string) {
    try {
      const response = await axios.post(
        url,
        {
          headers: {
            'Content-Type': 'application/json', // Define Content-Type
            'Accept': 'application/json'
          },
        }
      );
      return response["data"];
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to fetch category data.");
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
