const User = require('../../model/user');
const userController = require('../user');

const Product = require('../../model/product/main');
const Color = require('../../model/product/color');
const Size = require('../../model/product/size');
const Category = require('../../model/product/category');
const Variation = require('../../model/product/variation');

const lib = require('jarmlib');

const productController = {
	index: async (req, res) => {
		try {
			let color_strict_params = { keys: [], values: [] };
			lib.Query.fillParam("color.user_id", req.user.id, color_strict_params);
			let colors = await Color.filter([],[],[],color_strict_params,[]);

			let size_strict_params = { keys: [], values: [] };
			lib.Query.fillParam("size.user_id", req.user.id, size_strict_params);
			let sizes = await Size.filter([],[],[],size_strict_params,[]);

			let category_strict_params = { keys: [], values: [] };
			lib.Query.fillParam("category.user_id", req.user.id, category_strict_params);
			let categories = await Category.filter([],[],[],category_strict_params,[]);

			for(let i in categories) {
				let variation_strict_params = { keys: [], values: [] };
				lib.Query.fillParam("variation.category_id", categories[i].id, variation_strict_params);
				lib.Query.fillParam("variation.user_id", req.user.id, variation_strict_params);
				let variations = await Variation.filter([],[],[],variation_strict_params,[]);
				if(variations.length) { categories[i].variations = variations; }
			}
			
			res.render("product/index", { user: req.user, colors, sizes, categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao carregar suas informações, por favor, recarregue a página." });
		};
	},
	save: async (req, res) => {
		let product = new Product(req.body);
		product.user_id = req.user.id;

		let obj = lib.convertTo.object(product);
		for(let i in obj) {
			console.log(i);
		}

		console.log(obj);

		try{
			if (!product.id) {
				// Criar objeto com variações excedentes
				// Verificar se as variações pertencem ao usuário
				// Salvar produto
				// Salvar variações em product_property

				// let response = await color.save();
		  	// if(response.err){ return res.send({ msg: response.err }); }

      	res.send({ done: "Produto cadastrado com sucesso!" })
			} else {
				// Criar objeto com variações excedentes
				// Verificar se as variações pertencem ao usuário

				// Atualiza produtos
				// Verificar se as variações já estão cadastradas
				// Cadastrar variações que ainda não estiverem cadastradas
      	
      	res.send({ done: "Produto atualizado com sucesso!" })
			}
		} catch(err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a cor, aguarde um momento ou recarregue a página." });
		}
	}
};

module.exports = productController;