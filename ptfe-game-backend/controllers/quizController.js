const asyncHandler = require("express-async-handler");
const { updateStreakAndMilestones } = require("../utils/streak");
const Quiz = require("../models/quizModel");
const QuizTrack = require("../models/quizTrackModel");
const Question = require("../models/questionModel");
const { getEstTime } = require("../utils/date");

const getQuizzes = asyncHandler(async (req, res) => {
  try {
    // const { search = "", page = 1, limit = 10 } = req.query;
    // const skip = (page - 1) * limit;
    // const query = {
    //   $or: [
    //     { email: { $regex: search, $options: "i" } },
    //     { firstname: { $regex: search, $options: "i" } },
    //     { lastname: { $regex: search, $options: "i" } },
    //   ],
    // };
    const totalCount = await Quiz.countDocuments();
    const result = await Quiz.find();
    res.status(200).json({ count: totalCount, quizzes: result });
  } catch (error) {
    console.log(error);
  }
});

const getQuiz = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("Please send quiz id");
      return;
    }
    const result = await Quiz.findById(id).populate({
      path: "questions",
      select: [
        "question",
        "answers.answer",
        "answers.correct",
        "answers._id",
        "answerExplanation",
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

const submitQuiz = asyncHandler(async (req, res) => {
  try {
    let {
      id,
      score,
      quizMode,
      title,
      numberOfQuestions = 20,
      answers,
    } = req.body;
    if (!id) return res.status(400).json("Please send quiz id");

    const user = req.user;
    updateStreakAndMilestones(user);

    const multipliedScore = Math.round(score * user.currentMultiplier);

    if (user.score_details.has(quizMode)) {
      user.score_details.set(
        quizMode,
        user.score_details.get(quizMode) + (score || 0)
      );
    } else {
      user.score_details.set(quizMode, score || 0);
    }

    user.score += multipliedScore;

    if (!title) title = quizMode;

    user.gamehistory.push({
      title,
      mode: quizMode,
      score: multipliedScore,
      originalScore: score,
      multiplier: user.currentMultiplier,
      numberOfQuestions,
      date: getEstTime(),
    });

    if (!user.score_months) user.score_months = new Map();
    const currentMonth = new Date().getMonth(); // Gets month index (0 for January, 11 for December)

    if (!user.score_months.has(quizMode))
      user.score_months.quizeMode = Array(12).fill(0);

    let monthsScores = user.score_months.get(quizMode) || Array(12).fill(0); // Initialize with 12 months of zeros if not present
    monthsScores[currentMonth] += multipliedScore; // Add multipliedScore to the current month
    user.score_months.set(quizMode, monthsScores); // Update the score_months Map

    if (!user.score_total_months) user.score_total_months = Array(12).fill(0);
    user.score_total_months[currentMonth] += multipliedScore; // Add multipliedScore to the current month

    if(quizMode === 'survivorMode'){
      if (!user.survivorLevel) user.survivorLevel = 0;
      if (numberOfQuestions > user.survivorLevel)
        user.survivorLevel = numberOfQuestions;
    }

    await user.save();
    
    res.status(200).json({
      score: user.score,
      multipliedScore,
      streak: user.streak,
      currentMultiplier: user.currentMultiplier,
      streakhistory: user.streakhistory,
      gamehistory: user.gamehistory,
      milestones: user.milestones,
    });

    for (const answer of answers) {
      try {
        const question = await Question.findById(answer.questionId);
        if (!question) {
          continue; // Skip to the next answer if the question isn't found
        }
        question.statistics.totalAnswered += 1;
        if (answer.isCorrect) {
          question.statistics.totalCorrect += 1;
        }
        await question.save();
      } catch (error) {
        console.error(`Error updating question ID ${answer.questionId}:`, error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const submitSurvival = asyncHandler(async (req, res) => {
  try {
    const { score } = req.body;
    const user = req.user;

    user.score += score | 0;
    updateStreakAndMilestones(user);

    await user.save();

    res.status(200).json({
      score: user.score,
      streak: user.streak,
      streakhistory: user.streakhistory,
    });
  } catch (error) {
    console.log(error);
  }
});

const createQuizTrack = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const quizTrack = await QuizTrack.create({
    name,
  });
  res.status(200).json(quizTrack);
});

const getQuizTracks = asyncHandler(async (req, res) => {
  const quizTracks = await QuizTrack.find({}).populate("totalQuizzes");
  res.status(200).json(quizTracks);
});

const editQuizTrack = asyncHandler(async (req, res) => {
  const { name, quizTrackId } = req.body;

  if (!name || !quizTrackId) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const quizTrack = await QuizTrack.findById(quizTrackId);
  if (!quizTrack) {
    res.status(404);
    throw new Error("Quiz Track not found!");
  }
  quizTrack.name = name;
  const newQuizTrack = await quizTrack.save();
  res.status(200).json(newQuizTrack);
});

const deleteQuizTracks = asyncHandler(async (req, res) => {
  const { quizTrackIds } = req.body;
  if (!quizTrackIds || quizTrackIds.length === 0) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  await QuizTrack.deleteMany({ _id: { $in: quizTrackIds } });
  res.status(200).json({
    success: true,
  });
});

const createCurratedQuiz = asyncHandler(async (req, res) => {
  const { name, questions } = req.body;

  if (
    !name ||
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Validate and populate questions
  const questionDocs = await Question.find({ _id: { $in: questions } });

  if (questionDocs.length !== questions.length) {
    res.status(400);
    throw new Error("Some questions not found in the database");
  }
  const quiz = await Quiz.create({
    title: name,
    questions: questionDocs.map((q) => q._id),
    duration: "60",
  });
  res.status(200).json(quiz);
});

const editCurratedQuiz = asyncHandler(async (req, res) => {
  const { name, examId, questions } = req.body;

  if (!name || !examId || !questions) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const quiz = await Quiz.findById(examId);
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz Track not found!");
  }
  quiz.title = name;
  quiz.questions = questions;
  const newQuiz = await quiz.save();
  res.status(200).json(newQuiz);
});

const deleteCurratedQuiz = asyncHandler(async (req, res) => {
  const { quizzes } = req.body;
  if (!quizzes || quizzes.length === 0) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  await Quiz.deleteMany({ _id: { $in: quizzes } });
  res.status(200).json({
    success: true,
  });
});

const getQuizzesWithFilter = asyncHandler(async (req, res) => {
  let page = parseInt(req.body.page); // Default to page 1 if not provided
  let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
  const searchQuery = req.body.search || ""; // Get the search query from the request
  // const filter = req.body.filter || {};
  const searchRegex = new RegExp(searchQuery, "i");
  const query = { title: searchRegex };
  const totalQuizzes = await Quiz.countDocuments(query);
  const Quizzes = await Quiz.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total: totalQuizzes, result: Quizzes });
});

module.exports = {
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
};
