const express = require("express");
const { signup, login, reload } = require("../controller/user");
const { isAuth } = require("../middleware/is-auth");
const router = express.Router();

router.put("/signup", signup);
router.post("/login", login);

module.exports = router;
