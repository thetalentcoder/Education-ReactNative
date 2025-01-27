const mongoose = require("mongoose");

const userSubscriptionSchema = mongoose.Schema(
  {
    subscriptionId: {
      type: Number,
    },
    status: {
      type: String,
    },
    customerId: {
      type: Number,
    },
    customerInfo: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    productId: {
      type: Number,
    },
    productInfo: {
      name: {
        type: String,
      },
      parentName: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const UserSubscription = mongoose.model("Subscription", userSubscriptionSchema);

module.exports = UserSubscription;
