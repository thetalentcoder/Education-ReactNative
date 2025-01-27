import { toast } from 'react-toastify';

import {
  Exam,
  ExamInProgressResponse,
  ExamsCategory,
  SaveExamProgressPayload,
  StoreExamsRequest,
  SubmitExamRequest,
  SubmitExamResponse,
  UpdateQuizTrackRequest,
  UpdateExamRequest,
  UpdateExamScheduleRequest,
} from './types';

import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { TakeExam } from '../students/types';

// export const fetchExams = async (params?: Filters): Promise<ExamResponse> => {
//   try {
//     const request = await apiCall();
//     const data = await request({ url: `exams/getExams`, method: 'POST', data: params }).then(({ data }) => {
//       return Promise.resolve(data);
//     }, err => {
//       toast.error(err.data.message);
//       return Promise.reject(err);
//     });
//     return Promise.resolve(data);
//   } catch (error: any) {
//     return Promise.reject(error);
//   }
// };

export const fetchExamsCategories = async (): Promise<ExamsCategory[]> => {
  try {
    const request = await apiCall();
    const data = await request({ url: `quiz/track`, method: 'GET' }).then(({ data }) => {
      return Promise.resolve(data);
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getQuizzesWithFilter = async (params?: Filters): Promise<any> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `quiz/getQuizzesWithFilter`, method: 'POST', data: params });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteQuizzes = async (ids: string[]): Promise<void> => {
  try {
    const request = await apiCall();
    await request({ url: `quiz/currated`, method: 'DELETE', data: { quizzes: ids } });
    toast.error(`Card${ids.length === 1 ? '' : 's'} deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const storeExam = async (exam: StoreExamsRequest) => {
  try {
    const request = await apiCall();
    const data = await request({ url: `quiz/currated`, method: 'POST', data: exam }).then(({ data }) => {
      toast.success('Exam created!');
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    toast.error(error.data.message);
    return Promise.reject(error);
  }
};

export const updateExam = async (exam: UpdateExamRequest) => {
  try {
    const request = await apiCall();
    const data = await request({ url: `quiz/currated`, method: 'PUT', data: exam }).then(({ data }) => {
      toast.info('Exam updated!');
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
};

export const updateExamSchedule = async (exam: UpdateExamScheduleRequest) => {
  try {
    const request = await apiCall();
    const data = await request({ url: `exams/schedule`, method: 'PUT', data: exam }).then(({ data }) => {
      toast.info('Exam Scheduled!');
      return Promise.resolve(data);
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
};

export const fetchSingleExamSchedule = async (examId: string) => {
  try {
    const request = await apiCall();
    const data = await request({ url: `exams/schedule`, method: 'POST', data: { examId } }).then(({ data }) => {
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
};



export const deleteExams = async (ids: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `exams`, method: 'DELETE', data: { exams: ids } });
    toast.error(`Exam${ids.length === 1 ? '' : 's'} deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const addExamCategory = async (name: string) => {
  try {
    const request = await apiCall();
    const data = await request({ url: `quiz/track`, method: 'POST', data: { name } });
    toast.success('Exam category created!');
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateExamCategory = async (payload: UpdateQuizTrackRequest) => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `quiz/track`, method: 'PUT', data: payload });
    toast.info('Exam category updated!');
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteExamCategories = async (quizTrackIds: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `quiz/track`, method: 'DELETE', data: { quizTrackIds } });
    toast.error(`Exam ${quizTrackIds.length === 1 ? 'category' : 'categories'} deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const submitExam = async (body: SubmitExamRequest): Promise<SubmitExamResponse> => {
  try {
    const request = await apiCall();
    const data = await request({ url: `exams/submit`, method: 'POST', data: body }).then(({ data }) => {
      return data;
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return typeof data.isPassed === 'boolean' ? data : undefined;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchSingleExam = async (examId: string): Promise<Exam> => {
  try {
    const request = await apiCall();
    const data = await request({ url: `exams/exam`, method: 'GET', params: { examId } }).then(({ data }) => {
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const uploadExamCsv = async (examCsv: File) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `exams/import`,
      method: 'POST',
      params: { examCsv }
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const saveExamProgress = async (payload: SaveExamProgressPayload) => {
  try {
    const request = await apiCall();
    await request({ url: `exams/progress`, method: 'POST', data: payload }).then(({ data }) => {
      //toast.success('Exam progress saved successfully!');
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchExamInProgress = async (examTakenId: string): Promise<ExamInProgressResponse> => {
  try {
    const request = await apiCall();
    const data = await request({ url: `exams/progress`, method: 'GET', params: { examTakenId } }).then(({ data }) => {
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchExamsTaken = async (userId: string): Promise<TakeExam[]> => {
  try {
    const request = await apiCall();
    const data = await request({ url: `examsTaken/user`, method: 'GET', params: { userId } }).then(({ data }) => {
      return Promise.resolve(data)
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};


