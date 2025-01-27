import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivatePageWrapper } from 'components/layout/PrivatePageWrapper';
import { Pathnames } from './pathnames';

// Public pages
// import { ForgotPassword } from 'pages/auth/ForgotPassword';
// import { ResetPassowrd } from 'pages/auth/ResetPassword';
// import { SetPassowrd } from 'pages/auth/SetPassword';
import { Login } from 'pages/auth/Login';

// Private pages
import AccountSettings from 'pages/auth/AccountSettings';
import { Dashboard } from 'pages/Dashboard';
import { Users } from 'pages/Users';
import { QuizList } from 'pages/exam/QuizList';
import { QuizTrack } from 'pages/exam/QuizTrack';
import { QuestionBank } from 'pages/exam/QuestionBank';
import { QuestionScenarios } from 'pages/exam/QuestionScenario';
import { QuestionCategory } from 'pages/exam/QuestionCategory';
import { SliderCards } from 'pages/SliderCards';
import { Notifications } from 'pages/Notifications';
import { Videos } from 'pages/Videos';
import { Sliders} from 'pages/Sliders';
const authRoutes = [
  // { path: Pathnames.FORGOT_PASSWORD, element: <ForgotPassword /> },
  // { path: Pathnames.RESET_PASSOWRD, element: <ResetPassowrd /> },
  // { path: Pathnames.SET_PASSOWRD, element: <SetPassowrd /> },
  { path: Pathnames.LOGIN, element: <Login /> }
];

// const routesWithoutWrapper = [{ path: Pathnames.SCENARIO, element: <Scenario /> }];

const privateRoutes = [
  { path: Pathnames.ACCOUNT_SETTINGS, element: <AccountSettings /> },
  { path: Pathnames.DASHBOARD, element: <Dashboard /> },
  { path: Pathnames.USERS, element: <Users /> },
  { path: Pathnames.QUIZ_LIST, element: <QuizList /> },
  { path: Pathnames.QUIZ_TRACK, element: <QuizTrack /> },
  { path: Pathnames.QUESTION_BANK, element: <QuestionBank /> },
  { path: Pathnames.QUESTION_SCENARIO, element: <QuestionScenarios /> },
  { path: Pathnames.QUESTION_CATEGORIES, element: <QuestionCategory /> },
  { path: Pathnames.SLIDER_CARDS, element: <SliderCards /> },
  { path: Pathnames.NOTIFICATIONS, element: <Notifications /> },
  { path: Pathnames.VIDEOS, element: <Videos /> },
  { path: Pathnames.SLIDERS, element: <Sliders /> },
];

const privateRoutesWithWrapper = privateRoutes.map((route) => ({
  ...route,
  element: <PrivatePageWrapper>{route.element}</PrivatePageWrapper>
}));

const allRoutes = [...authRoutes, ...privateRoutesWithWrapper/*, ...routesWithoutWrapper*/];

export const AppRouter = <RouterProvider router={createBrowserRouter(allRoutes)} />;
