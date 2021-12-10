const User = require('../../model/user');
const userController = require('../user');

const Color = require('../../model/product/color');

const lib = require('jarmlib');

const colorController = {
	index: async (req, res) => {
		res.render("product/color", { user: req.user });
	},
	save: async (req, res) => {
		let color = new Color(req.body);
		color.user_id = req.user.id;

		try{
			if (!color.id) {
				let response = await color.save();
	      if(response.err){ return res.send({ msg: response.err }); }

      	res.send({ done: "Cor cadastrada com sucesso!" })
			} else {
				let strict_params = { keys: [], values: [] };
				lib.Query.fillParam('color.id', color.id, strict_params);
				let verifyColor = await Color.filter([],[],[],strict_params,[])
				
				if(verifyColor[0].user_id != req.user.id){ return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" }); }
				
				let response = await color.update();
	      if(response.err){ return res.send({ msg: response.err }); }
      	
      	res.send({ done: "Cor atualizada com sucesso!" })
			}
		} catch(err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a cor, aguarde um momento ou recarregue a página." });
		}
	},
	filter: async (req, res) => {
		let params = { keys: [], values: [] };
		let strict_params = { keys: [], values: [] };

		lib.Query.fillParam('color.id', req.body.id, strict_params);
		lib.Query.fillParam('color.user_id', req.user.id, strict_params);
		lib.Query.fillParam('color.name', req.body.name, params);

		try {
			let colors = await Color.filter([],[],params,strict_params,[]);
			res.send({colors});
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as cores" })
		}
	},
	delete: async (req, res) => {
		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam('color.id', req.params.id, strict_params);
		let verifyColor = await Color.filter([],[],[],strict_params,[])
		
		if(verifyColor[0].user_id != req.user.id){ return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" }); }

		try {
			await Color.delete(req.params.id);
			res.send({ done: "Cor excluída com sucesso!" });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as cores" })
		}
	},
};

module.exports = colorController;