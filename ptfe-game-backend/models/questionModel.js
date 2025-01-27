const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema(
  {
    ptfeId: {
      type: Number,
    },
    contentType: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },
    examCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizTrack",
      index: true,
    },
    categories: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionCategory",
          required: [true, "Please add a category"],
        },
        subcategories: [
          {
            type: String,
            required: [true, "Please add a sub category"],
          }
        ],
      }
    ],
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    answers: [
      {
        answer: {
          type: String,
          required: true,
        },
        correct: {
          type: Boolean,
          required: true,
        },
      },
    ],
    answerExplanation: {
      type: String,
    },
    scenarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scenario",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    image: {
      type: String,
    },
    vimeoId: {
      type: String,
    },
    statistics: {
      totalAnswered: {
        default: 0,
        type: Number,
      },
      totalCorrect: {
        default: 0,
        type: Number,
      }
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
