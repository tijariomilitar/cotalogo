const router = require("express").Router();

const userController = require("../controller/user");

// router.get('/', userController.verify, userController.index);

router.get("/login", userController.login);
router.get("/signup", userController.signup);
// router.get("/logout", userController.logout);

router.post('/login', userController.login);
router.post('/signup', userController.create);

module.exports = router;