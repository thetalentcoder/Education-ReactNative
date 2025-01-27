const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add an quiz title"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizTrack",
      // required: [true, "Please add a track"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    orderIndex: {
      type: Number,
    },
    duration: {
      type: Number,
      required: [true, "Please add a duration"],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    id: false,
  }
);

// Pre-save middleware to automatically increment the orderIndex
quizSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      if (typeof this.orderIndex !== "number" || this.orderIndex < 0) {
        // If orderIndex is not a valid number, or if it's negative, calculate a new orderIndex.
        const highestIndexQuiz = await this.constructor
          .findOne({})
          .sort("-orderIndex")
          .exec();
        if (highestIndexQuiz) {
          this.orderIndex = highestIndexQuiz.orderIndex + 1;
        } else {
          this.orderIndex = 1; // If no exams exist, start with 1
        }
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});

quizSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Quiz", quizSchema);
