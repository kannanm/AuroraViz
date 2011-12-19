/**@authors : Aditya Gaur, koushikr*/

/**
 * The basefunction for the Line initialization.
 * Initializes the LineGraph. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Line graph will be displayed
 * This is a base class and is called by different Line implementations.
 */
AR.Line = function(parentDimension, panel, graphDef, step) {
    var self = this;
    var noOfRecords = graphDef.data.length;
    var line = panel.add(pv.Line);
    line.data(AR.Utility.getDataArray(graphDef.data));
    var dots = line.add(pv.Dot).lineWidth(1);
    dots.title(function() {
        return AR.Utility.getToolTipText(graphDef.data, this.index);
    });
    var properties = ["dotSize", "lineWidth", "lineColor"];
    self.setDotSize = function(size) {
        dots.shapeRadius(size);
    };
    self.setLineWidth = function(width) {
        line.lineWidth(width);
    };
    self.setLineColor = function(color) {
        line.strokeStyle(color);
    };
    var setProperties = function() {
        properties.forEach(function(property) {
            var upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
            if (graphDef[property]) {
                self["set" + upcasedProp](graphDef[property]);
            }
        });
    };
    self.adjustLabel = function(parentDimension) {
        self._label = dots.add(pv.Label).bottom(0).text(function() {
            return graphDef.data[this.index].label;
        }).textAngle(-Math.PI / 4).textAlign("right").textBaseline("top");
    };
    self.adjustValuePositions = function(parentDimension) {
        dots.anchor("bottom").add(pv.Label).text(function() {
            return graphDef.data[this.index].value;
        });
    };
    self.adjustBottom = function(parentDimension) {
        var pointHeight = pv.Scale.linear(0, AR.Utility.findMax(graphDef.data)).range(0, parentDimension.height - 40);
        line.bottom(function(d) {
            return pointHeight(d);
        });
    };
    self.adjustLeft = function(parentDimension) {
        line.left(function() {
            return (this.index * (parentDimension.width - 30) / (noOfRecords)) + 30;
        });
    };
    self.adjustPositions = function(parentDimension) {
        self.adjustBottom(parentDimension);
        self.adjustLeft(parentDimension);
    };
    if (graphDef.showValues) {
        self.adjustValuePositions(parentDimension);
    }
    AR.Utility.setToolTip(graphDef, dots, "s");
    if (graphDef.presetPalette) {
        AR.Utility.setPalette(dots, AR.Utility.getPaletteColors(graphDef));
    }
    if (graphDef.showLabels) {
        self.adjustLabel(parentDimension);
        AR.Utility.setLabelProperties(graphDef, self._label, false);
    }
    self.adjustPositions(parentDimension);
    setProperties();
    if (step === true) {
        line.interpolate("step-after");
    }
    if(graphDef.showLegends){
    	AR.Utility.addLegendToObject(dots,graphDef.data);
    }
};

/**
 * The basefunction for the Multi LineGraph initialization.
 * Initializes the LineGraph. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Line graph will be displayed
 * @params {Object}
 *             [data] The data for line chart plotting
 * @params {value}
 *             [maxValue] The value for setting the scale
 * This is a base class and is called by different Line implementations.
 */
AR.MLine = function(parentDimension, panel, graphDef, data, maxValue, step, color, seriesname, seriesNumber) {
    var self = this;
    var noOfRecords = data.length;
    var line = panel.add(pv.Line);
    line.data(AR.Utility.getDataArray(data));
    var dots = line.add(pv.Dot).lineWidth(4).fillStyle(color);
    dots.title(function() {
        return AR.Utility.getToolTipText(data, this.index);
    });
    var properties = ["dotSize", "lineWidth", "lineColor"];
    self.setDotSize = function(size) {
        dots.shapeRadius(size);
    };
    self.setLineWidth = function(width) {
        line.lineWidth(width);
    };
    self.setLineColor = function(color) {
        line.strokeStyle(color);
    };
    var setProperties = function() {
        properties.forEach(function(property) {
            var upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
            if (graphDef[property]) {
                self["set" + upcasedProp](graphDef[property]);
            }
        });
    };
    self.showLabels = function(parentDimension) {
        self._label = dots.add(pv.Label).bottom(0).text(function() {
            return graphDef.categories[0].category[this.index].label;
        }).textBaseline("top");
    };
    self.adjustValuePositions = function(parentDimension) {
        dots.anchor("bottom").add(pv.Label).text(function() {
            return data[this.index].value;
        });
    };
    self.adjustBottom = function(parentDimension) {
        var pointHeight = pv.Scale.linear(0, maxValue).range(0, parentDimension.height - 40);
        line.bottom(function(d) {
            return pointHeight(d);
        });
    };
    self.adjustLeft = function(parentDimension) {
        line.left(function() {
            return (this.index * (parentDimension.width - 30) / (noOfRecords)) + 30;
        });
    };

    self.adjustPositions = function(parentDimension) {
        self.adjustBottom(parentDimension);
        self.adjustLeft(parentDimension);
    };
    AR.Utility.setToolTip(graphDef, dots, "s");
    if (graphDef.showValues) {
        self.adjustValuePositions(parentDimension);
    }
    if (graphDef.showLabels) {
        self.showLabels(parentDimension);
        AR.Utility.setLabelProperties(graphDef, self._label, false);
    }
    self.adjustPositions(parentDimension);
    setProperties();
    if (step === true) {
        line.interpolate("step-after");
    }
    if (color) {
        line.strokeStyle(color);
    }
    if(graphDef.showLegends){
    	AR.Utility.createLegends(panel,seriesNumber,seriesname,color);
    }
};

/**
 * API to construct a Line Graph
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.LineGraph = function(graphDef) {
    var line;
    var self = this;
    var flag, palette;
    var maxValue = AR.Utility.findMaxValue(graphDef);
    self.setVerGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setVerGridShow.apply(self, [maxValue, AR.Utility.scale.linear]);
        }
    };
    self.setHorGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setHorGridShow.apply(self, [maxValue, AR.Utility.scale.linear]);
        }
    };
    AR.Graph.apply(self, [graphDef]);
    if (graphDef.isLineStyleStep === true) {
        flag = true;
    }
    if (graphDef.presetPalette) {
        colors = AR.Utility.getPaletteColors(graphDef);
    }
    if (graphDef.dataset) {

        var dataset = graphDef.dataset;
        for (i = 0; i < graphDef.dataset.length; i++) {
            var noOfRecords = dataset.length * dataset[i].data.length;
            panel = self._panel.add(pv.Panel).left((self._dimension.width - 30) / (noOfRecords));
            line = new AR.MLine(self._dimension, panel, graphDef, dataset[i].data, maxValue, flag, colors[i % colors.length],dataset[i].seriesname,i);
        }
    } else {
        line = new AR.Line(self._dimension, self._panel, graphDef, flag);
    }

    self.setWidth = function(width) {
        AR.Graph.prototype.setWidth.call(self, width);
        line.adjustPositions(self._dimension);
    };
    self.setHeight = function(height) {
        AR.Graph.prototype.setHeight.call(self, height);
        line.adjustPositions(self._dimension);
        self.setHorRules(AR.Utility.findMax(graphDef.data), AR.Utility.scale.linear);
    };
};
AR.LineGraph.prototype = AR.extend(AR.Graph);