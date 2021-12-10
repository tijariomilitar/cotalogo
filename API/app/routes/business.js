const router = require("express").Router();
const lib = require('jarmlib');

const passport = require('../../config/passport');

const userController = require("../controller/user");
const businessController = require("../controller/business/main");

router.get('/', lib.route.toHttps, userController.verify, businessController.index);

module.exports = router;