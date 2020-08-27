const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

// MongoDB Atlas Database-Network Connection
// const MONGODB_URI = "mongodb+srv://WheatRidge-18:WheatRidge-18@blog.en8nc.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Listener
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Heroku Custom Variable
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // put client/build directory into server
}

app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
