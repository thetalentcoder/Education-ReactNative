/* global process */
/* eslint-disable no-unused-vars */

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const UserSubscription = require("../models/userSubscriptionModel");
const crypto = require("crypto");
const { WOOCOMMERCE_WEBHOOK_EVENTS } = require("../utils/enum/woocommerce");
const axios = require("axios");

const generateWebhookSignature = (payload, webhookSecret) => {
  const hmac = crypto.createHmac("sha256", webhookSecret);
  hmac.update(payload, "utf8");
  const signature = hmac.digest("base64");
  return signature;
};

const handleWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = req.headers["x-wc-webhook-signature"];
  const webhookEvent = req.headers["x-wc-webhook-topic"];

  try {
    if (
      !(
        // webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionCreated ||
        // webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionUpdated ||
        // webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionDeleted ||
        webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.CustomerCreated ||
        webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.CustomerUpdated ||
        webhookEvent === WOOCOMMERCE_WEBHOOK_EVENTS.CustomerDeleted
      )
    )
      return res.status(200).send("incorrect webhook received");

    const generatedSignature = generateWebhookSignature(
      req.rawBody,
      process.env.WOOCOMMERCE_WEBHOOK_SECRET
    );

    if (webhookSecret !== generatedSignature) {
      return res.status(200).send("webhook is unauthorized");
    }

    const webhookData = req.body;

    //console.log("-----------------------webhook received------------------");
   //console.log(webhookData);

    await processWebhook(res, webhookData, webhookEvent);
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function processWebhook(res, webhookData, webhookEvent) {
  if (webhookData && webhookEvent) {
    switch (webhookEvent) {
      case WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionCreated:
        await createSubscription(res, webhookData);
        break;
      case WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionUpdated:
        await updateSubscription(res, webhookData);
        break;
      case WOOCOMMERCE_WEBHOOK_EVENTS.SubscriptionDeleted:
        await deleteSubscription(res, webhookData);
        break;
      case WOOCOMMERCE_WEBHOOK_EVENTS.CustomerCreated:
        await createCustomer(res, webhookData);
        break;
      case WOOCOMMERCE_WEBHOOK_EVENTS.CustomerUpdated:
        await updateCustomer(res, webhookData);
        break;
      case WOOCOMMERCE_WEBHOOK_EVENTS.CustomerDeleted:
        await deleteCustomer(res, webhookData);
        break;
      default:
        console.warn("Unknown webhook event:", webhookEvent);
    }
  } else {
    console.warn("Unsupported webhook event:", webhookEvent);
  }
}

async function createSubscription(res, webhookData) {
  try {
    const email = webhookData.billing.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    const product = webhookData.line_items[0];

    const documentToInsert = {
      subscriptionId: webhookData.id,
      status: webhookData.status,
      customerId: webhookData.customer_id,
      customerInfo: {
        firstName: webhookData.billing.first_name,
        lastName: webhookData.billing.last_name,
        email: email,
      },
      userId: user._id,
      productId: product.product_id,
      productInfo: {
        name: product.name,
        parentName: product.parent_name,
      },
    };

    await UserSubscription.create(documentToInsert);
    user.subscription = product.parent_name;
    //console.log(user.subscription);
    await user.save();
   //console.log("Subscription created successfully");
    res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to create subscription:", error);
    res.status(500).json({ result: false, message: error.message });
  }
}

async function updateSubscription(res, webhookData) {
  try {
    const result = await UserSubscription.findOneAndUpdate(
      { subscriptionId: webhookData.id },
      { status: webhookData.status },
      { new: true } // Return the updated document
    );

    if (!result)
      return res.status(404).json({ result: false, message: "Subscription not found" });

    //console.log("Subscription updated successfully");
    res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to update subscription:", error);
    res.status(500).json({ result: false, message: error.message });
  }
}

async function deleteSubscription(res, webhookData) {
  try {
    const result = await UserSubscription.deleteOne({
      subscriptionId: webhookData.id,
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ result: false, message: "Subscription not found" });

    //console.log("Subscription deleted successfully");
    res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    res.status(500).json({ result: false, message: error.message });
  }
}

async function createCustomer(res, webhookData) {
  try {

    const documentToInsert = {
      uid: webhookData.id,
      fullname: webhookData.first_name + ' ' + webhookData.last_name,
      email: webhookData.email,
    };
    //console.log(documentToInsert);

    const result = await User.create(documentToInsert);

    //console.log("Customer created successfully", result);
    return res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to create the customer", error);
    return res.status(200).json({ result: false, message: error.message });
  }
}

async function updateCustomer(res, webhookData) {
  try {
    // const result = await User.findOneAndUpdate(
    //   { uid: webhookData.id },
    //   { new: true } // Return the updated document
    // );
    // const result = null;

    // if (!result)
    //   return res.status(404).json({ result: false, message: "Customer not found" });

    console.log("Customer info updated successfully");
    res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to update customer info:", error);
    res.status(500).json({ result: false, message: error.message });
  }
}

async function deleteCustomer(res, webhookData) {
  try {
    const result = await User.deleteOne({ uid: webhookData.id });

    if (result.deletedCount === 0)
      return res.status(404).json({ result: false, message: "Customer not found" });

    console.log("Customer deleted successfully");
    res.status(200).json({ result: true });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    res.status(500).json({ result: false, message: error.message });
  }
}

module.exports = {
  handleWebhook,
};
