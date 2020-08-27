// Import npm packages
const express = require("express");
const mongoose = require("mongoose"); // object data model
const morgan = require("morgan");
const path = require("path"); // built-in node module
const routes = require("./routes/api");

const app = express();

// STEP 1 -------------------------------------------------------
// Connect to Backend Server
const PORT = process.env.PORT || 8080;

// STEP 2 -------------------------------------------------------
// MongoDB Connector - make server connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Listener - verify server connection
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Heroku Custom Variable
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // put client/build directory into server
}

// STEP 3 -------------------------------------------------------
// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

// HTTP request listen
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
