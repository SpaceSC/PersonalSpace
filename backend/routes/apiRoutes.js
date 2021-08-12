const router = require("express").Router();
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");

router.get("/test", testController.test);

router.post("/login", userController.login)

router.post("/toggle-api-status", userController.apiStatusToggle)

module.exports = router