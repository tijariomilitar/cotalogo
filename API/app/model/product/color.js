const db = require('../../../config/connection');
const lib = require('jarmlib');

const Color = function(color){
	this.id = color.id;
	this.user_id = 0;
	this.name = color.name;

	this.save = () => {
		if(!this.name || this.name.length < 2 || this.name.length > 100) { return { err: "Nome inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_cotalogo.product_color');

    return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id da cor é inválido" }; }
		if(!this.name || this.name.length < 2 || this.name.length > 100) { return { err: "Nome inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_cotalogo.product_color', 'id');

    return db(query);
	};
};

Color.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_cotalogo.product_color color")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Color.delete = async (color_id) => {
	let query = "DELETE FROM cms_cotalogo.product_color WHERE id='"+color_id+"';";
	return db(query);
};

module.exports = Color;