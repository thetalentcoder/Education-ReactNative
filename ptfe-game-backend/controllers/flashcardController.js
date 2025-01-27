const asyncHandler = require("express-async-handler");
const Flashcard = require("../models/flashcardModel");

const getFlashcard = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const flashcard = await Flashcard.findOne({ _id: id, userId });

    if (!flashcard) {
      return res.status(404).json({
        message: "Flash card not found",
      });
    }

    res.status(200).json({
      message: "Flash card gotten successfully",
      flashcard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the flash card",
    });
  }
});

const getAllFlashcards = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const flashcards = await Flashcard.find({ userId });

    res.status(200).json({
      message: "Flash cards gotten successfully",
      flashcards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching flash cards",
    });
  }
});

const CreateFlashcard = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { title, questions } = req.body;

    const newFlashcard = new Flashcard({
      title,
      userId: user._id,
      questions: questions.map((question) => ({
        question: question.question,
        answerExplanation: question.answerExplanation,
      })),
    });

    await newFlashcard.save();

    res.status(200).json({
      message: "Flash cards created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating flash cards",
    });
  }
});

const DeleteFlashcard = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

    if (!deletedFlashcard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      message: "Flashcard deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the flashcard",
    });
  }
});

const EditFlashcard = asyncHandler(async (req, res) => {
  try {
    const { id, title, questions } = req.body;
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(id, {
      title,
      questions: questions.map((question) => ({
        question: question.question,
        answerExplanation: question.answerExplanation,
      })),
    });

    if (!updatedFlashcard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      message: "Flashcard updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the flashcard",
    });
  }
});

module.exports = {
  getFlashcard,
  CreateFlashcard,
  getAllFlashcards,
  DeleteFlashcard,
  EditFlashcard,
};
