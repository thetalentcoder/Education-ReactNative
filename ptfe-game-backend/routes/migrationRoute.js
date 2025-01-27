const express = require("express");
const router = express.Router();
const Question = require("../models/questionModel");
const Quiz = require("../models/quizModel");

router.get("/question", async (req, res) => {
  await Question.create({
    question: "Lorem ipsome Lorem ipsome",
    answers: [
      {
        answer: "A",
        correct: true,
      },
      {
        answer: "B",
        correct: false,
      },
      {
        answer: "C",
        correct: false,
      },
      {
        answer: "D",
        correct: false,
      },
    ],
  });
  res.json();
});

router.get("/quiz", async (req, res) => {
  const questions = await Question.find();
  await Quiz.create({
    title: "Test Quiz",
    duration: 600,
    questions,
  });
  res.json();
});

module.exports = router;
