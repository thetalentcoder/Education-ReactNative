/* global process */
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // mongoose.set('sanitizeFilter', true);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
