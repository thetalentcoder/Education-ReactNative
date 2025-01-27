const Slider = require("../models/sliderModel.js");
const asyncHandler = require("express-async-handler");

    
const GetAllSliders = asyncHandler(async (req, res) => {
try {
      const sliders = await Slider.find();

      res.status(200).json({
      message: "sliders gotten successfully",
      sliders: sliders
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while fetching sliders",
      });
}
});
const SlidersWithFilter = asyncHandler(async (req, res) => {
    let page = parseInt(req.body.page); // Default to page 1 if not provided
    let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
    const searchQuery = req.body.search || ""; // Get the search query from the request
    // const filter = req.body.filter || {};
    const searchRegex = new RegExp(searchQuery, "i");
    const query = { title: searchRegex };
    const sliders = await Slider.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  
    res.json({ result: sliders });
});

const CreateSlider = asyncHandler(async (req, res) => {
try {
      const { title, content } = req.body;

      const newSlider = new Slider({
      title,
      content
      });

      await newSlider.save();

      res.status(200).json({
      message: "Slider created successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while creating Sliders",
      });
}
});
    
const DeleteSlider = asyncHandler(async (req, res) => {
try {
      const { slider } = req.body;
      console.log("delete Slider function");

      await Slider.deleteMany({ _id: { $in: slider } });

      res.status(200).json({
      message: "Slider deleted successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while deleting the Slider",
      });
}
});
    
const EditSlider = asyncHandler(async (req, res) => {
try {
      const { id, title, content} = req.body;

      console.log("updated succefully");
      const updatedSlider = await Slider.findByIdAndUpdate(id, {
      title,
      content
      });

      if (!updatedSlider) {
      return res.status(404).json({
      message: "Slider not found",
      });
      }

      res.status(200).json({
      message: "Slider updated successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while updating the Slider",
      });
}
});

module.exports = {
  SlidersWithFilter,
  GetAllSliders,
  CreateSlider,
  DeleteSlider,
  EditSlider,
};

