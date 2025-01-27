const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  vimeoId: String,
});

module.exports = mongoose.model("Video", VideoSchema);
