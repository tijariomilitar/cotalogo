const User = require('../../model/user');
const userController = require('../user');

const Size = require('../../model/product/size');

const lib = require('jarmlib');

const sizeController = {
	index: async (req, res) => {
		res.render("product/size", { user: req.user });
	},
	save: async (req, res) => {
		let size = new Size(req.body);
		size.user_id = req.user.id;

		try{
			if (!size.id) {
				let response = await size.save();
	      if(response.err){ return res.send({ msg: response.err }); }

      	res.send({ done: "Cor cadastrada com sucesso!" })
			} else {
				let strict_params = { keys: [], values: [] };
				lib.Query.fillParam('size.id', size.id, strict_params);
				let verifySize = await Size.filter([],[],[],strict_params,[])
				
				if(verifySize[0].user_id != req.user.id){ return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" }); }
				
				let response = await Size.update();
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

		lib.Query.fillParam('size.id', req.body.id, strict_params);
		lib.Query.fillParam('size.user_id', req.user.id, strict_params);
		lib.Query.fillParam('size.name', req.body.name, params);

		try {
			let sizes = await Size.filter([],[],params,strict_params,[]);
			res.send({sizes});
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as cores" })
		}
	},
	delete: async (req, res) => {
		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam('size.id', req.params.id, strict_params);
		let verifySize = await Size.filter([],[],[],strict_params,[])
		
		if(verifySize[0].user_id != req.user.id){ return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" }); }

		try {
			await Size.delete(req.params.id);
			res.send({ done: "Cor excluída com sucesso!" });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as cores" })
		}
	},
};

module.exports = sizeController;