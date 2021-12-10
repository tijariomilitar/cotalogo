const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.get("/login", lib.route.toHttps, homeController.login);
router.get("/signup", lib.route.toHttps, homeController.signup);

router.use("/user", require("./user"));
router.use("/business", require("./business"));
router.use("/product", require("./product"));

module.exports = router;