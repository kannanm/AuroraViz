/**@authors : Aditya Gaur, koushikr*/

/**
 * The basefunction for the Bubble initialization. Initializes the BubbleGraph.
 * Sets the data
 * 
 * @params {Object} [graphDef] graphDef object supplied by the User for which
 *         the graph needs to be plotted. It contains graph properties and the
 *         data
 * @params {Object} [parentDimension] parentDimension object that will indicate
 *         the dimensions of AR.Graph
 * @params {Object} [panel] A panel object indicating the Graph Panel in which
 *         the current Bubble graph will be displayed This is a base class and
 *         is called by different Bubble implementations
 */
AR.Bubble = function(parentDimension, panel, graphDef) {
	var self = this;
	var bubble = panel.add(pv.Dot);
	bubble.data(AR.Utility.getMultiDimensionData(graphDef.data));
	/**
	 * @private set the bottom property of the bubble object. The bottom
	 *          property depends on the "y" key in the data
	 */
	var adjustBottom = function(parentDimension) {
		var maxVal = AR.Utility.getSingleDimensionData(graphDef.data, AR.Utility.Dimension.y).max();
		var bubbleBottom = pv.Scale.linear(0, maxVal).range(0, parentDimension.height - 40);
		bubble.bottom(function(d) {
			return bubbleBottom(d[1]);
		});
	};

	/**
	 * @private set the left property of the bubble object. The left property
	 *          depends on the "x" key in the data
	 */
	var adjustLeft = function(parentDimension) {
		var maxVal = AR.Utility.getSingleDimensionData(graphDef.data, AR.Utility.Dimension.x).max();
		var bubbleLeft = pv.Scale.linear(0, maxVal).range(0, parentDimension.width - 30);
		bubble.left(function(d) {
			return (bubbleLeft(d[0]));
		});
	};

	/**
	 * @private set the size property of the bubble object. The size property
	 *          depends on the "z" key in the data
	 */
	var adjustSize = function(parentDimension) {
		var maxVal = AR.Utility.getSingleDimensionData(graphDef.data, AR.Utility.Dimension.z).max();
		var smallerDim = Math.min(parentDimension.width, parentDimension.height);
		var bubbleRadius = pv.Scale.linear(0, maxVal).range(0, smallerDim / 20);
		bubble.shapeRadius(function(d) {
			return (bubbleRadius(d[2]));
		});
	};
	bubble.title(function(d) {
		return AR.Utility.getToolTipText(graphDef.data, this.index) || (graphDef.data[this.index].label + ", " + d[0] + ", " + d[1] + ", " + d[2]);
	});
	/**
	 * @private Sets the tooltip if graphDef.toolTip is true
	 */
	var showToolTip = function() {
		if (graphDef.toolTip) {
			AR.Utility.setToolTip(graphDef, bubble, "s");
		}
	};

	/**
	 * @private Creates the label for bubble object if graphDef.showLabels is
	 *          true
	 */
	var showLabel = function() {
		if (graphDef.showLabels) {
			var labels = bubble.anchor("bottom").add(pv.Label).text(function(d) {
				return graphDef.data[this.index].label;
			});
			AR.Utility.setLabelProperties(graphDef, labels, false);

		}
	};

	/**
	 * @private 
	 * Shows the value for the bubble object if graphDef.showValues is
	 * true
	 */
	var showValues = function() {
		if (graphDef.showValues) {
			var values = bubble.anchor("top").add(pv.Label).text(function(d) {
				return (d[2]);
			});
			AR.Utility.setLabelProperties(graphDef, values, false);
		}
	};
	
	/**
	 * @private
	 * Sets the palette for the bubble object
	 */
	var setPalette = function() {
		if (graphDef.presetPalette) {
			AR.Utility.setPalette(bubble, AR.Utility.getPaletteColors(graphDef));
		}
	};
	
	/**
	 * @private
	 * Creates the legend for the Bubble
	 */
	var showLegends = function() {
		if (graphDef.showLegends) {
			var i = 0;
			var data = graphDef.data;
			var colors = AR.Utility.getPaletteColors(graphDef);
			for (i = 0; i < data.length; i++) {
				AR.Utility.createLegends(panel, i, data[i].label, colors[i % data.length], graphDef);
			}
		}
	};
	/**
	 * Adjusts the position of the bubbles according to the
	 * <tt>parentDimension</tt> which the dimension of the chart
	 * 
	 * @param parentDimension
	 *            {Object} The dimension of the chart
	 */
	self.adjustPosition = function(parentDimension) {
		adjustBottom(parentDimension);
		adjustLeft(parentDimension);
		adjustSize(parentDimension);
		showToolTip();
		showLabel();
		showValues();
		setPalette();
		showLegends();
	};
	self.adjustPosition(parentDimension);
};

/**
 * @class
 * API to construct a Bubble Graph
 * 
 * @param {object} An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.BubbleGraph = function(graphDef) {
	var self = this;
	/**
	 * If <tt>status</tt> is true show the vertical grid
	 * 
	 * @param status
	 *            {Boolean} true if vertical grid has to be visible. False
	 *            otherwise
	 */
	self.setVerGridShow = function(status) {
		if (status === true) {
			AR.Graph.prototype.setVerGridShow.apply(self, [ AR.Utility.getSingleDimensionData(graphDef.data, AR.Utility.Dimension.y).max(), AR.Utility.scale.linear ]);
		}
	};
	/**
	 * If <tt>status</tt> is true show the horizontal grid
	 * 
	 * @param status
	 *            {Boolean} true if horizontal grid has to be visible. False
	 *            otherwise
	 */
	self.setHorGridShow = function(status) {
		if (status === true) {
			AR.Graph.prototype.setHorGridShow.apply(self, [ AR.Utility.getSingleDimensionData(graphDef.data, AR.Utility.Dimension.x).max(), AR.Utility.scale.linear ]);
		}
	};
	self.initialize(graphDef);

	// The bubble object
	var bubbles = new AR.Bubble(self._dimension, self._panel, graphDef);

	/**
	 * Set the width of the graph
	 * 
	 * @param width
	 *            The width of the graph
	 */
	self.setWidth = function(width) {
		AR.Graph.prototype.setWidth.call(self, width);
		bubbles.adjustPosition(self._dimension);
	};
	/**
	 * Set the height of the graph
	 * 
	 * @param height
	 *            The height of the graph
	 */
	self.setHeight = function(height) {
		AR.Graph.prototype.setHeight.call(self, height);
		bubbles.adjustPosition(self._dimension);
	};
};
AR.BubbleGraph.prototype = new AR.Graph();
