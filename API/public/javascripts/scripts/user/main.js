const User = {};
User.controller = {};

User.controller.signup = document.getElementById("signup-form");
if(User.controller.signup){
	User.controller.signup.addEventListener("submit", async event => {
		event.preventDefault();

		let user = {
			name: event.target.elements.namedItem("name").value,
			business: event.target.elements.namedItem("business").value,
			email: event.target.elements.namedItem("email").value,
			password: event.target.elements.namedItem("password").value
		};

		console.log(user);
	});
}