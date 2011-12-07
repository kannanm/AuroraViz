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
AR.Bar = function(graphDef, data, parentDimension, panel, color) {
	var self = this;
	this._bar = panel.add(pv.Bar);
	this._parentDimension = parentDimension;
	this._noOfRecords = data.length;
	this._bar.data(AR.Utility.getDataArray(data));
	this._bar.title(function() {
		return AR.Utility.getToolTipText(data, this.index);
	});
	if (graphDef.toolTip) {
		this._bar.event("mouseover", pv.Behavior.tipsy({
			gravity : function() {
				return (self instanceof AR.HBar ? "w" : "s");
			},
			fade : true
		}));
	}
	if (graphDef.showValues) {
		this._bar.anchor(self instanceof AR.HBar ? "right" : "top").add(pv.Label).text(function() {
			return data[this.index].value;
		}).textBaseline(self instanceof AR.HBar ? "left" : "bottom");
	}
	if (graphDef.presetPalette) {
		AR.Utility.setPalette(self._bar, AR.Utility.getPaletteColors(graphDef));
	}
	if (color) {
		self._bar.fillStyle(color);
	}
};
// TODO - Some kind of a factory that sets the following properties has to be
// made.
AR.Bar.prototype.properties = [ "fillStyle", "strokeStyle" ];

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
AR.HBar = function(graphDef, data, parentDimension, panel, maxValue, color, seriesname) {
	var self = this;
	self._label = undefined;
	AR.Bar.apply(self, [ graphDef, data, parentDimension, panel, color ]);
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
				return seriesname ? seriesname : data[this.index].label;
			}).textAlign("right"); 
			 AR.Utility.setLabelProperties(graphDef,self._label,true);
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
AR.VBar = function(graphDef, data, parentDimension, panel, maxValue, color, seriesname) {
	var self = this;
	AR.Bar.apply(self, [ graphDef, data, parentDimension, panel, color ]);

	var adjustHeight = function(parentDimension) {
		var barHeight = pv.Scale.linear(0, maxValue).range(0, parentDimension.height - 40);
		self._bar.height(function(d) {
			var ret = barHeight(d);
			return ret;
		});
	};
	var adjustWidth = function(parentDimension) {
		if (graphDef.dataset) {
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
			self._label = self._bar.anchor("bottom").add(pv.Label).textBaseline("top").text(function() {
				return seriesname ? seriesname : data[this.index].label;
			}).textAlign("center");
			AR.Utility.setLabelProperties(graphDef,self._label,false);
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
	self.setVerGridShow = function(status) {
		var maxVal;
		if (status === true) {
			maxVal = AR.Utility.findMaxValue(graphDef);
			AR.Graph.prototype.setVerGridShow.apply(self, [ maxVal, AR.Utility.scale.linear ]);
		}
	};
	self.setHorGridShow = function(status) {
		var maxVal;
		if (status === true) {
			maxVal = AR.Utility.findMaxValue(graphDef);
			AR.Graph.prototype.setHorGridShow.apply(self, [ maxVal, AR.Utility.scale.linear ]);
		}
	};
	AR.Graph.apply(self, [ graphDef ]);
	var maxValue = AR.Utility.findMaxValue(graphDef);
	var dataset = graphDef.dataset;
	var colors = AR.Utility.getPaletteColors(graphDef);
	var createBars = {
		"v" : function() {
			if (dataset) {
				for (i = 0; i < graphDef.dataset.length; i++) {
					var noOfRecords = dataset.length * dataset[i].data.length;
					panel = self._panel.add(pv.Panel).left(i * (self._dimension.width - 30) / (noOfRecords));
					bar = new AR.VBar(graphDef, dataset[i].data, self._dimension, panel, maxValue, colors[i % colors.length], dataset[i].seriesname);
				}
			} else {
				bar = new AR.VBar(graphDef, graphDef.data, self._dimension, self._panel, maxValue);
			}
		},

		"h" : function() {
			if (dataset) {
				for (i = 0; i < graphDef.dataset.length; i++) {
					var noOfRecords = dataset.length * dataset[i].data.length;
					panel = self._panel.add(pv.Panel).bottom(i * (self._dimension.height - 30) / (noOfRecords));
					bar = new AR.HBar(graphDef, dataset[i].data, self._dimension, panel, maxValue, colors[i % colors.length], dataset[i].seriesname);
				}
			} else {
				bar = new AR.HBar(graphDef, graphDef.data, self._dimension, self._panel, maxValue);
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
AR.Graph.labelProperties = [ "labelFontSize", "labelFontColor", "labelRotateAngle" ];
AR.BarGraph.prototype = AR.extend(AR.Graph);