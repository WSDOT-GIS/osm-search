require(["esri/map", "esri/geometry/webMercatorUtils"], function (Map, webMercatorUtils) {
	var map;

	map = new Map("map", {
		basemap: "osm"
	});

	function updateViewbox(evt) {
		var extent = evt.extent;
		if (extent) {
			// Convert the extent to geographic.
			extent = webMercatorUtils.webMercatorToGeographic(extent);
			document.querySelector("[name=viewbox]").value = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].join(",");
		}
	}

	map.on("extent-change", updateViewbox);
});