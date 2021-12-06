const User = require('../../model/user');
const userController = require('../user');

const businessController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
			return res.redirect("/user/login");
		};

		console.log(req.user);

		res.render("business/index", user: req.user);
	},
};

module.exports = businessController;