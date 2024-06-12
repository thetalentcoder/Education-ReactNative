import apiService from "../middleware/apiService";

export const getAllQuestions = async (subCategory: string, page = 1, limit = 20) => {
    const encodedSubCategory = encodeURIComponent(subCategory)
    const responseData = await apiService.getDataWithAuth(`/api/question?category=${encodedSubCategory}&page=${page}&limit=${limit}`)
    return responseData;
}

export const getAllQuestionsCategories = async () => {
    const responseData = await apiService.getDataWithAuth('/api/question/category')
    return responseData;
}