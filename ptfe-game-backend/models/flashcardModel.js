const mongoose = require("mongoose");

const FlashcardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a fullname"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        answerExplanation: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Flashcard", FlashcardSchema);
