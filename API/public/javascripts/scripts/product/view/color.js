Color.view = {};

Color.view.filter = (colors, pagination) => {
	let filter_box = document.getElementById("color-filter-box");
	let filter_div = document.getElementById("color-filter-div");
	filter_div.innerHTML = "";

	if(colors.length){
		let div_header = lib.element.create("div", { class: "box b1 container border em07 center" });
		
		div_header.appendChild(lib.element.create("div", { class: "mobile-box b4-5 padding-5" }, "Nome"));
		filter_div.appendChild(div_header);
		for (let i = pagination.page * pagination.pageSize; i < colors.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let div_color = lib.element.create("div", { class: "box b1 container box-hover padding-5 margin-top-5 border" });
			// div_color.appendChild(lib.element.create("div", { 
			// 	class: "mobile-box b5 em11 tbl-show-link nowrap center bold", 
			// 	onclick: "Color.controller.show("+colors[i].id+")"
			// }, colors[i].id));
			div_color.appendChild(lib.element.create("div", { class: "mobile-box b4-5 center" }, colors[i].name));
			div_color.appendChild(lib.element.icon('b10', 20, "/images/icon/edit.png", "Color.controller.edit("+colors[i].id+")"));
			div_color.appendChild(lib.element.icon('b10', 20, "/images/icon/trash.png", "Color.controller.delete("+colors[i].id+")"));
			filter_div.appendChild(div_color);
		};
		filter_box.style.display = "";
	} else {
		filter_div.innerHTML = "Sem resultados";
		filter_box.style.display = "";
	};
};