const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.use("/user", require("./user"));
// router.use("/product", require("./product"));

module.exports = router;