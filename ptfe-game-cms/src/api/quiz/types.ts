import { Question } from '../question/types';

export type QuizQuestion = { _id: string; question: string };
export interface Quiz {
  _id: string;
  name: string;
  duration: number;
  questions: QuizQuestion[];
  subcategory: string[];
}
export interface SingleQuiz extends Omit<Quiz, 'questions'> {
  questions: Question[];
}

export interface QuizPayload extends Omit<Quiz, 'questions' | '_id'> {
  questions: string[];
}

export interface EditQuizPaylaod {
  id: string;
  payload: QuizPayload;
}

export interface RandomQuestionsPayload {
  subcategories: { _id: string; count: number }[];
  existingQuestions?: string[];
}

export interface SubmitQuizPayload {
  quizId: string;
  answers: { questionId: string; answer: string }[];
}

export interface QuizResultResponse {
  id: string;
  name: string;
  questionsAnsweredCorrectly: number;
  totalQuestions: number;
  questionsAndAnswers: {
    [key: string]: {
      question: string;
      correctAnswer: string;
      studentAnswer: string;
      answerExplanation: string;
      isCorrect: false;
      allAnswers: {
        _id: string;
        answer: string;
        correct: false;
      }[];
    };
  };
}

export interface QuizFormState {
  id: string;
  name: string;
  duration: number;
  subcategories: { _id: string; count: number }[];
  questions: QuizQuestion[];
}
