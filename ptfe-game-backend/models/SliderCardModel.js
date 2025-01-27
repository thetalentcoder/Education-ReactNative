const mongoose = require("mongoose");

const SliderCardSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    linkText: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const SliderCard = mongoose.model("SliderCard", SliderCardSchema);

module.exports = SliderCard;
