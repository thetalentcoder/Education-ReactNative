const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/authMiddleware.js");
const {
  GetAllSliders,
  CreateSlider,
  DeleteSlider,
  EditSlider,
  SlidersWithFilter
} = require("../controllers/sliderController.js");

router
  .route("/")
  .post(CreateSlider)
  .delete(DeleteSlider)
  .put(EditSlider);
router.post("/getsliders", GetAllSliders);
router.post("/getsliderswithfilter", SlidersWithFilter);
module.exports = router;
