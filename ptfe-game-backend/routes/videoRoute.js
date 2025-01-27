const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  getVideo,
  //getAllVideo,
  CreateVideo,
  DeleteVideos,
  EditVideo,
  getVideosWithFilter,
} = require("../controllers/videoController.js");

router
  .route("/")
  .get(requiresAuth, getVideo)
  .post(requiresAuth, CreateVideo)
  .put(requiresAuth, EditVideo)
  .delete(requiresAuth, DeleteVideos);

router.post("/getVideos", requiresAuth, getVideosWithFilter);

module.exports = router;

module.exports = router;
