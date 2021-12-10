const User = require('../../model/user');
const userController = require('../user');

const businessController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
			return res.redirect("/user/login");
		};

		res.render("business/index", { user: req.user });
	},
	// load: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
		// 	return res.redirect("/user/login");
		// };

	// 	console.log(req.params)
	// 	res.render("business/index", user: req.user);
	// },
};

module.exports = businessController;