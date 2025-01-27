/* global process */
/* eslint-disable no-unused-vars */

// Import required packages and modules
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const multer = require("multer");
const cookieParser = require('cookie-parser');

require("dotenv").config();

// Define the port on which the server will run
const port = process.env.PORT || 5004;
connectDB();

// Create the Express application
const app = express();
var corsOptions = {
  origin: ["https://shark-app-zxdbr.ondigitalocean.app"],
  optionsSuccessStatus: 200, // For legacy browser support
};
if (process.env.NODE_ENV === "development") {
  corsOptions.origin.push("http://localhost:3000");
  corsOptions.origin.push("http://192.168.101.139:5004");
}
// Set up multer for parsing form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors(corsOptions));
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Apply middleware to parse form-data
app.use(upload.any());

// Define routes for the API
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/quiz", require("./routes/quizRoute"));
app.use("/api/question", require("./routes/questionRoute"));
app.use("/api/scenario", require("./routes/scenarioRoute"));
app.use("/api/migration", require("./routes/migrationRoute"));
app.use("/api/flashcard", require("./routes/flashcardRoute"));
app.use("/api/slidercard", require("./routes/sliderCardRoute"));
app.use("/api/woocommerce", require("./routes/woocommerceRoute"));
app.use("/api/notification", require("./routes/notificationRoute"));
app.use("/api/video", require("./routes/videoRoute"));
app.use("/api/slider", require("./routes/sliderRoute"));
// Create the HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port ${port}`));