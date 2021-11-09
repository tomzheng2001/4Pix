const express = require("express");
const router = express.Router();
const { readUser, userById } = require("../controllers/user");
const { isAuth, requireSignin } = require("../controllers/auth");

router.get("/user/:userId", requireSignin, isAuth, readUser);

router.param("userId", userById);

module.exports = router;
