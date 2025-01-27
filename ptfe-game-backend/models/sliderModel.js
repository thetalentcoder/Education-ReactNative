const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model("Slider", SliderSchema);
