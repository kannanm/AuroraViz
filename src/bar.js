/**@authors : Aditya Gaur, koushikr*/

/**
 * The basefunction for the bar initialization. Initializes the barGraph. Sets
 * the data
 *
 * @params {Object} [graphDef] graphDef object supplied by the User for which
 *         the graph needs to be plotted. It contains graph properties and the
 *         data
 * @params {Object} [parentDimension] parentDimension object that will indicate
 *         the dimensions of AR.Graph
 * @params {Object} [panel] A panel object indicating the Graph Panel in which
 *         the current Bar graph will be displayed This is a base class and is
 *         called by different bar implementations (Eg : Vertical, Horizontal,
 *         Multivalued etc) Adds Bar graph container to the panel, assigns data,
 *         sets anchor and tooltip with the given data
 */

//Note when color variableis defined it means the graph is multiseries. and the color of the series is "color"
AR.Bar = function(graphDef, data, parentDimension, panel, color, seriesname, seriesNumber) {
    var self = this;
    this._bar = panel.add(pv.Bar);
    this._bar.data(data);
    this._parentDimension = parentDimension;
    this._noOfRecords = data.length;
    this._bar.title(function() {
        return AR.Utility.getToolTipText(data, this.index);
    });
    if (graphDef.toolTip) {
        this._bar.event("mouseover", pv.Behavior.tipsy({
            gravity: function() {
                return (self instanceof AR.HBar ? "w" : "s");
            },
            fade: true
        }));
    }
    if (graphDef.showValues) {
        this._bar.anchor(self instanceof AR.HBar ? "right" : "top").add(pv.Label)
        		 .text(function(d) {
        			 		var m = graphDef.measureAxis[seriesNumber];
        			 		return d[m];
        		 		})
        		 .textBaseline(self instanceof AR.HBar ? "left" : "bottom")
        		 .font(AR.Utility.getSize(graphDef,"gridLabels",AR.constants.values.smallLabels.size) + "px Arial");
    }
    if (graphDef.presetPalette) {
        AR.Utility.setPalette(self._bar, AR.Utility.getPaletteColors(graphDef));
    }
    if (color) {
        self._bar.fillStyle(color);
    }
    if (graphDef.showLegends) {
        if (!seriesNumber) {
            AR.Utility.addLegendToObject(self._bar, data, graphDef);
        }
//        AR.Utility.createLegends(panel, seriesNumber, seriesname, color, graphDef);
    }
};
// TODO - Some kind of a factory that sets the following properties has to be
// made.
AR.Bar.prototype.properties = ["fillStyle", "strokeStyle"];

/**
 * Constructing Horizontal Bars For a Graph
 *
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @param {object}
 *            [panel] A protovis panel object in which the bar graph will be
 *            displayed
 * @extends AR.Bar
 */
AR.HBar = function(graphDef, data, parentDimension, panel, maxValue, color, seriesname, seriesNumber, showCategory) {
    var self = this;
    self._label = undefined;
    AR.Bar.apply(self, [graphDef, data, parentDimension, panel, color, seriesname, seriesNumber]);
    var adjustWidth = function(parentDimension) {
        var barWidth = pv.Scale.linear(0, maxValue).range(0, parentDimension.width - 40);
        self._bar.width(function(d) {
            return barWidth(d);
        });
    };
    var adjustHeight = function(parentDimension) {
        if (graphDef.dataset) {
            self._bar.height((parentDimension.height - 30) / (4 * self._noOfRecords));
        } else {
            self._bar.height((parentDimension.height - 30) / (2 * self._noOfRecords));
        }
    };
    var adjustBottom = function(parentDimension) {
        self._bar.bottom(function() {
            return (this.index * (parentDimension.height - 30) / (self._noOfRecords)) + 30;
        });
    };
    var adjustLeft = function(parentDimension) {
        self._bar.left(0);
    };
    self.adjustLabel = function(parentDimension) {
        if (graphDef.showLabels) {
            self._label = self._bar.anchor("left").add(pv.Label).textBaseline("right").text(function() {
                return seriesname ? showCategory ? graphDef.categories[0].category[this.index].label:" " : data[this.index].label;
            }).textAlign("right");
            AR.Utility.setLabelProperties(graphDef, self._label, true);
        }
    };
    // TODO define a layout designer which does the following
    self.adjustPosition = function(parentDimension) {
        adjustHeight(parentDimension);
        adjustWidth(parentDimension);
        adjustLeft(parentDimension);
        adjustBottom(parentDimension);
    };
    self.getHeight = function() {
        return (parentDimension.height - 30) / (4 * self._noOfRecords);
    };
    self.adjustPosition(self._parentDimension);
    self.adjustLabel(self._parentDimension);
};
AR.HBar.prototype = AR.extend(AR.Bar);

/**
 * Constructing Vertical Bars For a Graph
 *
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @param {object}
 *            [panel] A protovis panel object in which the bar graph will be
 *            displayed
 * @extends AR.Bar
 */
AR.VBar = function(isMultiSeries, graphDef, data, parentDimension, panel, maxValue, color, seriesname, seriesNumber, showCategory) {
    var self = this;
    AR.Bar.apply(self, [graphDef, data, parentDimension, panel, color, seriesname, seriesNumber]);
    
    var adjustHeight = function(parentDimension) {
        var barHeight = pv.Scale.linear(0, maxValue).range(0, parentDimension.height - 40);
        self._bar.height(function(d) {
        	var measureAxis = graphDef.measureAxis[seriesNumber]
            var ret = barHeight(d[measureAxis]);
            return ret;
        });
    };
    var adjustWidth = function(parentDimension) {
        if (isMultiSeries) {
            self._bar.width((parentDimension.width - 30) / (4 * self._noOfRecords));
        } else {
            self._bar.width((parentDimension.width - 30) / (2 * self._noOfRecords));
        }
    };
    var adjustLeft = function(parentDimension) {
        self._bar.left(function() {
            return (this.index * (parentDimension.width - 30) / (self._noOfRecords)) + 30;
        });
    };
    var adjustBottom = function(parentDimension) {
        self._bar.bottom(0);
    };
    self.adjustLabel = function(parentDimension) {
        if (graphDef.showLabels) {
            self._label = self._bar.anchor("bottom").add(pv.Label).textBaseline("top").text(function(d) {
                return showCategory ? d[seriesname]: "";
            }).textAlign("center");
            AR.Utility.setLabelProperties(graphDef, self._label, false);
        }
    };
    // TODO define a layout designer which does the following
    self.adjustPosition = function(parentDimension) {
        adjustHeight(parentDimension);
        adjustWidth(parentDimension);
        adjustLeft(parentDimension);
        adjustBottom(parentDimension);
    };
    self.adjustPosition(self._parentDimension);
    self.adjustLabel(self._parentDimension);
    self.getWidth = function() {
        return (parentDimension.width - 30) / (4 * self._noOfRecords);
    };
};
AR.VBar.prototype = AR.extend(AR.Bar);

/**
 * BarGraph API. An API to create a Bar Graph
 *
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 *            in JSON Format The corresponding BarGraph is rendered
 * @extends AR.Bar
 */
AR.BarGraph = function(graphDef) {
    var bar, i, panel;
    var self = this;
    self.initialize(graphDef);
    var colors = AR.Utility.getPaletteColors(graphDef);
    var GraphTypeMap = {
    		v:{
    			getBarWidth:"getWidth",
    			constructor : "VBar",
    			barPos : "left"
    		},
    		h:{
    			getBarWidth:"getHeight",
    			constructor : "HBar",
    			barPos : "bottom"
    		}
    };
    var checkIfMultiSeries = function(){
    	var noOfMeasureAxis = graphDef.measureAxis.length;
    	if(noOfMeasureAxis > 1){
    		return true;
    	}
    	return false;
    };
    var isMultiSeries = checkIfMultiSeries();
    
    var createMultiSeriesBar = function(type){
    	var measureAxis = graphDef.measureAxis;
    	var noOfSeries = measureAxis.length;
    	var categoryAxis = graphDef.categoryAxis;
    	var showCategory = false;
    	var barWidthFuncName = GraphTypeMap[type].getBarWidth;
    	var constructorFuncName = GraphTypeMap[type].constructor;
    	var barPos = GraphTypeMap[type].barPos;
    	for (i = 0; i < noOfSeries; i++) {
    		showCategory = false;
    		if(i === Math.floor((noOfSeries-1)/2)){
        		showCategory = true;
        	}
			panel = self._panel.add(pv.Panel)[barPos](i * (i !== 0 ? bar[barWidthFuncName]() : 0));
			bar = new AR[constructorFuncName](isMultiSeries, graphDef, graphDef.data, self._dimension, panel, self._maxValue, colors[i % colors.length], categoryAxis[i], i, showCategory);
    	}
    };
    var createBars = {
        "v": function() {
            if (isMultiSeries) {
            	createMultiSeriesBar("v");
            } else {
            	var seriesName = graphDef.categoryAxis[0];
                bar = new AR.VBar(isMultiSeries, graphDef, graphDef.data, self._dimension, self._panel, self._maxValue, undefined, seriesName, 0, true);
            }
        },

        "h": function() {
            if (isMultiSeries) {
            	createMultiSeriesBar("h");
            } else {
            	var seriesName = graphDef.categoryAxis[0];
                bar = new AR.HBar(isMultiSeries, graphDef, graphDef.data, self._dimension, self._panel, self._maxValue, undefined, seriesName, 0, true );
            }
        }

    };
    createBars[graphDef.type || "v"]();

  this.setWidth = function(width) {
        AR.Graph.prototype.setWidth.call(self, width);
        bar.adjustPosition(self._dimension);
        setRules();
    };
    this.setHeight = function(height) {
        AR.Graph.prototype.setHeight.call(self, height);
        bar.adjustPosition(self._dimension);
        setRules();
    };
    this.setPalette = function(paletteCode) {
        bar.setPalette(paletteCode);
    };
};
AR.Graph.labelProperties = ["labelFontSize", "labelFontColor", "labelRotateAngle"];
AR.BarGraph.prototype = new AR.Graph();