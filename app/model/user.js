const db = require('../../config/connection');

const User = function(){
	this.id;
	this.name;
	this.store;
	this.email;
	this.password;
	this.access;

	this.save = () => {
		let query = "INSERT INTO cms_cotalogo.user (name, email, password) values ('"
	        +this.name+"', '"
	        +this.email+"', '"
	        +this.password+"')";
	    return db(query);
	};
};

// User.updateName = (user) => {
// 	let query = "UPDATE cms_cotalogo.user SET name='"+user.name+"' WHERE id='"+user.id+"';";
// 	// let query = "UPDATE cms_cotalogo.user SET name='"+user.name+"', name='"+user.name+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateEmail = (user) => {
// 	let query = "UPDATE cms_cotalogo.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updatePassword = (user) => {
// 	let query = "UPDATE cms_cotalogo.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateDepartment = (user) => {
// 	let query = "UPDATE cms_cotalogo.user SET department='"+user.department+"', role='"+user.role+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

User.list = () => {
	let query = "SELECT * FROM cms_cotalogo.user;";
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM cms_cotalogo.user WHERE id='"+id+"';";
	return db(query);
};

User.findByUsername = (user) => {
	let query = "SELECT * FROM cms_cotalogo.user WHERE username='"+user.username+"';";
	return db(query);
};

User.findByEmail = (email) => {
	let query = "SELECT * FROM cms_cotalogo.user WHERE email='"+email+"';";
	console.log(query)
	return db(query);
};

User.updateAccess = (user) => {
	let query = "UPDATE cms_cotalogo.user SET access='"+user.newAccess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updatePassword = (user) => {
	let query = "UPDATE cms_cotalogo.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updateInfo = (user) => {
	let query = "";
	if(user.email && user.birth){
		query = "UPDATE cms_cotalogo.user SET email='"+user.email+"', birth='"+user.birth+"' WHERE id='"+user.id+"';";
	} else if(user.email && !user.birth){
		query = "UPDATE cms_cotalogo.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
	} else if(!user.email && user.birth){
		query = "UPDATE cms_cotalogo.user SET birth='"+user.birth+"' WHERE id='"+user.id+"';";
	};
	return db(query);
};

module.exports = User;