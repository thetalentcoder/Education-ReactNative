import apiService from "../middleware/apiService";

const API_URL = "https://ptfe-game-backend-a0cc7b8d3a77.herokuapp.com";

export const getAllSliders = async () => {
    const responseData = await apiService.postData1(`${API_URL}/api/slider/getsliders`)
    return responseData;
}

export const appleLogin = async (email: string, password: any) => {
    const data = {
        email: email,
        password: password,
    }
    console.log("this is applelogin", data);
    const responseData = await apiService.postlogin(`${API_URL}/api/user/appleloginuser`, data)
    return responseData;
}
export const appleregister = async (email: string, firstName: string, lastname: string, password: string) => {
    const data = {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastname
    }
    const responseData = await apiService.postregister(`${API_URL}/api/user/register`, data)
    return responseData;
}

export const getAllQuestionsCategoriesWithoutAuth = async () => {
    const responseData = await apiService.postCategory(`${API_URL}/api/question/category`)
    return responseData;
}
