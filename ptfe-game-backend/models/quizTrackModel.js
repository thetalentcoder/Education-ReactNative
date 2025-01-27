const mongoose = require("mongoose");

const quizTrackSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    questionOfTheDay: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    id: false,
  }
);

quizTrackSchema.virtual("totalQuizzes", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "category",
  count: true,
});

module.exports = mongoose.model("QuizTrack", quizTrackSchema);
