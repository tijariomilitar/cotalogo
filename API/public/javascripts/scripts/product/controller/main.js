Product.controller = {};

Product.controller.create = document.getElementById("product-create-form");
if(Product.controller.create){
	Product.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let product = {};

		for(let i in event.target.elements) {
			if(event.target.elements[event.target.elements[i].name]){
				product[event.target.elements[i].name] = event.target.elements[event.target.elements[i].name].value;
			}
		}

		delete product.item;
		delete product.namedItem;
		delete product.submit;

		console.log(product);

		let response = await API.response(Product.save, product);
		if(!response) { return false; }

		console.log(response);
	})
}