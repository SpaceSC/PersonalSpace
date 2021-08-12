const router = require("express").Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");

router.get("/test", testController.test);

router.post("/login", userController.login)

router.post("/toggle-status", async (req, res) => {

  const { api, status } = req.body;

  const token = req.headers.authorization;
  console.log("token", token);
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json("Unauthorized")
  }
 
  console.log("verified token", verifiedToken);

  const filter = { google_id: verifiedToken.google_id };
  // template string as object key should be in []
  const update = { [`apis.${api}`]: status };

  const existingStatus = await User.findOneAndUpdate(filter, update);

  res.json({ message: "api status updated" }); 
})

module.exports = router