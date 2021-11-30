const db = require('../../config/connection');
const lib = require('jarmlib');

const User = function(){
	this.id;
	this.name;
	this.store;
	this.email;
	this.password;
	this.access;

	this.save = () => {
		if(!this.name || this.name.length < 3) { return { err: "Nome inválido" }; }
		if(!this.business || this.business.length < 1) { return { err: "O nome da empresa é inválido!" }; }
		if(!lib.validateEmail(this.email)) { return { err: "Email inválido!" }; }
		if(!this.password || this.password.length < 8) { return { err: "Senha inválida!" }; }
		if(this.password !== this.passwordConfirm) { return { err: "Senhas não conferem!" }; }
		
		let query = "INSERT INTO cms_cotalogo.user (name, business, email, password, access) values ('"
	        +this.name+"', '"
	        +this.business+"', '"
	        +this.email+"', '"
	        +this.password+"', '"
	        +this.access+"')";
	    return db(query);
	};
};

User.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_cotalogo.user user")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

User.findByEmail = email => {
	let query = "SELECT * FROM cms_cotalogo.user WHERE email='"+email+"';";
	return db(query);
};

User.findByBusiness = business => {
	let query = "SELECT * FROM cms_cotalogo.user WHERE business='"+business+"';";
	return db(query);
};

module.exports = User;