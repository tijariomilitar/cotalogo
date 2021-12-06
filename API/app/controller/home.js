const User = require('../model/user');
const userController = require('./user');

const homeController = {
	index: async (req, res) => {
		if(req.user){
			return res.render('business/index', { user: req.user });
		};
		res.render('index', { user: req.user });
	},
	login: (req, res) => {
		if(req.user){
			return res.redirect("/");
		};
		res.render('user/login', { user: req.user, message: req.flash('loginMessage') });
	},
	successfulLogin: (req, res) => {
		res.redirect('/');
	},
	signup: async (req, res) => {
		if(req.user){
			return res.redirect('/');
		};
		res.render('user/signup', { user: req.user, message: req.flash('signupMessage')});
	},
	successfulSignup: (req, res) => {
		res.redirect('/');
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
};

module.exports = homeController;