import apiService from "../middleware/apiService";

export const getAllQuizData = async () => {
    const responseData = await apiService.getDataWithAuth("/api/quiz");
    return responseData;
}

export const getQuizDataDetail = async (id: string) => {
    
    const responseData = await apiService.getDataWithAuth(`/api/quiz/${id}`);
    
    return responseData;
}

export const postSubmitQuizResult = async (data: any) => {
    
    const responseData = await apiService.postDataWithAuth(`/api/quiz/submit`, data);
    return responseData;
}