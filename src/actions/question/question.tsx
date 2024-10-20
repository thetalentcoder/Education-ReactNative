import apiService from "../middleware/apiService";

export const getAllQuestions = async (subCategories: string[], page = 1, limit = 20) => {
    const data = {
        page,
        limit,
        subCategories
    };
    const responseData = await apiService.postDataWithAuth("/api/question/getAllQuestions", data)
    console.log("##get question", responseData)
    return responseData;
}

export const getAllScenarioQuestions = async (subCategories: string[], page = 1, limit = 5) => {
    const data = {
        page,
        limit,
        subCategories
    };
    const responseData = await apiService.postDataWithAuth("/api/question/getAllScenarioQuestions", data)
    return responseData;
}


export const getAllQuestionsCategories = async () => {
    const responseData = await apiService.getDataWithAuth('/api/question/category')
    return responseData;
}