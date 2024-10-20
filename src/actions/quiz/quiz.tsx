import apiService from "../middleware/apiService";

export const getAllQuizData = async () => {
    const responseData = await apiService.getDataWithAuth("/api/quiz");
    return responseData;
}

export const getQuizDataDetail = async (id: string) => {
    console.log(id);
    const responseData = await apiService.getDataWithAuth(`/api/quiz/${id}`);
    console.log(responseData);
    return responseData;
}

export const postSubmitQuizResult = async (data: any) => {
    console.log("##final submit data::", data)
    const responseData = await apiService.postDataWithAuth(`/api/quiz/submit`, data);
    return responseData;
}