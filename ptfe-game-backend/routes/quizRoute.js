const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  getQuizzes,
  getQuiz,
  submitQuiz,
  submitSurvival,

  createCurratedQuiz,
  getQuizzesWithFilter,
  editCurratedQuiz,
  deleteCurratedQuiz,

  createQuizTrack,
  getQuizTracks,
  editQuizTrack,
  deleteQuizTracks,
} = require("../controllers/quizController.js");

router
  .route("/track")
  .post(requiresAuth, createQuizTrack)
  .get(requiresAuth, getQuizTracks)
  .put(requiresAuth, editQuizTrack)
  .delete(requiresAuth, deleteQuizTracks);

router
  .route("/currated")
  .post(requiresAuth, createCurratedQuiz)
  .put(requiresAuth, editCurratedQuiz)
  .delete(requiresAuth, deleteCurratedQuiz);

router.post("/getQuizzesWithFilter", requiresAuth, getQuizzesWithFilter);

router.get("/", requiresAuth, getQuizzes);
router.get("/:id", requiresAuth, getQuiz);
router.post("/submit", requiresAuth, submitQuiz);
router.post("/submitSurvival", requiresAuth, submitSurvival);

module.exports = router;
