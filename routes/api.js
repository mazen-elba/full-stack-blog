const express = require("express");
const BlogPost = require("../models/blogPost");

const router = express.Router();

// ROUTES ------------------------------------
// Fetch Data from Database
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

// Send Data to Database
router.post("/save", (req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);

  // Save Data in Database
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

// DUMMY PAGE
// router.get("/name", (req, res) => {
//   const data = {
//     username: "milo",
//     age: 2,
//   };
//   res.json(data);
// });

module.exports = router;
