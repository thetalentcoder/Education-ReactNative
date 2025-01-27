import apiService from "../middleware/apiService";

export const postUpdatePurchaseID = async (data: any) => {
    
    const responseData = await apiService.postData(`/api/user/updatePurchaseId`, data);
    return responseData;
}