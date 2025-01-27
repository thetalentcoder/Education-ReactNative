const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  registerUser,
  // deleteUser,
  appleLoginUser,
  updateUser,
  getMe,
  updateMe,
  getUsers,
  getTopRankingUsers,
  getPointsTotal,
  getPointsLastDays,
  getPointsThisMonth,
  getPointsLastSeason,
  getTopScoresBySeason,
  getSurvivorLevel,
  deleteUser,
  updatePurchaseId
} = require("../controllers/userController.js");

// router.post("/", registerUser);
// router.delete("/:id", requiresAuth, deleteUser);
router.post("/register", registerUser);
router.post("/appleloginuser", appleLoginUser);
router.route("/me")
  .get(requiresAuth, getMe)
  .put(requiresAuth, updateMe);

router.post("/ranking", requiresAuth, getTopRankingUsers);
router.get("/points/total", requiresAuth, getPointsTotal);
router.post("/points/lastDays", requiresAuth, getPointsLastDays);
router.get("/points/thisMonth", requiresAuth, getPointsThisMonth);
router.get("/points/lastSeason", requiresAuth, getPointsLastSeason);

router.post("/rankingSeason", requiresAuth, getTopScoresBySeason);
router.get("/survivorLevel", requiresAuth, getSurvivorLevel);
router.delete("/delete", requiresAuth, deleteUser);
router.put("/:id", requiresAuth, updateUser);
router.post("/getUsers", requiresAuth, getUsers);
router.post("/updatePurchaseId", updatePurchaseId);

module.exports = router;