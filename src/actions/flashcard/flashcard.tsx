import apiService from "../middleware/apiService";

export const createFlashcard = async (title: string, questions: any) => {
    const data = {
        title: title,
        questions: questions,
    }
    const responseData = await apiService.postDataWithAuth("/api/flashcard/", data)
    return responseData;
}

export const getAllFlashCards = async () => {
    const responseData = await apiService.getDataWithAuth('/api/flashcard/')
    return responseData;
}

export const getFlashCard = async (id: string) => {
    console.log(id);
    const responseData = await apiService.getDataWithAuth(`/api/flashcard/${id}`);
    return responseData;
}

export const deleteFlashCard = async (id: string) => {
    const data = {
        id: id,
    }
    const responseData = await apiService.postDataWithAuth(`/api/flashcard/delete`, data);
    return responseData;
}

export const editFlashCard = async (title: string, questions: any, id: string) => {
    const data = {
        id: id,
        title: title,
        questions: questions,
    }
    const responseData = await apiService.postDataWithAuth(`/api/flashcard/edit`, data);
    return responseData;
}