const Size = {};

Size.save = async (size) => {
	let response = await fetch("/product/size/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(size)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Size.filter = async size => {
	let response = await fetch("/product/size/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(size)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sizes;
};

Size.delete = async (size_id) => {
	let response = await fetch("/product/size/delete/"+size_id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};