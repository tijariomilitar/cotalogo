const Color = {};

Color.save = async (color) => {
	let response = await fetch("/product/color/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(color)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Color.filter = async color => {
	let response = await fetch("/product/color/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(color)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.colors;
};

Color.delete = async (color_id) => {
	let response = await fetch("/product/color/delete/"+color_id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};