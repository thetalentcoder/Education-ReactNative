const Notification = require("../models/notificationModel.js");
const asyncHandler = require("express-async-handler");

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

const getNotification = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const notification = await Notification.findOne({ _id: id, userId });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification gotten successfully",
      Notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the Notification",
    });
  }
});

const createNotification = asyncHandler(async (req, res) => {
  try {
    const { title, message } = req.body;

    const newNotification = new Notification({
      title,
      message,
    });

    await newNotification.save();

    res.status(200).json({
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating notification",
    });
  }
});

const editNotification = asyncHandler(async (req, res) => {
  try {
    const { id, title, message } = req.body;

    console.log("updated succefully");
    const updatedNotification = await Notification.findByIdAndUpdate(id, {
      title,
      message,
    });

    if (!updatedNotification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Notification",
    });
  }
});

const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const { notification } = req.body;
    console.log("delete notification function");

    await Notification.deleteMany({ _id: { $in: notification } });

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the Notification",
    });
  }
});

const getNotificationsWithFilter = asyncHandler(async (req, res) => {
  let page = parseInt(req.body.page); // Default to page 1 if not provided
  let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
  const searchQuery = req.body.search || ""; // Get the search query from the request
  // const filter = req.body.filter || {};
  const searchRegex = new RegExp(searchQuery, "i");
  const query = { title: searchRegex };
  const totalNotifications = await Notification.countDocuments(query);
  const sliderCards = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total: totalNotifications, result: sliderCards });
});

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  editNotification,
  deleteNotification,
  getNotificationsWithFilter,
};
