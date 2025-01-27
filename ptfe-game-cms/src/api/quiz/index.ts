import { toast } from 'react-toastify';
import { apiCall } from '..';
import {
  EditQuizPaylaod,
  QuizPayload,
  QuizQuestion,
  QuizResultResponse,
  RandomQuestionsPayload,
  SingleQuiz,
  SubmitQuizPayload
} from './types';

export const fetchQuizzes = async () => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz`,
      method: 'GET'
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchSingleQuiz = async (id: string): Promise<SingleQuiz> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz/${id}`,
      method: 'GET'
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const createQuiz = async (payload: QuizPayload) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz`,
      method: 'POST',
      data: payload
    });

    toast.success('Quiz created successfully!');
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteQuizzes = async (quizIds: string[]) => {
  try {
    const request = await apiCall();
    await request({
      url: `quiz`,
      method: 'DELETE',
      data: { quizIds }
    });

    toast.success('Deleted successfully!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const editQuiz = async ({ id, payload }: EditQuizPaylaod) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz/${id}`,
      method: 'PUT',
      data: payload
    });

    toast.success('Quiz updated successfully!');
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchNumberOfQuestions = async (subcategory: string): Promise<number> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `questions/count`,
      method: 'GET',
      params: { subcategory }
    });

    return data.numberOfQuestions;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchRandomQuestions = async (payload: RandomQuestionsPayload): Promise<QuizQuestion[]> => {
  const { subcategories, existingQuestions } = payload;
  const request = await apiCall();

  try {
    const promises = subcategories.map(
      async ({ _id, count }) =>
        await request({
          url: `questions/random`,
          method: 'GET',
          params: {
            subcategory: _id,
            count,
            existingQuestions
          }
        }),
      []
    );

    const res = await Promise.all(promises);
    const result = Array.from(new Set(res.map(({ data }) => data.randomQuestions).flat()));

    return result;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const submitQuiz = async (payload: SubmitQuizPayload): Promise<QuizResultResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz/submit`,
      method: 'POST',
      data: payload
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuizzesTaken = async (userId: string): Promise<QuizResultResponse[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `quiz`,
      method: 'GET',
      params: { userId }
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};