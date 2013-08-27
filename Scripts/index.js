require(["esri/map", "esri/geometry/webMercatorUtils"], function (Map, webMercatorUtils) {
	"use strict";

	var map;

	function updateViewbox(evt) {
		var extent = evt.extent;
		if (extent) {
			// Convert the extent to geographic.
			extent = webMercatorUtils.webMercatorToGeographic(extent);
			document.querySelector("[name=viewbox]").value = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].join(",");
		}
	}

	function createMap(position) {
		map = new Map("map", {
			basemap: "osm",
			center: position ? [position.coords.longitude, position.coords.latitude] : null,
			scale: position ? 7 : null
		});

		map.on("extent-change", updateViewbox);
	}

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function (position) {
			createMap(position);
		});
	} else {
		createMap();
	}



	document.forms.osmform.onsubmit = function () {
		console.debug(arguments);
	}
});