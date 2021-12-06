const router = require("express").Router();
const lib = require('jarmlib');

const passport = require('../../config/passport');

const userController = require("../controller/user");
const homeController = require("../controller/home");

router.get('/', lib.route.toHttps, userController.verify, userController.index);

module.exports = router;