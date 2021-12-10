const router = require("express").Router();
const lib = require('jarmlib');

const passport = require('../../config/passport');

const userController = require("../controller/user");
const productController = require("../controller/product/main");
const colorController = require("../controller/product/color");

router.get('/', lib.route.toHttps, userController.verify, productController.index);

router.get('/color', lib.route.toHttps, userController.verify, colorController.index);
router.post('/color/save', lib.route.toHttps, userController.verify, colorController.save);
router.post('/color/filter', lib.route.toHttps, userController.verify, colorController.filter);
router.delete('/color/delete/:id', lib.route.toHttps, userController.verify, colorController.delete);

module.exports = router;