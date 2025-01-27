import { Question } from 'api/question/types';

export interface Exam {
  _id: string;
  name: string;
  isActive: boolean;
  category: { _id: string; name: string };
  sections: ExamSection[];
  minPassPercentage: number;
  orderIndex: number;
  availableTo: {
    organizations: string[];
    groups: string[];
  };
  statistics: {
    timesTaken: number;
    timesPassed: number;
    timesFailed: number;
    averageScore: number;
  };
}

export interface Quiz {
  _id: string;
  title: string;
  duration: number;
  isActive: boolean;
  questions: Question[];
  subcategory: string[];
}

export interface ExamSection {
  _id: string;
  name: string;
  duration: number;
  isActive: boolean;
  questions: Question[];
}

export interface ExamsCategory {
  _id: string;
  name: string;
  createdAt: Date;
  totalExams?: number;
}

export interface StoreExamsRequest {
  name: string;
  isActive: boolean;
  category: string;
  minPassPercentage: number;
  sections: Array<{
    name: string;
    duration: number;
    isActive: boolean;
    questions: Array<any>;
  }>;
}

export type UpdateExamRequest = StoreExamsRequest & {
  examId: string;
  orderIndex?: number;
};

export interface ExamSchedule {
  dateFrom: string;
  dateTo: string;
  examId: string;
}

export type UpdateExamScheduleRequest = ExamSchedule;

export interface UpdateQuizTrackRequest {
  quizTrackId: string;
  name: string;
}

export interface SubmitExamRequest {
  examId: string;
  answers: { questionId: string; answer: string }[];
}

export interface SubmitExamResponse {
  isPassed: boolean;
  message: string;
  percentageCorrect: number;
  questionsAndAnswers: Array<{
    question: {
      _id: string;
      question: string;
      answerExplanation: string;
      answers: { answer: string; _id: string }[];
    };
    sectionName: string;
    studentAnswer?: { questionId: string; answer: string };
    correct: { answer: string; correct: boolean; _id: string };
  }>;
}

export interface ExamResponse {
  result: Exam[];
  total: number;
}

export interface SaveExamProgressPayload {
  examId: string;
  time: Array<{
    sectionName: string;
    timeType: EXAM_TIME_TYPE;
    timeElapsed: number;
  }>;
  answers: { questionId: string; answer: string; answerId: string }[];
}
export interface ExamInProgressResponse {
  _id: string;
  exam: string;
  isInProgress: true;
  user: string;
  time: Array<{
    sectionName: string;
    timeType: EXAM_TIME_TYPE;
    timeElapsed: number;
  }>;

  answers: Array<{
    section: string;
    questionId: string;
    question: string;
    answer: string;
    answerId: string;
    allAnswers: any[];
    _id: string;
    categories: any[];
    id: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXAM_TIME_TYPE {
  STANDARD_TIME = 'standard',
  CUSTOM_TIME = 'custom',
  UNLIMITED = 'unlimited'
}
