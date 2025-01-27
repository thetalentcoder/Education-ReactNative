const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");
const QuestionCategory = require("../models/questionCategoryModel");
const { getQuestionsWithQuizzesIncluded } = require("../utils/question");
const { uploadImage } = require("../utils/files/google/gcs");
const { getSubscriptionStatus } = require("../utils/woo");
const { fetchUserSubscriptionData } = require("../utils/revenuecat");

const getAllQuestions = asyncHandler(async (req, res) => {  
  try {  
    let { page = 1, limit = 10, subCategories = [] } = req.body;  
    let query = {}; 
 

    if (req.user.userType && req.user.userType === "apple") {
      response = await fetchUserSubscriptionData(req.user.uid);
    } else if (req.user && req.user.uid) {
        response = await getSubscriptionStatus(req.user.uid);
    } else {
        throw new Error("Invalid user data: userType or uid is missing");
    }

    const isPT = response.isPT;  
    const isPTA = response.isPTA;  
    const status = isPT || isPTA;  
    const expiredState = response.isExpired;



    // Build query based on subCategories and subscription type
    if (subCategories.length > 0) {  
      query = {   
        "categories.subcategories": { $in: subCategories },  
        "isActive": true,  
        scenarioId: { $exists: false }  
      };  
    } else {  
      query = { isActive: true, scenarioId: { $exists: false } }; // Default query if no subcategories  
    }  

    // Fetch only the required fields and apply pagination directly in the query  
    const totalQuestions = await Question.countDocuments(query);  
    const questions = await Question.find(query, 'question examCategory answers answerExplanation scenarioId statistics') // Only fetch necessary fields
      .populate("examCategory", 'name') // Only populate the name field  
      // .skip((page - 1) * limit) // Skip for pagination  
      // .limit(limit); // Limit the number of results  

    // Filter questions based on subscription type directly in the query
    const filteredQuestions = questions.filter(question => {  
      if (isPT && isPTA) return true; // Both types  
      if (isPT) return question.examCategory?.name === "PT"; // Only PT  
      if (isPTA) return question.examCategory?.name === "PTA"; // Only PTA  
      return true;;  
    });  

    // Shuffle only the filtered questions using Fisher-Yates algorithm for better performance
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }
    const limitedQuestions = filteredQuestions.slice(0, limit);
    if (!status) {  
      //return res.status(200).json({ success: false, message: "You need to purchase subscriptions" });  
      res.status(200).json({  
        success: false,
        state: expiredState,
        count: limitedQuestions.length,  
        questions: limitedQuestions,  
        totalQuestions: totalQuestions,  
        currentPage: page,  
        totalPages: Math.ceil(totalQuestions / limit),  
      });  
    } else {
      res.status(200).json({  
        success: true,
        state: expiredState,
        count: limitedQuestions.length,  
        questions: limitedQuestions,  
        totalQuestions: totalQuestions,  
        currentPage: page,  
        totalPages: Math.ceil(totalQuestions / limit),  
      });  
    }
  } catch (error) {  
    res.status(500).json({ message: error.message });  
  }  
});
const getAllScenarioQuestions = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10, subCategories = [] } = req.body;

    if (req.user.userType && req.user.userType === "apple") {
      response = await fetchUserSubscriptionData(req.user.uid);
    } else if (req.user && req.user.uid) {
        response = await getSubscriptionStatus(req.user.uid);
    } else {
        throw new Error("Invalid user data: userType or uid is missing");
    }

    const status = response.isPT || response.isPTA;
    const isPT = response.isPT;  
    const isPTA = response.isPTA;  
    const expiredState = response.isExpired;


    let query = { scenarioId: { $exists: true } };
    
    if (subCategories.length > 0) {
      query = {
        "categories.subcategories": { $in: subCategories },
        scenarioId: { $exists: true },
      };
    }

    // Fetch only necessary fields and apply pagination directly in the query
    const totalQuestions = await Question.countDocuments(query);
    const questions = await Question.find(query, 'answers answerExplanation question statistics') // Only fetch necessary fields
      .populate("scenarioId", "scenario") // Only populate necessary fields
      .lean() // Return plain JavaScript objects
      // .skip((page - 1) * limit) // Skip for pagination
      // .limit(limit) // Limit the number of results
      .sort({ createdAt: -1 }); // Optional: sort by creation date if needed
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Select only the specified limit number of questions from the shuffled array
    const limitedQuestions = shuffledQuestions.slice(0, limit);
    if (!status) {
      //return res.status(200).json({  message: "You need to purchase subscriptions" });
      res.status(200).json({
        success: false,
        state: expiredState,
        count: limitedQuestions.length,
        questions: limitedQuestions, // Shuffle questions randomly
        totalQuestions: totalQuestions,
        currentPage: page,
        totalPages: Math.ceil(totalQuestions / limit),
      });
    } else {
      res.status(200).json({
        success: true,
        state: expiredState,
        count: limitedQuestions.length,
        questions: limitedQuestions, // Shuffle questions randomly
        totalQuestions: totalQuestions,
        currentPage: page,
        totalPages: Math.ceil(totalQuestions / limit),
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getQuestionsWithFilter = asyncHandler(async (req, res) => {
  let page = parseInt(req.body.page); // Default to page 1 if not provided
  let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
  const searchQuery = req.body.search || ""; // Get the search query from the request
  const filter = req.body.filter || {};
  let sortBy = req.body.sortBy; // Default to sorting by creation date
  let sortOrder = req.body.sortOrder; // Default to descending order

  if (page < 1) page = 1; // Ensure page is at least 1
  if (limit < 1) limit = 10; // Ensure limit is at least 1

  const searchRegex = new RegExp(searchQuery, "i");
  const totalQuestionsQuery = {
    $or: [
      { question: searchRegex }, // Use the same regex for counting
      { "answers.answer": searchRegex },
    ],
  };
  if (filter.isActive) {
    totalQuestionsQuery["isActive"] = filter.isActive;
  }
  if (filter.category) {
    totalQuestionsQuery["categories.category"] = filter.category;
  }
  if (filter.scenarioId !== undefined) {
    if (filter.scenarioId) {
      totalQuestionsQuery["scenarioId"] = { $exists: true, $ne: undefined };
    } else {
      totalQuestionsQuery["scenarioId"] = { $exists: false };
    }
  }
  if (filter._id) {
    totalQuestionsQuery["_id"] = filter._id;
  }

  const totalQuestions = await Question.countDocuments(totalQuestionsQuery);
  const questions = await getQuestionsWithQuizzesIncluded(
    searchQuery,
    sortBy,
    sortOrder,
    limit,
    page,
    filter
  );
  res.status(200).json({ total: totalQuestions, result: questions });
});

const createQuestion = asyncHandler(async (req, res) => {
  const {
    // track,
    categories,
    examCategory,
    vimeoId,
    isActive,
    question,
    answers,
    answerExplanation,
    scenarioId,
    deleteImage
  } = req.body;

  if (!categories || !question || !answers || !answerExplanation) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const parsedCategories = JSON.parse(categories);
  const parsedAnswers = JSON.parse(answers);
  for (const { category, subcategories } of parsedCategories) {
    const categoryDocument = await QuestionCategory.findById(category);
    if (!categoryDocument) {
      res.status(400);
      throw new Error(`Category with ID ${category} not found.`);
    }
    const categorySubcategories = categoryDocument.subcategories.map((sub) =>
      sub.toString()
    );
    for (const subcategory of subcategories) {
      if (!categorySubcategories.includes(subcategory)) {
        res.status(400);
        throw new Error(
          `Category with the name '${categoryDocument.name}' doesn't contain the subcategory: ${subcategory}`
        );
      }
    }
  }

  const newQuestionObject = {
    categories: parsedCategories,
    question,
    answers: parsedAnswers,
    answerExplanation,
  };

  if (examCategory) {
    newQuestionObject.examCategory = examCategory;
  }

  if (vimeoId) {
    newQuestionObject.vimeoId = vimeoId;
  }

  if (scenarioId) {
    newQuestionObject.scenarioId = scenarioId;
  }
  if (isActive === "true" || isActive === "false") {
    newQuestionObject.isActive = isActive;
  }
  if (deleteImage) {
    newQuestionObject.image = undefined;
  }

  else if (req.files[0]?.buffer) {
    const image = await uploadImage(req.files[0].buffer);
    newQuestionObject.image = image;
  }
  // if (track) {
  //   newQuestionObject.track = track;
  // }
  const newQuestion = await Question.create(newQuestionObject);
  res.status(200).json(newQuestion);
});

const updateQuestion = asyncHandler(async (req, res) => {
  const {
    questionId,
    categories,
    examCategory,
    vimeoId,
    question,
    isActive,
    answers,
    answerExplanation,
    scenarioId,
    deleteImage,
  } = req.body;
  if (
    !questionId ||
    !categories ||
    !question ||
    !answers ||
    !answerExplanation
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingQuestion = await Question.findById(questionId);
  if (!existingQuestion) {
    res.status(400);
    throw new Error(`Question with ID ${questionId} not found.`);
  }
  const parsedCategories = JSON.parse(categories);
  const parsedAnswers = JSON.parse(answers);
  for (const { category, subcategories } of parsedCategories) {
    const categoryDocument = await QuestionCategory.findById(category);
    if (!categoryDocument) {
      res.status(400);
      throw new Error(`Category with ID ${category} not found.`);
    }
    const categorySubcategories = categoryDocument.subcategories.map((sub) =>
      sub.toString()
    );
    for (const subcategory of subcategories) {
      if (!categorySubcategories.includes(subcategory)) {
        res.status(400);
        throw new Error(
          `Category with the name '${categoryDocument.name}' doesn't contain the subcategory: ${subcategory}`
        );
      }
    }
  }

  // Update the question fields
  existingQuestion.categories = parsedCategories;
  existingQuestion.vimeoId = vimeoId;
  existingQuestion.question = question;
  existingQuestion.answers = parsedAnswers;
  existingQuestion.answerExplanation = answerExplanation;
  existingQuestion.scenarioId = scenarioId;
  if (examCategory)
    existingQuestion.examCategory = examCategory;
  if (isActive === "true" || isActive === "false")
    existingQuestion.isActive = isActive;

  if (deleteImage) {
    existingQuestion.image = undefined;
  }
  else if (req.files[0]?.buffer) {
    const image = await uploadImage(req.files[0].buffer);
    existingQuestion.image = image;
  }
  const updatedQuestion = await existingQuestion.save();
  res.status(200).json(updatedQuestion);
});

const deleteQuestions = asyncHandler(async (req, res) => {
  const { questions } = req.body;
  if (!questions || questions.length === 0) {
    res
      .status(400)
      .json({ success: false, message: "Please provide question IDs" });
    return;
  }
  // const examsToUpdate = await Exam.find({
  //   "sections.questions": { $in: questions },
  // });
  // // Step 2: Remove the questions from the sections of the affected exams
  // examsToUpdate.forEach(async (exam) => {
  //   exam.sections.forEach((section) => {
  //     section.questions = section.questions.filter(
  //       (q) => !questions.includes(q.toString())
  //     );
  //   });
  //   await exam.save();
  // });

  // Step 3: Delete the questions
  await Question.deleteMany({ _id: { $in: questions } });
  res.status(200).json({
    success: true,
    message: "Questions removed from exams and deleted successfully.",
  });
});

const createQuestionCategory = asyncHandler(async (req, res) => {
  const { name, subcategories } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const questionCategory = await QuestionCategory.create({
    name,
    subcategories,
  });

  res.status(200).json(questionCategory);
});

const getQuestionCategories = asyncHandler(async (req, res) => {
  const questionCategories = await QuestionCategory.find({});

  res.status(200).json(questionCategories);
});

const editQuestionCategory = asyncHandler(async (req, res) => {
  const { questionCategoryId, name, subcategories } = req.body;

  if (
    !questionCategoryId ||
    !name ||
    !subcategories ||
    subcategories.length === 0
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const questionCategory = await QuestionCategory.findById(questionCategoryId);
  if (!questionCategory) {
    res.status(400);
    throw new Error(questionCategory);
  }

  questionCategory.name = name;
  questionCategory.subcategories = subcategories;

  const updatedQuestionCategory = await questionCategory.save();
  if (!updatedQuestionCategory) {
    res.status(500);
    throw new Error("Something went wrong!");
  }

  res.status(200).json({
    success: true,
  });
});

const deleteQuestionCategories = asyncHandler(async (req, res) => {
  const { questionCategoryIds } = req.body;
  if (!questionCategoryIds || questionCategoryIds.length === 0) {
    res.status(400);
    throw new Error("Please provide questionCategoryIds");
  }

  // Step 1: Find the categories and their subcategories to be deleted
  const categoriesToDelete = await QuestionCategory.find({
    _id: { $in: questionCategoryIds },
  });

  // Step 2: Delete the QuestionCategory documents
  await QuestionCategory.deleteMany({ _id: { $in: questionCategoryIds } });

  // Step 3: Update the related Question documents
  await Question.updateMany(
    { "categories.category": { $in: questionCategoryIds } },
    {
      $pull: {
        categories: { category: { $in: questionCategoryIds } },
      },
    }
  );

  // Step 4: Delete only the subcategories that are in the deleted categories
  for (const categoryToDelete of categoriesToDelete) {
    const subcategoriesToDelete = categoryToDelete.subcategories || [];
    await Question.updateMany(
      {
        "categories.category": { $in: questionCategoryIds },
        "categories.subcategories": { $in: subcategoriesToDelete },
      },
      {
        $pull: {
          "categories.$.subcategories": { $in: subcategoriesToDelete },
        },
      }
    );
  }

  res.status(200).json({
    success: true,
  });
});

const fetchQuestionsByIds = asyncHandler(async (req, res) => {
  const { questionIds } = req.body;
  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    throw new Error("Invalid question IDs array");
  }
  const questions = await Question.find({ _id: { $in: questionIds } });
  res.status(200).json(questions);
});

module.exports = {
  getQuestionsWithFilter,
  createQuestion,
  updateQuestion,
  deleteQuestions,
  getAllQuestions,
  getAllScenarioQuestions,
  fetchQuestionsByIds,

  createQuestionCategory,
  getQuestionCategories,
  editQuestionCategory,
  deleteQuestionCategories,
};
