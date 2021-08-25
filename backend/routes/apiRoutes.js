const router = require("express").Router();
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");
const apodController = require("../controllers/apodController");
const randomFactController = require("../controllers/randomFactController");
const verifyToken = require("../middleware/verifyToken");

router.get("/test", testController.test);

router.get("/error-test", testController.error500Test);

router.post("/login", userController.login)

router.patch("/toggle-api-status", verifyToken, userController.apiStatusToggle)

router.post("/set-username", verifyToken, userController.setUsername)

router.get("/check-logged-in", verifyToken, userController.checkLoggedIn)

router.get("/apod", verifyToken, apodController.getToday)

router.get("/apod/:date", verifyToken, apodController.getByDate)

router.get("/random-apod", verifyToken, apodController.getRandomApod)

router.get("/user-list", verifyToken, userController.getUsers)

router.get("/random-fact", verifyToken, randomFactController.getRandomFact)


router.delete("/delete-account", verifyToken, userController.deleteAccount)

router.delete("/delete-account/:id", verifyToken, userController.deleteAccountById)

module.exports = router