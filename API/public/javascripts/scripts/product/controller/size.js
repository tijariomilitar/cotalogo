Size.controller = {};

Size.controller.create = document.getElementById("size-create-form");
if(Size.controller.create){
	Size.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let size = {
			id: event.target.elements.namedItem("id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Size.save, size);
		if(!response) { return false; }

		event.target.elements.namedItem("name").value = "";

		Size.controller.filter.submit.click();
	});
}

Size.controller.filter = document.getElementById("size-filter-form");
if(Size.controller.filter){
	Size.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let size = {
			name: event.target.elements.namedItem("name").value
		};

		let sizes = await API.response(Size.filter, size);
		if(!sizes) { return false; }

		const pagination = { pageSize: 10, page: 0 };
		(function(){ lib.carousel.execute("size-filter-box", Size.view.filter, sizes, pagination); }());
	});
}

Size.controller.edit = async (size_id) => {
	let size = await API.response(Size.filter, { id: size_id });
	if(!size) { return false; }

	document.getElementById("size-create-form").elements.namedItem("id").value = size[0].id;
	document.getElementById("size-create-form").elements.namedItem("name").value = size[0].name;
};

Size.controller.delete = async (size_id) => {
	let r = confirm('Deseja realmente excluir a cor?');
	if(r){
		if(!await API.response(Size.delete, size_id)){ return false; };
		Size.controller.filter.submit.click();
	}
};