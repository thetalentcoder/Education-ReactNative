import { updatePassword } from "../auth/auth";
import apiService from "../middleware/apiService";

export const getMe = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/me");
    return responseData;
}

export const getSurvivorLevel = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/survivorLevel");
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

export const getRankingSeason = async(season = 1, mode = "") => {
    const data = {
        season: season,
        mode: mode
    }
    const responseData = await apiService.postDataWithAuth("/api/user/rankingSeason", data);
    return responseData;
}

export const updateUser = async (id: string, avatarUrl: string) => {
    const data = {
        avatarUrl: avatarUrl
    }
    const responseData = await apiService.putDataWithAuth(`/api/user/${id}`, data)
    return responseData;
}

export const updateUserSettings = async (id: string, fullname: string, newPassword: string) => {
    const passwordUpdate = await updatePassword(newPassword);

    const data = {
        fullname: fullname
    }
    const responseData = await apiService.putDataWithAuth(`/api/user/${id}`, data)
    return {
        newUser: { ...responseData },
        passwordUpdated: passwordUpdate,
    };
}