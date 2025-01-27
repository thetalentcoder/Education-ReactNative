const Video = require("../models/videoModel.js");
const asyncHandler = require("express-async-handler");

const getVideo = asyncHandler(async (req, res) => {
      try {
        const userId = req.user._id;
        const { id } = req.params;
    
        const video = await Video.findOne({ _id: id, userId });
    
        if (!video) {
          return res.status(404).json({
            message: "Flash card not found",
          });
        }
    
        res.status(200).json({
          message: "Video gotten successfully",
          video,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "An error occurred while fetching the flash card",
        });
      }
    });
    
const GetAllVideos = asyncHandler(async (req, res) => {
try {
      const videos = await Video.find({ });

      res.status(200).json({
      message: "Videos gotten successfully",
      videos,
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while fetching flash cards",
      });
}
});

const CreateVideo = asyncHandler(async (req, res) => {
try {
      const { title, description, vimeoId } = req.body;

      const newVideo = new Video({
      title,
      description,
      vimeoId,
      });

      await newVideo.save();

      res.status(200).json({
      message: "Video created successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while creating videos",
      });
}
});
    
const DeleteVideos = asyncHandler(async (req, res) => {
try {
      const { videos } = req.body;
      console.log("delete video function");

      await Video.deleteMany({ _id: { $in: videos } });

      res.status(200).json({
      message: "Video deleted successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while deleting the video",
      });
}
});
    
const EditVideo = asyncHandler(async (req, res) => {
try {
      const { id, title, description, vimeoId } = req.body;

      console.log("updated succefully");
      const updatedVideo = await Video.findByIdAndUpdate(id, {
      title,
      description,
      vimeoId,
      });

      if (!updatedVideo) {
      return res.status(404).json({
      message: "Video not found",
      });
      }

      res.status(200).json({
      message: "Video updated successfully",
      });
} catch (error) {
      console.error(error);
      res.status(500).json({
      message: "An error occurred while updating the video",
      });
}
});

const getVideosWithFilter = asyncHandler(async (req, res) => {
      let page = parseInt(req.body.page); // Default to page 1 if not provided
      let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
      const searchQuery = req.body.search || ""; // Get the search query from the request
      // const filter = req.body.filter || {};
      const searchRegex = new RegExp(searchQuery, "i");
      const query = { title: searchRegex };
      const videos = await Video.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    
      res.json({ result: videos });
});

module.exports = {
  getVideo,
  GetAllVideos,
  CreateVideo,
  DeleteVideos,
  EditVideo,
  getVideosWithFilter,  
};

