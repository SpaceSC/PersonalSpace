const router = require("express").Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");

router.get("/test", testController.test);

router.post("/login", userController.login)

router.post("/toggle-status", userController.apiStatusToggle)

module.exports = router