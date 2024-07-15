import apiService from "../middleware/apiService";

export const getMe = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/me");
    return responseData;
}

export const getTopRankingUsers = async (mode = "") => {
    const data = {
        limit: 10,
        sortBy: "score",
        mode: mode
    }
    const responseData = await apiService.postDataWithAuth("/api/user/ranking", data)
    return responseData;
}

export const updateUser = async (id: string, avatarUrl: string) => {
    const data = {
        avatarUrl: avatarUrl
    }
    const responseData = await apiService.putDataWithAuth(`/api/user/${id}`, data)
    return responseData;
}