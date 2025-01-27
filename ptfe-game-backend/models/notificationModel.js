const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
})

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

