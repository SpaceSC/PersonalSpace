const router = require("express").Router();
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/test", testController.test);

router.post("/login", userController.login)

router.post("/toggle-api-status", verifyToken, userController.apiStatusToggle)

router.get("/check-logged-in", verifyToken, userController.checkLoggedIn)

router.get("/apod", verifyToken, userController.apod)

router.delete("/delete-account", verifyToken, userController.deleteAccount)

module.exports = router