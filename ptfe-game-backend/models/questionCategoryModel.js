const mongoose = require("mongoose");

const questionCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    subcategories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    id: false,
  }
);

module.exports = mongoose.model("QuestionCategory", questionCategorySchema);
