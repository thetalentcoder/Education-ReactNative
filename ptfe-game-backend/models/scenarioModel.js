const mongoose = require("mongoose");

const scenarioSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    scenario: {
      type: String,
      maxlength: [100000, "Scenario cannot be longer than 100 000 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = Scenario;
