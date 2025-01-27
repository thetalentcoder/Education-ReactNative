import { AiOutlineHome } from 'react-icons/ai';
import { FaClipboardList, FaCodeBranch, FaFileArchive, FaIdCard, FaQuestionCircle, FaUsers, FaBell, FaVideo, FaSlidersH } from 'react-icons/fa';

import { Pathnames } from 'routes/pathnames';

// Admin Sidebar Menu
export const ADMIN_MENU = [
  {
    title: 'Dashboard',
    icon: <AiOutlineHome />,
    path: Pathnames.DASHBOARD
  },
  {
    title: 'Users',
    icon: <FaUsers />,
    path: Pathnames.USERS
  },
  {
    title: 'Question Categories',
    icon: <FaCodeBranch />,
    path: Pathnames.QUESTION_CATEGORIES
  },
  {
    title: 'Question Bank',
    icon: <FaQuestionCircle />,
    path: Pathnames.QUESTION_BANK
  },
  {
    title: 'Scenario Bank',
    icon: <FaClipboardList />,
    path: Pathnames.QUESTION_SCENARIO
  },
  {
    title: 'Curated Quizzes',
    icon: <FaFileArchive/>,
    path: Pathnames.QUIZ_LIST
  },
  // {
  //   title: 'Exams',
  //   icon: <FaClipboardList />,
  //   submenu: [
  //     {
  //       title: 'Quiz Tracks',
  //       path: Pathnames.QUIZ_TRACK
  //     },
  //   ]
  // },
  {
    title: 'Slider Cards',
    icon: <FaIdCard />,
    path: Pathnames.SLIDER_CARDS
  },
  {
    title: 'Notifications',
    icon: <FaBell />,
    path: Pathnames.NOTIFICATIONS
  },
  {
    title: 'Videos',
    icon: <FaVideo />,
    path: Pathnames.VIDEOS
  },
  {
    title: 'Sliders',
    icon: <FaSlidersH />,
    path: Pathnames.SLIDERS
  }
];

// Moderator Sidebar Menu
export const MODERATOR_MENU = [...ADMIN_MENU.filter(({ title }) => title !== 'Moderators')];

// Organization Admin Sidebar Menu
export const ORG_ADMIN_MENU = [
  {
    title: 'Dashboard',
    icon: <AiOutlineHome />,
    path: Pathnames.DASHBOARD
  },
];

// Student Sidebar Menu
export const STUDENT_MENU = [
  {
    title: 'Dashboard',
    icon: <AiOutlineHome />,
    path: Pathnames.DASHBOARD
  },
];
