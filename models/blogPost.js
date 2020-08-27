const mongoose = require("mongoose");

// Schema - define model
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Register Model
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
