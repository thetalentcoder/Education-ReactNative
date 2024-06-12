import apiService from "../middleware/apiService";

export const getMe = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/me");
    return responseData;
}