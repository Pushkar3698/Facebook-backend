const express = require("express");
const {
  home,
  createPost,
  getPosts,
  addLike,
  deletePost,
  addComment,
} = require("../controller/feed");

const { isAuth } = require("../middleware/is-auth");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Set up the multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public")); // specify the destination directory here
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/home", isAuth, home);
router.post("/createPost", upload.single("image"), createPost);
router.get("/getPosts", isAuth, getPosts);
router.post("/addLike", isAuth, addLike);
router.post("/deletePost", isAuth, deletePost);
router.post("/addComment", isAuth, addComment);

module.exports = router;
