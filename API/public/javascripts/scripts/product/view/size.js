Size.view = {};

Size.view.filter = (sizes, pagination) => {
	let filter_box = document.getElementById("size-filter-box");
	let filter_div = document.getElementById("size-filter-div");
	filter_div.innerHTML = "";

	if(sizes.length){
		let div_header = lib.element.create("div", { class: "box b1 container border em07 center" });
		
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b4-5 padding-5" }, "Nome"));
		filter_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < sizes.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let div_size = lib.element.create("div", { class: "box b1 container box-hover padding-5 margin-top-5 border" });
			// div_size.appendChild(lib.element.create("div", { 
			// 	class: "mobile-box b5 em11 tbl-show-link nowrap center bold", 
			// 	onclick: "size.controller.show("+sizes[i].id+")"
			// }, sizes[i].id));
			div_size.appendChild(lib.element.create("div", { class: "mobile-box b4-5 center" }, sizes[i].name));
			div_size.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Size.controller.edit("+sizes[i].id+")"));
			div_size.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", "Size.controller.delete("+sizes[i].id+")"));
			filter_div.appendChild(div_size);
		};
		filter_box.style.display = "";
	} else {
		let div_size = lib.element.create("div", { class: "box b1 center box-hover padding-5 border" }, "Sem resultados");
		filter_div.appendChild(div_size);
		filter_box.style.display = "";
	};
};