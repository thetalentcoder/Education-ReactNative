/* global process */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// exports.requiresAuth = async (req, res, next) => {
//   try {
//     const token = req.headers['auth_token']; // Assuming token is passed in the authorization header
//     if (!token) {
//       return res.status(403).send('No token provided');
//     }

//     let decodedToken;
//     try {
//       decodedToken = await jwt.verify(token, process.env.WOOCOMMERCE_JWT_AUTH_SECURITY_KEY)
//     } catch (error) {
//       next(error);
//       return;
//     }
//     if (decodedToken.data.user.id == -1) {
//       const user = await User.findOne({_id: decodedToken.data.user.userId});
//       if (!user) {
//         throw new Error("Invalid token");
//       }
//       req.user = user;
//       next();
//     } else {
//       const user = await User.findOne({uid: decodedToken.data.user.id});
//       if (!user) {
//         throw new Error("Invalid token");
//       }
//       req.user = user;
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

exports.requiresAuth = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers["auth_token"]; // Assuming token is passed in the 'auth_token' header
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    let decodedToken;
    try {
      // Verify the token
      decodedToken = jwt.verify(token, process.env.WOOCOMMERCE_JWT_AUTH_SECURITY_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userIdField = decodedToken.data.user.id === -1 ? "_id" : "uid";
    const userIdValue = decodedToken.data.user.id === -1
      ? decodedToken.data.user.userId
      : decodedToken.data.user.id;

    // Find the user in the database
    const user = await User.findOne({ [userIdField]: userIdValue });
    if (!user) {
      return res.status(401).json({ message: "Invalid token or user not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization Middleware Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};