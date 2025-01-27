/* global process */
/* eslint-disable no-unused-vars */

const asyncHandler = require("express-async-handler");
const { getEstTime } = require("../utils/date");
const axios = require("axios");
const User = require("../models/userModel");
const { uploadImage } = require("../utils/files/google/gcs");
const Notification = require("../models/notificationModel.js");
const Video = require("../models/videoModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.WOOCOMMERCE_JWT_AUTH_SECURITY_KEY || "password";

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please provide firstname, lastname, email, and password");
  }

  // Concatenate fullname as "firstname.lastname"
  const fullname = `${firstname} ${lastname}`;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the user
  const newUser = {
    fullname,
    email,
    password: hashedPassword, // Save hashed password
    role: 0, // Default role to 0 if not provided
    subscription: req.body.subscription || "N/A", // Default subscription to "N/A"
    timezone: req.body.timezone || "EST", // Default timezone to "EST"
    uid: -1,
    userType: "apple",
  };

  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({
      message: "register successful",
      user: {_id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      timezone: user.timezone,
      userType: "apple",
      uid: -1}
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user");
  }
});


const appleLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const payload = {
    data: {
      user: { userId: user._id, email: user.email, role: user.role, id: user.uid, userType: user.userType },
    },
  };
  // Generate a JWT token
  const token = jwt.sign(
    payload,
    SECRET_KEY,
    { expiresIn: "1h" } // Token expiration time
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      userType: user.userType
    },
  });
});


const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userIds[0] })
      .then(() => {
        res.status(200).json({ result: true });
      })
      .catch((error) => {
        res.status(200).json({ result: false, message: error });
      });
  } catch (error) {
    console.log(error);
  }
});

const getMe = asyncHandler(async (req, res) => {

  const user = req.user;
  console.log('Invoked User', user._id)
  const notifications = await Notification.find();
  const videos = await Video.find();
  user.notifications = notifications;
  user.videos = videos;
  console.log(user.notifications) // Add notifications to the user object
  res.status(200).json(user); // Return the user object with notifications
});

const updateMe = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const token = req.headers['auth_token'];

  try {
    await axios.post(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/custom/v1/reset-password`,
      {
        new_name: name,
        new_password: password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const user = req.user;
    user.fullname = name;
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);

  } catch(error) {
    console.log(error);
    throw new Error("Failed to update profile");
  }
});

const getTopRankingUsers = asyncHandler(async (req, res) => {
  try {
    let {
      search = "",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = -1,
      mode = "",
    } = req.body;

    const currentUser = req.user;

    let rankQuery = {};
    if (mode) {
      rankQuery = {
        [`score_details.${mode}`]: { $gt: currentUser.score_details.get(mode) },
      };
    } else {
      rankQuery = { score: { $gt: currentUser.score } };
    }

    const rank = (await User.countDocuments(rankQuery)) + 1;

    const sortOptions = {};
    if (mode) {
      sortOptions[`score_details.${mode}`] = sortOrder == 1 ? 1 : -1;
    } else {
      sortOptions[sortBy] = sortOrder == 1 ? 1 : -1;
    }

    const skip = (page - 1) * limit;
    const query = {
      $or: [
        { email: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
      ],
    };

    if (mode) {
      query[`score_details.${mode}`] = { $exists: true, $ne: null };
    }

    const totalCount = await User.countDocuments(query);
    let result = await User.find(query)
      .select(["fullname", "role", "email", "score", "score_details"])
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);

    // Calculate the current users rank for each mode
    if (rank > 10) {
      result.push(currentUser);
    }

    res.status(200).json({
      count: totalCount,
      users: result,
      rank: rank,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// const getUserProfile = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.user.email }).select([
//       "firstname",
//       "lastname",
//       "email",
//     ]);
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });
// const getUser = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });

const getPointsTotal = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user.score_details);
  } catch (error) {
    console.log(error);
  }
});

const getPointsLastDays = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { numDays } = req.body;

    const estNow = getEstTime();
    const pastEstDate = new Date(estNow);
    pastEstDate.setDate(estNow.getDate() - numDays + 1);

    const totalScoresByDay = Array.from({ length: numDays }, () => 0);

    const gameHistory = user.gamehistory.filter(game => {
      const gameDate = new Date(game.date);
      return gameDate >= pastEstDate && gameDate <= estNow;
    });

    gameHistory.forEach(game => {
      const gameDate = new Date(game.date);
      const dayIndex = Math.floor((estNow - gameDate) / (1000 * 60 * 60 * 24));

      if (dayIndex >= 0 && dayIndex < numDays) {
        totalScoresByDay[dayIndex] += game.score;
      }
    });

    res.status(200).json(totalScoresByDay);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getPointsThisMonth = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    const estNow = getEstTime();
    const thisMonth = estNow.getMonth();

    const monthsScoresClassic = user.score_months.get("classicMode") || Array(12).fill(0);
    const monthsScoresSurvivor = user.score_months.get("survivorMode") || Array(12).fill(0);
    const monthsScoresScenario = user.score_months.get("scenarioMode") || Array(12).fill(0);

    const seasonScoreClassic = monthsScoresClassic[thisMonth];
    const seasonScoreSurvivor = monthsScoresSurvivor[thisMonth];
    const seasonScoreScenario = monthsScoresScenario[thisMonth];

    res.status(200).json({
      classicMode: seasonScoreClassic,
      survivorMode: seasonScoreSurvivor,
      scenarioMode: seasonScoreScenario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getPointsLastSeason = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    const estNow = getEstTime();
    const estMonth = estNow.getMonth();
    const previousSeasonMonths = getPreviousSeason(estMonth);
    const monthsScoresClassic = user.score_months.get("classicMode") || Array(12).fill(0);
    const monthsScoresSurvivor = user.score_months.get("survivorMode") || Array(12).fill(0);
    const monthsScoresScenario = user.score_months.get("scenarioMode") || Array(12).fill(0);

    const seasonScoreClassic = monthsScoresClassic[previousSeasonMonths[0]] +
                                monthsScoresClassic[previousSeasonMonths[1]] +
                                monthsScoresClassic[previousSeasonMonths[2]];

    const seasonScoreSurvivor = monthsScoresSurvivor[previousSeasonMonths[0]] +
                                monthsScoresSurvivor[previousSeasonMonths[1]] +
                                monthsScoresSurvivor[previousSeasonMonths[2]];

    const seasonScoreScenario = monthsScoresScenario[previousSeasonMonths[0]] +
                                monthsScoresScenario[previousSeasonMonths[1]] +
                                monthsScoresScenario[previousSeasonMonths[2]];

 
    res.status(200).json({
      classicMode: seasonScoreClassic,
      survivorMode: seasonScoreSurvivor,
      scenarioMode: seasonScoreScenario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getSeasonMonths = (season) => {
  switch (parseInt(season)) {
    case 1:
      return [0, 1, 2];
    case 2:
      return [3, 4, 5];
    case 3:
      return [6, 7, 8];
    case 4:
      return [9, 10, 11];
    default:
      throw new Error("Invalid season");
  }
};

const getPreviousSeason = (month) => {
  const season = month / 3;
  switch (parseInt(season)) {
    case 1:
      return [0, 1, 2];
    case 2:
      return [3, 4, 5];
    case 3:
      return [6, 7, 8];
    case 0:
      return [9, 10, 11];
    default:
      throw new Error("Invalid season");
  }
}

const getTopScoresBySeason = asyncHandler(async (req, res) => {
  try {
    const { season, mode } = req.body;
    // if (!quizMode || !season) return res.status(400).json("Please provide quizMode and season");

    const seasonMonths = getSeasonMonths(season);

    const users = await User.find({ "score_months": { $exists: true } });

    let seasonScores = users
      .map(user => {
        const monthsScores = (mode === '' ? user.score_total_months : user.score_months.get(mode)) || Array(12).fill(0);
        const seasonScore = seasonMonths
          .reduce((acc, month) => acc + monthsScores[month], 0);
        return {
          userId: user._id,
          userName: user.fullname,
          userAvatar: user.avatarUrl,
          seasonScore,
        };
      })
      .sort((a, b) => b.seasonScore - a.seasonScore);

    seasonScores = seasonScores.map((score, index) => ({
      rank: index + 1,
      ...score
    })).slice(0, 10);
    const userRank = seasonScores.find(score => score.userId.toString() === req.user._id.toString())?.rank;

    const currentUser = await User.findById(req.user._id);
    const currentUserScores = ( mode === '' ? currentUser?.score_months.get(mode) : currentUser?.score_total_months) || Array(12).fill(0);
    const currentUserSeasonScore = seasonMonths
      .reduce((acc, month) => acc + currentUserScores[month], 0);
    const userScore = {
      rank: userRank,
      userId: currentUser._id,
      userName: currentUser.fullname,
      userAvatar: currentUser.avatarUrl,
      seasonScore: currentUserSeasonScore,
    }

    res.status(200).json({seasonScores, userScore});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getSurvivorLevel = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    
    const survivorLevel = user.survivorLevel;

    res.status(200).json({survivorLevel});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.avatarUrl = req.body.avatarUrl;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

const updatePurchaseId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  user.uid = req.body.purchaseId;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 25,
      sortBy = "createdAt",
      sortOrder = -1,
    } = req.body;


    const sortOptions = {};
    sortOptions[sortBy] = sortOrder == 1 ? 1 : -1;
    const skip = (page - 1) * limit;
    const query = {
      $or: [
        { email: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
      ],
    };

    const totalCount = await User.countDocuments(query);
    const result = await User.find(query)
      .select(["fullname", "role", "email", "subscription"])
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);
    res.status(200).json({ count: totalCount, users: result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getMe,
  updateMe,
  registerUser,
  appleLoginUser,
  getTopRankingUsers,
  getPointsTotal,
  getPointsLastDays,
  getPointsThisMonth,
  getPointsLastSeason,
  getTopScoresBySeason,
  getSurvivorLevel,
  deleteUser,
  updateUser,
  getUsers,
  updatePurchaseId
};
