Color.controller = {};

Color.controller.create = document.getElementById("color-create-form");
if(Color.controller.create){
	Color.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		console.log(event.target.elements);
	})
}