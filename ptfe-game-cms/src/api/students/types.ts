import { Group } from 'api/groups/types';
import { Org } from 'api/orgs/types';

export type TakeExam = {
  _id: string;
  exam: {
    _id: string;
    name?: string;
  };
  timesTaken: number;
  timesPassed: number;
  timesFailed: number;
  examHistory: Array<{
    _id: string;
    percent: number;
    answers: Array<AnswerInfo>;
    minPassPercentage: number;
  }>;
};

interface ExamTakenInUser extends Omit<TakeExam, 'examHistory'> {
  examHistory: string[];
}

export interface MembershipPlan {
  membership: {
    _id: string;
    name: string;
  };
  expiryDate: string;
}

export interface Student {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  userRole: number;
  verified: boolean;
  isActive: boolean;
  organization?: Org;
  group?: Group;
  image?: string;
  examsTaken?: ExamTakenInUser[];
  subscription?: {
    dateOfEnrollment?: string;
    membershipPlans?: MembershipPlan[];
//    subscriptionExpiryDate?: string;
//    subscriptionPlan?: {
//      _id: string;
//      name: string;
//    };
  };
  loginHistory: Array<{
    ipAddress: string;
    location: string;
    timestamp: Date;
    _id: string;
  }>;
}

export interface StoreStudentRequest {
  role: string;
  name: string;
  email: string;
  groupId?: string;
  organizationId?: string;
  image?: File | string;
  password: string;
  deleteImage: boolean;
  repeatPassword: string;
  subscription?: {
    membershipPlans?: MembershipPlan[];
    subscriptionPlan?: string;
    subscriptionExpiryDate?: string;
  };
}

export interface PutStudentRequest {
  role: string;
  name: string;
  email: string;
  isActive: boolean;
  groupId?: string;
  organizationId?: string;
  deleteImage: boolean;
  image?: File;
  userId: string;
  password: string;
  repeatPassword: string;
  subscription?: {
    membershipPlans?: MembershipPlan[];
//    subscriptionPlan?: string;
//    subscriptionExpiryDate?: Date;
  };
}

export type AnswerInfo = {
  _id: string;
  section: string;
  question: string;
  answer: string;
  isCorrect: boolean;
  answerExplanation: string;
  allAnswers: Array<{
    answer: string;
    correct: boolean;
    _id: string;
  }>;
  categories: Array<{
    category: string;
    subcategories: string[];
    _id: string;
  }>;
};

export interface StudentsResponse {
  result: Student[];
  total: number;
}
