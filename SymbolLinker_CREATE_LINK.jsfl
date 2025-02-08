// By @Daemonius_ on twitter --!

var dom = fl.getDocumentDOM()

var linker_xml =
	'<?xml version="1.0"?>' +
	'<dialog id="symbol-linker-dialog" title="Symbol Linker - CREATE LINK" buttons="accept,cancel">' +
	'<vbox>' +
	'<hbox>' +
	'<label value="Parent Layer Name: " align="left"/>' +
	'<textbox id="PLN" size="20"/>' +
	'</hbox>' +
	'<hbox>' +
	'<label value="Child Layer Name: " align="left"/>' +
	'<textbox id="LLN" size="20"/>' +
	'</hbox>' +
	'<label value="Make sure you\'re inside the symbol/scene you want to create the link in!!"/>' +
	'</vbox>' +
	'</dialog>'

layerExists = function (name, tl) {
	for (var layer in tl.layers) {
		if (tl.layers[layer].name == name) {
			return true
		}
	}
	return false
}

findSaveData = function () {
	for (var lib_item in dom.library.items) {
		if (dom.library.items[lib_item].name.split("|")[0] == "SYMBOL LINKER DATA: ") {
			return dom.library.items[lib_item];
		}
	}
	return null;
}

inputErrorChecker = function (input, nana) {
	if (input == "") {
		alert('Field "' + nana + '" is empty!')
		return true;
	}

	if (!layerExists(input, dom.getTimeline())) {
		alert('Layer "' + input + '" doesn\'t exist!')
		return true;
	}

	return false;
}

main = function () {
	var pannel = fl.xmlPanelFromString(linker_xml)

	if (pannel.dismiss != "accept") {
		return
	}

	if (inputErrorChecker(pannel['PLN'], "Parent Layer Name") || inputErrorChecker(pannel['LLN'], "Linked Layer Name")) {
		return
	}

	var save_data = findSaveData();
	var data_to_save = "|" + [pannel['PLN'], pannel['LLN'], dom.getTimeline().name].join("|")

	if (save_data != null) {
		save_data.name += data_to_save
	} else {
		dom.library.addNewItem("graphic", "SYMBOL LINKER DATA: " + data_to_save)
	}

	alert("Successfully created link!")
}

main()