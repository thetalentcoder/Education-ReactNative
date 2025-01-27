import { Question } from "api/question/types";

export interface PostScenarioRequest {
  title: string;
  scenario: string;
}
export type UpdateScenarioRequest = PostScenarioRequest & {
  id: string;
};

export interface Scenario {
  _id: string;
  title: string;
  scenario: string;
  questions: Question[];
}

export interface ScenarioResponse {
  result: Scenario[];
  total: number;
}

  