Color.controller = {};

Color.controller.create = document.getElementById("color-create-form");
if(Color.controller.create){
	Color.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let color = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Color.save, color);
		if(!response) { return false; }

		event.target.elements.namedItem("name").value = "";

		Color.controller.filter.submit.click();
	});
}

Color.controller.filter = document.getElementById("color-filter-form");
if(Color.controller.filter){
	Color.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let color = {
			name: event.target.elements.namedItem("name").value
		};

		let colors = await API.response(Color.filter, color);
		if(!colors) { return false; }

		const pagination = { pageSize: 10, page: 0 };
		(function(){ lib.carousel.execute("color-filter-box", Color.view.filter, colors, pagination); }());
	});
}

Color.controller.edit = async (color_id) => {
	let color = await API.response(Color.filter, { id: color_id });
	if(!color) { return false; }

	document.getElementById("color-create-form").elements.namedItem("id").value = color[0].id;
	document.getElementById("color-create-form").elements.namedItem("name").value = color[0].name;
};

Color.controller.delete = async (color_id) => {
	let r = confirm('Deseja realmente excluir a cor?');
	if(r){
		if(!await API.response(Color.delete, color_id)){ return false; };
		Color.controller.filter.submit.click();
	}
};