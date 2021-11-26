const User = {};

User.signup = async (user) => {
	let response = await fetch("/user/signup", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(user)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.user[0];
};