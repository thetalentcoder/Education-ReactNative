export enum AuthPathnames {
  LOGIN = '/login'
}

export enum PrivatePathnames {
  USERS = '/users',
  QUIZ_LIST = '/quiz-list',
  QUIZ_TRACK = '/quiz-track',
  QUESTION_BANK = '/question-bank',
  QUESTION_SCENARIO = '/question-scenario',
  QUESTION_CATEGORIES = '/question-categories',
  DASHBOARD = '/',
  SLIDER_CARDS = '/slider-cards',
  ACCOUNT_SETTINGS = '/account-settings',
  NOTIFICATIONS = '/notifications',
  VIDEOS = '/videos',
  SLIDERS = '/sliders'
}

export const Pathnames = {
  ...AuthPathnames,
  ...PrivatePathnames
};
