import { QuizResultResponse } from 'api/quiz/types';
import {
  AnalyticsStudentsTypes,
  AnalyticsExamTypes,
  StudentExamTakenTypes,
  GeneralExamInfo,
  StudentAnalyticsPayload,
  SingleQuestionAnalytics,
  StudnetsAnalysisResponse
} from './types';

import { apiCall } from 'api';

export const fetchAttempts = async ({ userIDs, examID }: StudentAnalyticsPayload): Promise<String[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/attempts`,
      method: 'GET',
      params: { userIds: userIDs, examId: examID }
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchAnalyticsStudents = async (): Promise<AnalyticsStudentsTypes> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `analytics/students`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchAnalyticsExam = async (examIds: string[]): Promise<AnalyticsExamTypes> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `analytics/exams`, method: 'GET', params: { examIds } });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchStudentExamTaken = async ({
  userIDs,
  examID,
  attempts
}: StudentAnalyticsPayload): Promise<StudentExamTakenTypes> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/studentExamTaken`,
      method: 'GET',
      params: { userIds: userIDs, examId: examID, attempts }
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const removeStudentExamTaken = async (params: { examTakenID: string; examId: string }): Promise<any> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/removeStudentExamTaken`,
      method: 'GET',
      params
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchStudentQuizTaken = async ({
  userID,
  quizID
}: {
  userID: string | undefined;
  quizID: string | undefined;
}): Promise<StudentExamTakenTypes> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/studentQuizTaken`,
      method: 'GET',
      params: { userID: userID, quizID: quizID }
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const removeStudentQuizTaken = async (params: { quizTakenID: string; quizId: string }): Promise<any> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/removeStudentQuizTaken`,
      method: 'GET',
      params
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchStudentQuizAttempts = async ({
  userID,
  quizID
}: {
  userID: string | undefined;
  quizID: string | undefined;
}): Promise<QuizResultResponse[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/studentQuizAttempts`,
      method: 'GET',
      params: { userID: userID, quizID: quizID }
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchExamGeneralInfo = async (examID: string): Promise<GeneralExamInfo> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/examGeneralInfo`,
      method: 'GET',
      params: { examId: examID }
    });

    return data.exam;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchOrganizationAnalytics = async (organizationId: string) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `analytics/organizationAnalytics`,
      method: 'GET',
      params: { organizationId }
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchSingleQuestionAnalytics = async (questionId: string): Promise<SingleQuestionAnalytics> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `analytics/singleQuestionAnalytics`, method: 'GET', params: { questionId } });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchStudentAnalytics = async (params: {
  groupId: string;
  examId: string;
}): Promise<StudnetsAnalysisResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `analytics/studentPerformance`, method: 'GET', params });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchStudentExamTakenPeerAverage = async (examId: string | null): Promise<any> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `analytics/studentExamTakenPeerAverage`, method: 'GET', params: { examId } });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
