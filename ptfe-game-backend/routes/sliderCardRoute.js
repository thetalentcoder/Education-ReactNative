const express = require("express");
const router = express.Router();

const { requiresAuth } = require("../middleware/authMiddleware.js");

const {
  CreateCard,
  GetAllCards,
  EditCard,
  DeleteCards,
  getSliderCardsWithFilter,
} = require("../controllers/sliderCardsController.js");

router
  .route("/")
  .get(requiresAuth, GetAllCards)
  .post(requiresAuth, CreateCard)
  .put(requiresAuth, EditCard)
  .delete(requiresAuth, DeleteCards);

router.post("/getSliderCards", requiresAuth, getSliderCardsWithFilter);

module.exports = router;
