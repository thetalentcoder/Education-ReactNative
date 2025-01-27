import apiService from "../middleware/apiService";

export const getAllSliderCards = async () => {
    const responseData = await apiService.getDataWithAuth('/api/slidercard/')
    return responseData;
}