import * as Yup from 'yup';

// Set default locale
Yup.setLocale({
  mixed: {
    required: 'The field is required',
    oneOf: ''
  },
  string: {
    email: 'You have entered wrong email address',
    min({ min }) {
      return `The field must have at least ${min} characters`;
    },
    max({ max }) {
      return `The field must have at least ${max} characters`;
    }
  }
});

// Utils
const emailYup = Yup.string().email().max(255).required();
const passwordYup = Yup.string().min(8, 'Password should have a minimum of 8 characters');

// Schemas

// Auth
export const loginSchema = Yup.object().shape({
  email: emailYup,
  password: passwordYup.required()
});
export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  repeatPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), "any"], 'Passwords must match')
    .required('Confirm Password is required'),
});


export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().max(255),
  repeatNewPassword: Yup.string()
    .min(8, 'Password should have a minimum of 8 characters')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

// User
export const userSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  email: emailYup,
  oldPassword: Yup.string().max(255),
  newPassword: Yup.string().max(255),
  repeatPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

// UpdatePassword
export const updatePasswordSchema = Yup.object().shape({
  email: emailYup,
  newPassword: Yup.string().max(255).min(8, "Password length must be greater than 8."),
  repeatNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

export const updateUserSchema = Yup.object().shape({
  fullname: Yup.string().max(255).required(),
});

// Org
export const createOrgSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  type: Yup.string().max(255).required()
});

// Group
export const createGroupSchema = Yup.object().shape({
  name: Yup.string().max(255).required()
});

// Student
export const createStudentSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  email: emailYup,
  password: passwordYup,
  repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

// Org Admin
export const orgAdminSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  password: passwordYup,
  repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  email: emailYup
});

// Question
export const createQuestionSchema = Yup.object().shape({
  isActive: Yup.boolean().required(),
  question: Yup.string().required(),
  examCategory: Yup.string(),
  answerExplanation: Yup.string().required(),
  subcategories: Yup.array().of(Yup.string()),
  answers: Yup.array().of(
    Yup.object().shape({
      answer: Yup.string().required(),
      correct: Yup.boolean().required()
    })
  )
});

// Question
export const createScenarioSchema = Yup.object().shape({
  title: Yup.string(),
  scenario: Yup.string().required()
});

// Exam
export const examSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  isActive: Yup.boolean().required(),
  category: Yup.string(),
  sections: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string(),
        duration: Yup.number(),
        isActive: Yup.boolean()
      })
    )

});

export const examScheduleSchema = Yup.object().shape({
  dateFrom: Yup.date().required(),
  dateTo: Yup.date().required()
});

export const examCategorySchema = Yup.object().shape({
  name: Yup.string().max(255).required()
});

export const questionCategorySchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  subcategories: Yup.array().required()
});

export const sliderCardSchema = Yup.object().shape({
  title: Yup.string().max(255).required(),
  linkText: Yup.string().max(255).required(),
});

export const notificationSchema = Yup.object().shape({
  title: Yup.string().max(255).required(),
  message: Yup.string().required(),
});

export const videoSchema = Yup.object().shape({
  title: Yup.string().max(255).required(),
  description: Yup.string().required(),
  vimeoId: Yup.string().required(),
});

export const sliderSchema = Yup.object().shape({
  title: Yup.string().max(255).required(),
  content: Yup.string().required(),
});

export const createMembershipSchema = Yup.object().shape({
  name: Yup.string().max(255).required(),
  planId: Yup.string().required(),
  planType: Yup.string().required(),
  planDuration: Yup.number().required(),
  isLogin: Yup.boolean().required(),
  exams: Yup.array().of(Yup.string().required())
});
