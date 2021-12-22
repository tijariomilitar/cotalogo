const db = require('../../../config/connection');
const lib = require('jarmlib');

const Size = function(size){
	this.id = size.id;
	this.user_id = 0;
	this.name = size.name;

	this.save = () => {
		if(!this.name || this.name.length < 1 || this.name.length > 100) { return { err: "Nome inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_cotalogo.product_size');

    return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id da cor é inválido" }; }
		if(!this.name || this.name.length < 1 || this.name.length > 100) { return { err: "Nome inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_cotalogo.product_size', 'id');

    return db(query);
	};
};

Size.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_cotalogo.product_size size")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Size.delete = async (size_id) => {
	let query = "DELETE FROM cms_cotalogo.product_size WHERE id='"+size_id+"';";
	return db(query);
};

module.exports = Size;