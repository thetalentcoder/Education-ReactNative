const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  getQuestionsWithFilter,
  createQuestion,
  updateQuestion,
  deleteQuestions,
  getAllQuestions,
  getAllScenarioQuestions,
  createQuestionCategory,
  getQuestionCategories,
  editQuestionCategory,
  deleteQuestionCategories,
  fetchQuestionsByIds,
} = require("../controllers/questionController.js");

router
  .route("/category")
  .post(requiresAuth, createQuestionCategory)
  .get(requiresAuth, getQuestionCategories)
  .put(requiresAuth, editQuestionCategory)
  .delete(requiresAuth, deleteQuestionCategories);

router.post("/getQuestions", getQuestionsWithFilter);
router
  .route("/")
  .post(requiresAuth, createQuestion)
  .put(requiresAuth, updateQuestion)
  .delete(requiresAuth, deleteQuestions);

router.post("/getAllQuestions", requiresAuth, getAllQuestions);
router.post("/getAllScenarioQuestions", requiresAuth, getAllScenarioQuestions);
router.post("/fetchQuestionsByIds", requiresAuth, fetchQuestionsByIds);

module.exports = router;
