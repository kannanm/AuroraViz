/**@authors : Aditya Gaur, koushikr*/

/**
 * The basefunction for the Wedge initialization.
 * Initializes the WedgeGraph. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Wedge graph will be displayed
 * This is a base class and is called by different Wedge implementations (Eg : Donut or Pie)
 */

//TODO : Merge the piegraph and the donut graph because the only difference is having an inner radius
AR.Wedge = function(parentDimension, panel, graphDef) {
    var properties = ["values", "labels", "legends"];
    var wedge = panel.add(pv.Wedge);
    var wedgeLabels, valueLabels;
    var dataValues = AR.Utility.getDataArray(graphDef.data);
    var self = this;
    var adjustRadius = function(parentDimension) {
        if (graphDef.pieRadius !== null) {
            wedge.outerRadius(AR.Utility.getSize(graphDef,"wedge",graphDef.pieRadius));
        } else {
            wedge.pieRadius(function() {
                return (parentDimension.width < parentDimension.height ? (parentDimension.width - 30) / 2 : (parentDimension.height - 40) / 2);
            });
        }
    };

    var adjustAngle = function(parentDimension) {
        wedge.angle(function(d) {
            return ((d) * 2 * Math.PI);
        });
    };

    var adjustLabelPosition = function(parentDimension, labelFontSize, isValueLabel) {
        var labels, shift;
        if (isValueLabel) {
            labels = valueLabels;
            shift = labelFontSize;
        } else {
            labels = wedgeLabels;
            shift = 0;
        }
        if (labels) {
            labels.left(function() {
                return (wedge.outerRadius() / 2 * Math.cos(wedge.midAngle()) + (parentDimension.width) / 2);
            }).bottom(function() {
                return (-wedge.outerRadius() / 2 * Math.sin(wedge.midAngle()) + (parentDimension.height) / 2 - shift);
            });
        }
    };

    self.adjustPosition = function(parentDimension) {
        adjustRadius(parentDimension);
        adjustAngle(parentDimension);
        wedge.def("o", -1).left(function() {
            return (parentDimension.width / 2 + Math.cos(this.startAngle() + this.angle() / 2) * ((this.o() === this.index) ? 10 : 1));
        }).bottom(function() {
            return (parentDimension.height / 2 - Math.sin(this.startAngle() + this.angle() / 2) * ((this.o() === this.index) ? 10 : 1));
        }).event("mouseover", function() {
            return this.o(this.index);
        }).event("mouseout", function() {
            return this.o(-1);
        });
    };

    self.showLabels = function(parentDimension) {
        wedgeLabels = wedge.add(pv.Label).textAlign("center").textBaseline("middle").text(function() {
            return graphDef.data[this.index].label;
        });
        adjustLabelPosition(parentDimension, graphDef.labelFontSize);
        AR.Utility.setLabelProperties(graphDef, wedgeLabels, false);
    };

    self.showValues = function(parentDimension) {
        valueLabels = wedge.add(pv.Label).textAlign("center").textBaseline("middle").text(function() {
            return graphDef.data[this.index].value;
        });
        adjustLabelPosition(parentDimension, graphDef.labelFontSize, 1);
        AR.Utility.setLabelProperties(graphDef, valueLabels, false);
    };

    self.showLegends = function() {
        AR.Utility.addLegendToObject(wedge, graphDef.data, graphDef);
    };
    wedge.data(pv.normalize(dataValues));
    properties.forEach(function(property) {
        var upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
        if (graphDef["show" + upcasedProp]) {
            self["show" + upcasedProp](parentDimension);
        }
    });
    wedge.title(function() {
        return AR.Utility.getToolTipText(graphDef.data, this.index);
    });
    if (graphDef.presetPalette) {
        AR.Utility.setPalette(wedge, AR.Utility.getPaletteColors(graphDef));
    }
    //TODO: add tool tip at the right place
    if (graphDef.toolTip) {
        AR.Utility.setToolTip(graphDef, wedge, "s");
    }
    self.adjustPosition(parentDimension);
};


/**
 * Wedge API to construct a Pie Graph
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.PieGraph = function(graphDef) {
    var self = this;
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
    self.initialize(graphDef);
    var wedges = new AR.Wedge(self._dimension, self._panel, graphDef);
    //TODO: add other function such as changing the pallete etc  
    // Would kinda serve as APIs for a new user who's come in..
    self.setWidth = function(width) {
        AR.Graph.prototype.setWidth.call(self, width);
        wedges.adjustPosition(self._dimension);
    };
    self.setHeight = function(height) {
        AR.Graph.prototype.setHeight.call(self, height);
        wedges.adjustPosition(self._dimension);
    };
};
AR.PieGraph.prototype = new AR.Graph();;

/**
 * The basefunction for the Donut initialization.
 * Initializes the WedgeGraph. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Wedge graph will be displayed
 * This is a base class and is called by different Wedge implementations (Eg : Donut or Pie)
 */
AR.Donut = function(parentDimension, panel, graphDef) {
    var properties = ["values", "labels", "legends"];
    var wedge = panel.add(pv.Wedge);
    var wedgeLabels, valueLabels;
    var dataValues = AR.Utility.getDataArray(graphDef.data);
    var self = this;
    var adjustLabelPosition = function(parentDimension, labelFontSize, isValueLabel) {
        var labels, shift;
        if (isValueLabel) {
            labels = valueLabels;
            shift = labelFontSize;
        } else {
            labels = wedgeLabels;
            shift = 0;
        }
        if (labels) {
            labels.left(function() {
                return ((wedge.outerRadius() + wedge.innerRadius()) / 2 * Math.cos(wedge.midAngle()) + (parentDimension.width) / 2);
            }).bottom(function() {
                return (-(wedge.outerRadius() + wedge.innerRadius()) / 2 * Math.sin(wedge.midAngle()) + (parentDimension.height) / 2 - shift);
            });
        }
    };

    var adjustRadius = function(parentDimension) {
        if (graphDef.outerRadius !== null) {
            wedge.outerRadius(AR.Utility.getSize(graphDef,"wedge",graphDef.outerRadius));
        } else {
            wedge.outerRadius(function() {
                return (parentDimension.width < parentDimension.height ? (parentDimension.width - 30) / 2 : (parentDimension.height - 40) / 2);
            });
        }

        if (graphDef.innerRadius !== null) {
            wedge.innerRadius(AR.Utility.getSize(graphDef,"wedge",graphDef.innerRadius));
        } else {
            wedge.innerRadius(function() {
                return (parentDimension.width < parentDimension.height ? ((parentDimension.width - 30) / 2) - 40 : ((parentDimension.height - 40) / 2)) - 40;
            });
        }
    };

    var adjustAngle = function(parentDimension) {
        wedge.angle(function(d) {
            return ((d) * 2 * Math.PI);
        });
    };
    self.showLabels = function(parentDimension) {
        wedgeLabels = wedge.add(pv.Label).textAlign("center").textBaseline("middle").text(function() {
            return graphDef.data[this.index].label;
        });
        adjustLabelPosition(parentDimension, graphDef.labelFontSize);
        AR.Utility.setLabelProperties(graphDef, wedgeLabels, false);
    };

    self.showValues = function(parentDimension) {
        valueLabels = wedge.add(pv.Label).textAlign("center").textBaseline("middle").text(function() {
            return graphDef.data[this.index].value;
        });
        adjustLabelPosition(parentDimension, graphDef.labelFontSize, 1);
        AR.Utility.setLabelProperties(graphDef, valueLabels, false);
    };
    self.adjustPosition = function(parentDimension) {
        adjustRadius(parentDimension);
        adjustAngle(parentDimension);
    };

    wedge.data(pv.normalize(dataValues));

    wedge.title(function() {
        return AR.Utility.getToolTipText(graphDef.data, this.index);
    });

    //TODO: add tool tip at the right place
    if (graphDef.toolTip && graphDef.toolTip === 1) {
        AR.Utility.setToolTip(graphDef, wedge, "s");
    }
    self.showLegends = function() {
        AR.Utility.addLegendToObject(wedge, graphDef.data, graphDef);
    };
    self.adjustPosition(parentDimension);
    properties.forEach(function(property) {
        var upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
        if (graphDef["show" + upcasedProp]) {
            self["show" + upcasedProp](parentDimension);
        }
    });
    if (graphDef.presetPalette) {
        AR.Utility.setPalette(wedge, AR.Utility.getPaletteColors(graphDef));
    }
};
/**
 * Wedge API to construct a Donut Graph
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */

AR.DonutGraph = function(graphDef) {
    var self = this;
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
    self.initialize(graphDef);
    var wedges = new AR.Donut(self._dimension, self._panel, graphDef);
    //TODO: add other function such as changing the pallete etc  
    // Would kinda serve as APIs for a new user who's come in..
    self.setWidth = function(width) {
        AR.Graph.prototype.setWidth.call(self, width);
        wedges.adjustPosition(self._dimension);
    };
    self.setHeight = function(height) {
        AR.Graph.prototype.setHeight.call(self, height);
        wedges.adjustPosition(self._dimension);
    };
};
AR.DonutGraph.prototype = new AR.Graph();;