AR.Canvas = function(graphDef, data, div) {
    this.data = data;
    this.graphDef = graphDef;
    this.div = div;
};
AR.Canvas.prototype = pv.extend(GOverlay);

AR.Canvas.prototype.initialize = function(map) {
    this.map = map;
    this.canvas = document.createElement("div");
    this.canvas.setAttribute("class", "canvas");
    map.getPane(G_MAP_MAP_PANE).parentNode.appendChild(this.canvas);
};
AR.Canvas.prototype.setMarkerSize = function(size) {
    this._dot.shapeRadius(function(x, d) {
        var s = AR.constants.scale.mapDot * size * (d.size || 1);
        return s;
    });
};

AR.Canvas.prototype.setMarkerShape = function(shape) {
    var self = this;
    self._dot.shape(shape || "circle");
};

AR.Canvas.prototype.getCategoryColorMap = function() {
    var colors = AR.Utility.getPaletteColors(this.graphDef);
    var cLength = colors.length;
    var categoryColorMap = {};
    var i = 0,
        j = 0;
    for (i = 0; i < this.data.length; i++) {
        var c = this.data[i].category;
        if (!categoryColorMap[c]) {
            categoryColorMap[c] = colors[j % cLength];
            j++;
        }
    }
    return categoryColorMap;
};
AR.Canvas.prototype.setMarkerColors = function(colorMap) {
    this._dot.strokeStyle(function(x, d) {
        return colorMap[d.category];
    });
    this._dot.fillStyle(function(x, d) {
        return this.strokeStyle().alpha(0.2);
    });
};
AR.Canvas.prototype.redraw = function(force) {
    var self = this;
    if (!force) {
        return;
    }
    var c = this.canvas,
        m = this.map,
        r = 500;

    /* Get the pixel locations of the crimes. */
    var pixels = this.data.map(function(d) {
        return m.fromLatLngToDivPixel(new GLatLng(d.lat, d.lon));
    }); /* Update the canvas bounds. Note: may be large. */

    function getX(p) {
        return p.x;
    }

    function getY(p) {
        return p.y;
    }

    var x = {
        min: pv.min(pixels, getX) - r,
        max: pv.max(pixels, getX) + r
    };
    var y = {
        min: pv.min(pixels, getY) - r,
        max: pv.max(pixels, getY) + r
    };

    c.style.width = (x.max - x.min) + "px";
    c.style.height = (y.max - y.min) + "px";
    c.style.left = x.min + "px";
    c.style.top = y.min + "px";

    /* Render the visualization. */
    this._panel = new pv.Panel().canvas(c).left(-x.min).top(-y.min).add(pv.Panel).data(self.data);

    // Create the marker
    this._dot = this._panel.add(pv.Dot).left(function() {
        return pixels[this.parent.index].x;
    }).top(function() {
        return pixels[this.parent.index].y;
    });

    //set the title attribute
    self._dot.title(function(x, d) {
        return (d.lat + ", " + d.lon + ", " + d.category + ", ");
    });

    this.setMarkerShape(this.graphDef.mapMarkerShape);
    this.setMarkerSize(this.graphDef.mapMarkerSize);
    this.setMarkerColors(this.getCategoryColorMap());
    AR.Utility.setToolTip(this.graphDef, self._dot, "s");
    if (this.graphDef.showLabels) {
        var labels = this._dot.anchor("center").add(pv.Label).textStyle("white").text(function(x, d) {
            return d.category;
        });
        AR.Utility.setLabelProperties(this.graphDef, labels, false);
    }
    this.render(this.div);
};
AR.Canvas.prototype.render = function(div) {
    var mapDiv = document.createElement('div');
    document.getElementById(div).appendChild(mapDiv);
    this._panel.canvas(mapDiv);
    this._panel.root.render();
};


AR.Map = function(graphDef) {
    var self = this;
    self.render = function(div) {
        if (GBrowserIsCompatible()) {
            G_NORMAL_MAP.getMinimumResolution = function() {
                return 2;
            };
            G_NORMAL_MAP.getMaximumResolution = function() {
                return 14;
            };
            var map = new GMap2(document.getElementById(div));
            map.setCenter(new GLatLng(41, 22), 2);
            map.setUI(map.getDefaultUI());
            var can = new AR.Canvas(graphDef, graphDef.data, div);
            map.addOverlay(can);
        }
        //        can.render(div);
    };
};