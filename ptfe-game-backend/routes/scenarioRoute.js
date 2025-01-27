const express = require("express");
const router = express.Router();

const { imageUpload } = require("../utils/files/multer");
const { requiresAuth } = require("../middleware/authMiddleware.js");

const {
  createScenario,
  getScenarios,
  getScenariosWithFilter,
  editScenario,
  uploadScenarioImage,
  deleteScenarios,
  getScenario,
} = require("../controllers/scenarioController");

router
  .route("/")
  .get(requiresAuth, getScenarios)
  .post(requiresAuth, createScenario)
  .put(requiresAuth, editScenario)
  .delete(requiresAuth, deleteScenarios);

router.post("/getScenarios", requiresAuth, getScenariosWithFilter);
router.get("/scenario", getScenario);
router.post(
  "/scenario/image",
  requiresAuth,
  imageUpload.single("image"),
  uploadScenarioImage
);

module.exports = router;
