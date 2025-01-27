import { toast } from 'react-toastify';
import {
  AddQuestionCategoryRequest,
  Question,
  QuestionResponse,
  QuestionsCategory,
  SavedQuestion,
  UpdateQuestionCartegoryRequest
} from './types';

import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { reactQueryConfig } from 'lib/react-query';

export const fetchQuestionsFaster = async (params?: {
  page: number;
  limit: number;
  search: string;
}): Promise<QuestionResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `questions`, method: 'GET', params });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuestions = async (params?: Filters): Promise<QuestionResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/getQuestions`, method: 'POST', data: params });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuestionsById = async (questionIds: any): Promise<Question> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/fetchQuestionsByIds`, method: 'POST', data: { questionIds } });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};


export const fetchSingleQuestion = async (questionId: string): Promise<Question> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/question`, method: 'GET', params: { questionId } });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuestionsCategories = async (): Promise<QuestionsCategory[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/category`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const storeQuestion = async (question: FormData): Promise<Question> => {
  try {
    console.log(question.get('image'));
    const request = await apiCall();
    const { data } = await request({ url: `question`, method: 'POST', data: question });
    toast.success('Question created!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateQuestion = async (question: FormData): Promise<Question> => {
  try {
    console.log(question);
    const request = await apiCall();
    const { data } = await request({ url: `question`, method: 'PUT', data: question });
    toast.info('Question updated!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteQuestions = async (ids: string[]): Promise<void> => {
  try {
    const request = await apiCall();
    await request({ url: `question`, method: 'DELETE', data: { questions: ids } });
    toast.error(`Question${ids.length === 1 ? '' : 's'} deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addQuestionCategory = async (payload: AddQuestionCategoryRequest) => {
  try {
    const request = await apiCall();
    await request({ url: `question/category`, method: 'POST', data: payload });
    toast.success('Question category created!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateQuestionCategory = async (payload: UpdateQuestionCartegoryRequest) => {
  try {
    const request = await apiCall();
    await request({ url: `question/category`, method: 'PUT', data: payload });
    toast.info('Question category updated!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteQuesionCategories = async (questionCategoryIds: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `question/category`, method: 'DELETE', data: { questionCategoryIds } });
    toast.error(`Question${questionCategoryIds.length === 1 ? '' : 's'} category deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

// Save Question CRUD
export const fetchSavedQuestions = async (): Promise<SavedQuestion[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/save`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const saveQuestion = async (questions: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `question/save`, method: 'POST', data: { questions } });
    toast.success('Question saved!');

    reactQueryConfig.refetchQueries('me');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteSavedQuestion = async (questions: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `question/save`, method: 'DELETE', data: { questions } });
    toast.error('Question deleted!');

    reactQueryConfig.refetchQueries('me');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getImgUrl = async (formData: FormData) => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/scenario/image`, method: 'POST', data: formData });
    return data.result;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuestionOfDay = async (): Promise<any> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `question/questionOfTheDay`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
