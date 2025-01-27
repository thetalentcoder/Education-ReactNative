const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  getFlashcard,
  getAllFlashcards,
  CreateFlashcard,
  DeleteFlashcard,
  EditFlashcard,
} = require("../controllers/flashcardController.js");

router.get("/", requiresAuth, getAllFlashcards);
router.get("/:id", requiresAuth, getFlashcard);
router.post("/", requiresAuth, CreateFlashcard);
router.post("/edit", requiresAuth, EditFlashcard);
router.post("/delete", requiresAuth, DeleteFlashcard);

module.exports = router;
