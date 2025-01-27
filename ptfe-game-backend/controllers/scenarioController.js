const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");
const Scenario = require("../models/scenarioModel");
const { uploadImage } = require("../utils/files/google/gcs");

const createScenario = asyncHandler(async (req, res) => {
  const { title, scenario } = req.body;
  if (!scenario) {
    res.status(400);
    throw new Error("Please add scenario field");
  }
  const newScenarioObject = {
    title,
    scenario
  };
  const newScenario = await Scenario.create(newScenarioObject);
  res.status(200).json(newScenario);
});

const getScenario = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400);
    throw new Error("Please provide scenario id");
  }
  const scenario = await Scenario.findById(id);
  const questions = await Question.find({ scenarioId: scenario.id }).select('question');
  const scenarioObject = scenario.toObject();
  scenarioObject.questions = questions;
  res.status(200).json(scenarioObject);
});

const getScenarios = asyncHandler(async (req, res) => {
    const totalScenarios = await Scenario.countDocuments();
    const scenarios = await Scenario.find();
    res.json({ total: totalScenarios, result: scenarios });
});

const getScenariosWithFilter = asyncHandler(async (req, res) => {
    let page = parseInt(req.body.page); // Default to page 1 if not provided
    let limit = parseInt(req.body.limit); // Default to a limit of 10 if not provided
    const searchQuery = req.body.search || ""; // Get the search query from the request
    // const filter = req.body.filter || {};
    const searchRegex = new RegExp(searchQuery, "i");
    const query = { title: searchRegex };
    const totalScenarios = await Scenario.countDocuments(query);
    let scenarios = await Scenario.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    scenarios = await Promise.all(scenarios.map(async (scenario) => {
      const questions = await Question.find({ scenarioId: scenario.id }).select('question');
      const scenarioObject = scenario.toObject();
      scenarioObject.questions = questions;
      return scenarioObject;
    }));

    res.json({ total: totalScenarios, result: scenarios });
});

const editScenario = asyncHandler(async (req, res) => {
  const { id, title, scenario } = req.body;
  if ( !scenario ) {
    res.status(400);
    throw new Error("Please add scenario field");
  }
  const existingScenario = await Scenario.findById(id);
  if (!existingScenario) {
    res.status(400);
    throw new Error(`Scenario with ID ${id} not found.`);
  }
  existingScenario.title = title;
  existingScenario.scenario = scenario;
  const updatedScenario = await existingScenario.save();
  res.status(200).json(updatedScenario);
});

const deleteScenarios = asyncHandler(async (req, res) => {
  const { scenarios } = req.body;
  if (!scenarios || scenarios.length === 0) {
    res
      .status(400)
      .json({ success: false, message: "Please provide scenario IDs" });
    return;
  }
  // Step 1: Find the questions that contain the scenarios to be deleted
  const questionsToUpdate = await Question.find({
    "scenarioId": { $in: scenarios },
  });
  // Step 2: Remove the scenarioId from the affected questions
  questionsToUpdate.forEach(async (question) => {
    question.scenarioId = undefined;
    await question.save();
  });
  // Step 3: Delete the scenarios
  await Scenario.deleteMany({ _id: { $in: scenarios } });

  res.status(200).json({
    success: true,
    message: "Scenarios removed from questions and deleted successfully.",
  });
});

const uploadScenarioImage = asyncHandler(async (req, res) => {
  if (!req.file?.buffer) {
    res.status(400);
    throw new Error("Please provide an image!");
  }

  const image = await uploadImage(req.file.buffer);

  res.status(200).json({ result: image });
});

module.exports = {
  createScenario,
  getScenario,
  getScenarios,
  getScenariosWithFilter,
  uploadScenarioImage,
  editScenario,
  deleteScenarios,
};
