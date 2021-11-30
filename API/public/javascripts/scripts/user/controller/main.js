User.controller = {};

User.controller.signup = document.getElementById("signup-form");
if(User.controller.signup){
	User.controller.signup.addEventListener("submit", async event => {
		event.preventDefault();

		let user = {
			name: event.target.elements.namedItem("name").value,
			business: event.target.elements.namedItem("business").value,
			email: event.target.elements.namedItem("email").value,
			password: event.target.elements.namedItem("password").value,
			passwordConfirm: event.target.elements.namedItem("password-confirm").value
		};

		let response = await API.response(User.signup, user);
		if(!response) { return false; }

		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("business").value = "";
		event.target.elements.namedItem("email").value = "";
		event.target.elements.namedItem("password").value = "";
		event.target.elements.namedItem("password-confirm").value = "";
	});
}