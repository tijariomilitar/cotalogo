const User = require('../../model/user');
const userController = require('../user');

const productController = {
	index: async (req, res) => {
		res.render("product/index", { user: req.user });
	}
};

module.exports = productController;