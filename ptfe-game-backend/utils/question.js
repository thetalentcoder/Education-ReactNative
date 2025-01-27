const mongoose = require("mongoose");
const Question = require("../models/questionModel");

const getQuestionsWithQuizzesIncluded = async (
  search,
  sortBy,
  sortOrder,
  limit,
  page,
  filter
) => {
  // console.log(search, sortBy, sortOrder, limit, page, filter);

  const pipeline = [
    {
      $lookup: {
        from: "quiztracks",
        localField: "examCategory",
        foreignField: "_id",
        as: "quizTrack",
      },
    },
    {
      $addFields: {
        examCategory: {
          $arrayElemAt: [
            {
              $map: {
                input: "$quizTrack", // The joined data array
                as: "qt",
                in: {
                  _id: "$$qt._id", // Include _id if you need it
                  name: "$$qt.name", // Only select the name field
                },
              },
            },
            0, // Get the first element (because it's an array)
          ],
        },
      },
    },
    {
      $project: {
        quizTrack: 0, // Optionally remove the `quizTrack` field after use
      },
    },
  ];

  if (filter && typeof filter.isActive === "boolean") {
    pipeline.unshift({
      $match: { isActive: filter.isActive },
    });
  }

  if (filter && filter.category) {
    pipeline.unshift({
      $match: {
        "categories.category": new mongoose.Types.ObjectId(filter.category),
      },
    });
  }

  if (filter && filter.scenarioId !== undefined) {
    if (filter.scenarioId) {
      pipeline.unshift({
        $match: { scenarioId: { $exists: true, $ne: [] } },
      });
    } else {
      pipeline.unshift({
        $match: { scenarioId: { $exists: false } },
      });
    }
  }

  if (filter && filter._id) {
    pipeline.unshift({
      $match: { _id: new mongoose.Types.ObjectId(filter._id) },
    });
  }

  if (sortBy && sortOrder) {
    // Add a $sort stage to sort the results
    pipeline.push({
      $sort: {
        [sortBy]: parseInt(sortOrder),
        createdAt: filter.sortByDate,
      },
    });
  } else {
    pipeline.push({
      $sort: {
        createdAt: filter.sortByDate,
      },
    });
  }

  if (search) {
    pipeline.unshift({
      $match: {
        $or: [
          { question: { $regex: search, $options: "i" } },
          { "answers.answer": { $regex: search, $options: "i" } },
        ],
      },
    });
  }
  if (limit && page) {
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });
  }

  let questions = await Question.aggregate(pipeline);

  return questions;
};

module.exports = {
  getQuestionsWithQuizzesIncluded,
};
