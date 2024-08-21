import apiService from "../middleware/apiService";

export const getTotalPoints = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/points/total");
    return responseData;
}

export const getLastTenDayPoint = async (numDays = 10) => {
    const data = {
        numDays,
    };
    const responseData = await apiService.postDataWithAuth("/api/user/points/lastDays", data);
    return responseData;
}

export const getMonthPoint = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/points/thisMonth");
    return responseData;
}

export const getLastSeason = async () => {
    const responseData = await apiService.getDataWithAuth("/api/user/points/lastSeason");
    return responseData;
}