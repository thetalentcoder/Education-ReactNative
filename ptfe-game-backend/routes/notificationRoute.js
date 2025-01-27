const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  getNotifications,
  deleteNotification,
  createNotification,
  editNotification,
  getNotificationsWithFilter,
} = require("../controllers/notificationController.js");

router.get("/", requiresAuth, getNotifications);
router.post("/", requiresAuth, createNotification);
router.put("/", requiresAuth, editNotification);
router.delete("/", requiresAuth, deleteNotification);
router.post("/getNotifications", requiresAuth, getNotificationsWithFilter);
module.exports = router;
