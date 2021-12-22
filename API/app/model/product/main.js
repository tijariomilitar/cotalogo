const db = require('../../../config/connection');
const lib = require('jarmlib');

const Product = function(product){
	this.id;
	this.name = product.name;
	this.code = product.code;
	this.color = product.color;
	this.size = product.size;

	this.save = () => {
		if(!this.name || this.name.length > 2 || this.name.length > 100) { return { err: "Nome inválido" }; }
		
		let query = new lib.Query.save(this, 'cms_cotalogo.product');
    return db(query);
	};
};

module.exports = Product;