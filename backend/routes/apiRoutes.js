const router = require("express").Router();
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");
const apodController = require("../controllers/apodController");
const verifyToken = require("../middleware/verifyToken");

router.get("/test", testController.test);

router.post("/login", userController.login)

router.post("/toggle-api-status", verifyToken, userController.apiStatusToggle)

router.post("/set-username", verifyToken, userController.setUsername)

router.get("/check-logged-in", verifyToken, userController.checkLoggedIn)

router.get("/apod", verifyToken, apodController.getToday)

router.get("/apod/:date", verifyToken, apodController.getByDate)

router.get("/user-list", verifyToken, userController.getUsers)

router.get("/random-fact", verifyToken, userController.getRandomFact)

router.delete("/delete-account", verifyToken, userController.deleteAccount)

module.exports = router