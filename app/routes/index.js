const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/user", require("./user"));
router.use("/product", require("./product"));

module.exports = router;