const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    uid: {
      type: Number,
    },
    fullname: {
      type: String,
      required: [true, "Please add a fullname"],
    },
    role: {
      type: Number,
      require: [true, "Please add a role"],
      default: 0,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    subscription: {
      type: String,
      default:"N/A"
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    timezone: {
      type: String,
      default: "EST",
    },
    score: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    streakhistory: [
      {
        date: {
          type: Date,
        },
      },
    ],
    gamehistory: [
      {
        title: {
          type: String,
        },
        mode: {
          type: String,
        },
        score: {
          type: Number,
        },
        originalScore: {
          type: Number,
        },
        multiplier: {
          type: Number,
        },
        numberOfQuestions: {
          type: Number,
        },
        questionCategory: {
          type: String,
        },
        date: {
          type: Date,
        }
      },
    ],
    score_details: {
      type: Map,
      of: Number,
      default: {},
    },
    score_months: {
      type: Map,
      of: [Number],
      default: {},
    },
    score_total_months: {
      type: [Number],
      default: Array(12).fill(0),
    },
    survivorLevel: {
      type: Number,
    },
    milestones: [
      {
        days: Number,
        multiplier: Number,
        date: Date,
        achieved: Boolean,
      },
    ],
    currentMultiplier: {
      type: Number,
      default: 1,
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password: {
      type: String,
    },
    userType: {
      type: String,
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("User", UserSchema);
