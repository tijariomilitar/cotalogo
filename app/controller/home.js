const User = require('../model/user');
const userController = require('./user');

const homeController = {
	index: async (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('index', { message: req.flash('loginMessage') });
	},
	info: async (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('info');
	}
};

module.exports = homeController;