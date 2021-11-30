const User = require('../model/user');

const lib = require('jarmlib');
const bcrypt = require('bcrypt-nodejs');

const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	signup: async (req, res) => {
		res.render('user/signup', { user: req.user });
	},
	login: async (req, res) => {
		res.render('user/login', { user: req.user });
	},
	create: async (req, res) => {
		const user = new User();
		user.name = req.body.name;
		user.business = req.body.business;
		user.email = req.body.email;
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;

		if((await User.findByEmail(user.email)).length){ return res.send({ msg: "Este E-mail já está sendo utilizado." }) }
		if((await User.findByBusiness(user.business)).length){ return res.send({ msg: "Este nome de empresa já está sendo utilizado." }) }

		try {
			let response = await user.save();
			if(response.err){ return res.send({ msg: response.err }); }

			res.send({ done: "Usuário cadastrado com sucesso!" });
		} catch (err) {
			res.send({ err });
		}

	}
};

module.exports = userController;