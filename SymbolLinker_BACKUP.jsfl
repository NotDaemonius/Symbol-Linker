var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();

var links = [];
var stop = false;

var eventID = null;

getLayerByName = function (name) {
	for (var layer in timeline.layers) {
		if (timeline.layers[layer].name == name) {
			return timeline.layers[layer]
		}
	}
}

mouseMoved = function () {
	if (stop) {
		fl.removeEventListener("mouseMove", eventID);
		return
	}
	
	if (links == []) {
		return;
	}
	
	for (var link in links) {
		var ele_1 = links[link][0].frames[timeline.currentFrame].elements[0];
		var ele_2 = links[link][1].frames[timeline.currentFrame].elements[0];

		if (ele_1.firstFrame != ele_2.firstFrame) {
			if (links[link][1].frames[timeline.currentFrame].startFrame == timeline.currentFrame) {
				ele_2.firstFrame = ele_1.firstFrame;
			} else {
				timeline.currentLayer = timeline.layers.indexOf(links[link][1]);
				timeline.convertToKeyframes(timeline.currentFrame);
				links[link][1].frames[timeline.currentFrame].elements[0].firstFrame = ele_1.firstFrame;
				timeline.currentLayer = timeline.layers.indexOf(links[link][0]);
			}
			stop = true;
		}
	}
}

main = function () {
	/*
	var URI = fl.configURI + "commands/mydata.txt";
	var file_raw_text = FLfile.read(URI);
	
	for (var i in file_raw_text.split("\n")) {
		var gah = []
		for (var layer_num in file_raw_text.split("\r\n")[i].split("|")) {
			for (var gradgsd in timeline.layers) {
				if (timeline.layers[gradgsd].name == file_raw_text.split("\r\n")[i].split("|")[layer_num]) {
					gah.push(timeline.layers[gradgsd])
				}
			}
		}
		links.push(gah)
	}
	*/
	
	
	var lib_data_raw = null;
	for (var lib_item in dom.library.items) {
		if (dom.library.items[lib_item].name.split("|")[0] == "SYMBOL LINKER DATA: ") {
			lib_data_raw = dom.library.items[lib_item];
			break;
		}
	}
	
	if (lib_data_raw != null) {
		var lib_data_split = lib_data_raw.name.split("|")
		/*
		var lib_data = lib_data_split.slice(1, lib_data_split.length)
		for (var i = 0; i < lib_data.length; i += 2) {
			links.push([getLayerByName(lib_data[i]), getLayerByName(lib_data[i + 1])])
		}
		*/
	} else {
		// create new data symbol;
		fl.trace("ahh shucks!")
	}
	

	return
	//eventID = fl.addEventListener("mouseMove", mouseMoved);
}

main();