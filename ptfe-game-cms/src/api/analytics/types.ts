export interface AnalyticsStudentsTypes {
  studentsLast7Days: number;
  studentsLast30Days: number;
  studentsLast90Days: number;
  totalStudents: number;
}

export interface AnalyticsExamTypes {
  [key: string]: {
    studentCount: number;
    averagePercent: number;
  };
}

export type StudentExamTakenTypes = {
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;

  questionsBySection: {
    [key: string]: {
      totalQuestions: number;
      totalCorrect: number;
    };
  };

  questionsByCategories: {
    [key: string]: {
      totalQuestionsAnswered: number;
      totalQuestionsCorrect: number;
      subcategories: {
        [key: string]: {
          totalQuestions: number;
          totalCorrect: number;
        };
      };
    };
  };
};

export type StudentQuizTakenTypes = {
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;

  questionsByCategories: {
    [key: string]: {
      totalQuestionsAnswered: number;
      totalQuestionsCorrect: number;
      subcategories: {
        [key: string]: {
          totalQuestions: number;
          totalCorrect: number;
        };
      };
    };
  };
};

export type GeneralExamInfo = {
  examQuestionsByCategories: Array<{
    category: {
      _id: string;
      name: string;
      subcategories: string[];
    };
    subcategories: {
      [key: string]: {
        totalQuestions: number;
        totalCorrect: number;
      };
    };
  }>;
  examQuestionsByContentType: {
    image: number;
    text: number;
    video: number;
  };
  examTotalQuestions: number;
};

export interface StudentAnalyticsPayload {
  userIDs: string[];
  examID: string;
  attempts: string[];
}

export interface SingleQuestionAnalytics {
  _id: string;
  statistics: {
    totalAnswered: number;
    totalCorrect: number;
  };
}

export interface StudnetsAnalysisResponse {
  [key: string]: StudnetAnalysis;
}

export interface StudnetAnalysis {
  name: string;
  attempts: number;
  passed: number;
  scores: number[];
  passPercantages: number[];
}

export interface PeerAverageResponse extends StudentExamTakenTypes {}
