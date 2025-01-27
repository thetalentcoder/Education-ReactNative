const asyncHandler = require("express-async-handler");
const SliderCard = require("../models/SliderCardModel");

const GetCard = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const flashcard = await SliderCard.findOne({ _id: id, userId });

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

const GetAllCards = asyncHandler(async (req, res) => {
  try {
    const slidercards = await SliderCard.find({ });

    res.status(200).json({
      message: "Flash cards gotten successfully",
      slidercards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching flash cards",
    });
  }
});

const CreateCard = asyncHandler(async (req, res) => {
  try {
    const { title, linkText, url } = req.body;

    const newCard = new SliderCard({
      title,
      linkText,
      url,
    });

    await newCard.save();

    res.status(200).json({
      message: "Slider card created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating flash cards",
    });
  }
});

const DeleteCards = asyncHandler(async (req, res) => {
  try {
    const { sliderCards } = req.body;
    console.log("delete slider card function");

    await SliderCard.deleteMany({ _id: { $in: sliderCards } });

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

const EditCard = asyncHandler(async (req, res) => {
  try {
    const { id, title, linkText, url } = req.body;

    console.log("updated succefully");
    const updatedSliderCard = await SliderCard.findByIdAndUpdate(id, {
      title,
      linkText,
      url,
    });

    if (!updatedSliderCard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      message: "Slider Card updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the flashcard",
    });
  }
});

const getSliderCardsWithFilter = asyncHandler(async (req, res) => {
  let page = parseInt(req.body.page); // Default to page 1 if not provided
  let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
  const searchQuery = req.body.search || ""; // Get the search query from the request
  // const filter = req.body.filter || {};
  const searchRegex = new RegExp(searchQuery, "i");
  const query = { title: searchRegex };
  const totalSliderCards = await SliderCard.countDocuments(query);
  const sliderCards = await SliderCard.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total: totalSliderCards, result: sliderCards });
});

module.exports = {
  GetCard,
  GetAllCards,
  EditCard,
  DeleteCards,
  CreateCard,
  getSliderCardsWithFilter,
};
