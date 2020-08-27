const express = require("express");

const router = express.Router();

const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

router.post("/save", (req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Oops, Internal Server Error!!!" });
      return;
    }

    return res.json({
      msg: "Yaay! Data has been saved.",
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "milo",
    age: 2,
  };
  res.json(data);
});

module.exports = router;
