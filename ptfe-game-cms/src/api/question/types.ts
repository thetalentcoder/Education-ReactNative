export interface QuestionsCategory {
  _id: string;
  subcategories: string[];
  name: string;
  createdAt: Date;
}

export interface PostQuestionRequest {
  question: string;
  answerExplanation: string;
  image?: string;
  vimeoId? : string;
  deleteImage: boolean;
  isActive: boolean;
  categories: Array<{ category: string; subcategories: Array<string> }>;
  answers: Array<{ answer: string; correct: boolean }>;
  examCategory: string;
  scenario: string;
  scenarioId: string;
}

export type UpdateQuestionRequest = PostQuestionRequest & {
  questionId: string;
};

export interface Question {
  _id: string;
  isActive: boolean;
  image?: string;
  vimeoId? : string;
  question: string;
  answerExplanation: string;
  contentType: string;
  examCategory: {
    _id: string;
    name: string;
  };
  exams?: { _id: string; name: string }[];
  categories: Array<{
    _id: string;
    category: { _id: string; name: string };
    subcategories: Array<string>;
  }>;
  answers: Array<{ _id: string; answer: string; correct: boolean }>;
  scenario: string;
  scenarioId: string;
}

export interface AddQuestionCategoryRequest {
  name: string;
  subcategories: string[];
}

export type UpdateQuestionCartegoryRequest = AddQuestionCategoryRequest & {
  questionCategoryId: string;
};

export interface QuestionResponse {
  result: Question[];
  total: number;
}

export type SavedQuestion = {
  _id: string;
  question: string;
  answerExplanation: string;
  isActive: boolean;
  answers: Array<{
    answer: string;
    correct: boolean;
    _id: string;
  }>;
};
