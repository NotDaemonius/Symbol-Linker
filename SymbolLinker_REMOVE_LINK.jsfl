// By @Daemonius_ on twitter --!

var dom = fl.getDocumentDOM();

findAndDecodeSaveData = function () {
	var lib_item = null
	for (var lib_item in dom.library.items) {
		if (dom.library.items[lib_item].name.split("|")[0] == "SYMBOL LINKER DATA: ") {
			lib_item = dom.library.items[lib_item];
			break
		}
	}

	if (lib_item == null) {
		alert("No link data exists in the document's libary!")
		return null
	}

	var lib_data = lib_item.name.split("|").slice(1);
	var links = []
	for (var i = 0; i < lib_data.length; i += 3) {
		links.push(lib_data.slice(i, i + 3));
	}

	return links
}

findAndEncodeSaveData = function (data) {
	var lib_item = null
	for (var lib_item in dom.library.items) {
		if (dom.library.items[lib_item].name.split("|")[0] == "SYMBOL LINKER DATA: ") {
			lib_item = dom.library.items[lib_item];
			break
		}
	}

	if (lib_item == null) {
		alert("No link data exists in the document's libary!")
	}

	var idk_temp_man_im_coding_at_fucking_10pm_im_too_tired_for_this_shit = []
	for (var dat in data) {
		for (var dat2 in data[dat]) {
			idk_temp_man_im_coding_at_fucking_10pm_im_too_tired_for_this_shit.push(data[dat][dat2])
		}
	}

	lib_item.name = "SYMBOL LINKER DATA: |" + idk_temp_man_im_coding_at_fucking_10pm_im_too_tired_for_this_shit.join("|")
}

main = function () {
	var links = findAndDecodeSaveData()

	if (links == null) {
		return
	}

	links_xml = []
	links_text = []
	for (var link in links) {
		links_xml.push('<menuitem label="' + links[link][0] + " -> " + links[link][1] + " | " + links[link][2] + '"/>')
		links_text.push(links[link][0] + " -> " + links[link][1] + " | " + links[link][2])
	}

	var linker_xml =
		'<?xml version="1.0"?>' +
		'<dialog id="symbol-linker-dialog" title="Symbol Linker - REMOVE LINK" buttons="accept,cancel">' +
		'<hbox>' +
		'<label value="Parent Layer Name: " align="left"/>' +
		'<menulist id="links">' +
		links_xml.join() +
		'</menulist>' +
		'</hbox>' +
		'</dialog>'

	var pannel = fl.xmlPanelFromString(linker_xml)
	if (pannel.dismiss != "accept") {
		return
	}

	var infex = links_text.indexOf(pannel['links'])
	if (infex == null) {
		return
	}

	var idc_if_this_code_is_shit_im_tired = []
	for (var i in links_text) {
		if (i != infex) {
			idc_if_this_code_is_shit_im_tired.push(links[i])
		}
	}
	findAndEncodeSaveData(idc_if_this_code_is_shit_im_tired)

	alert("Sucsessfully removed link!")
}

main()