/**@author : aditya.g*/


/**
 * A constructor function to create a stacked area graph.
 *
 * @class
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.StackedAreaGraph = function(graphDef) {

    var self = this;
    var dataset = graphDef.dataset;
    var colors = AR.Utility.getPaletteColors(graphDef);
    /**
     * @private
     * It is sum of maximum values from each categories because the scale will depend on it as it is a stacked graph
     */
    var sumOfMaxValues = (function() {
        var sum = 0,
            i;
        for (i = 0; i < dataset.length; i++) {
            sum += AR.Utility.findMax(dataset[i].data);
        }
        return sum;
    }());

    /**
     * @private
     * Total number of records in the data set
     */
    var noOfRecords = (function() {
        var records = 0;
        for (i = 0; i < dataset.length; i++) {
            if (dataset[i].data.length > records) {
                records = dataset[i].data.length;
            }
        }
        return records;
    }());

    /**
     * It is an array of arrays. The inner array representing the data in each category.
     */
    var dataArray = (function() {
        var arr = [],
            innerArr, i, j, obj;
        for (i = 0; i < dataset.length; i++) {
            innerArr = [];
            var data = dataset[i].data;
            for (j = 0; j < data.length; j++) {
                obj = {};
                obj.x = j;
                obj.y = data[j].value;
                innerArr.push(obj);
            }
            arr.push(innerArr);
        }
        return arr;
    }());

    self.setVerGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setVerGridShow.apply(self, [dataset.length, AR.Utility.scale.linear]);
        }
    };
    self.setHorGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setHorGridShow.apply(self, [sumOfMaxValues, AR.Utility.scale.linear]);
        }
    };
    self.initialize(graphDef);

    var xScale = pv.Scale.linear(0, noOfRecords).range(0, self._dimension.width - 40),
        yScale = pv.Scale.linear(0, sumOfMaxValues).range(0, self._dimension.height - 40);

/*
     * The function creates the stack area Object
     */
    var createStackedAreaGraph = function() {
        self._areaObj = self._panel.add(pv.Layout.Stack).layers(dataArray).x(function(d) {
            return xScale(d.x) + AR.AreaConstants.xOffset;
        }).y(function(d) {
            return yScale(d.y);
        }).layer.add(pv.Area);
        self._areaObj.strokeStyle(function() {
            return colors[this.parent.index % colors.length];
        }).fillStyle(function() {
            return this.strokeStyle().alpha(0.2);
        });
        self._areaObj.segmented(true);

    };
    createStackedAreaGraph();
    self._areaObj.title(function() {
        return (graphDef.dataset[this.parent.index].seriesname);
    });
    if (graphDef.showValues) {
        self._areaObj.anchor("top").add(pv.Label).text(function(d) {
            var dataObj = dataArray[this.parent.index];
            return (dataObj[this.index].y);
        }).textBaseline("bottom")
        .font(AR.Utility.getSize(graphDef,"gridLabels",AR.constants.values.smallLabels.size) + "px Arial");
    }
    if (graphDef.showLabels) {
        var labels = self._areaObj.add(pv.Label).text(function() {
            return graphDef.categories[0].category[this.index].label;
        }).bottom(0).textBaseline("top");
        AR.Utility.setLabelProperties(graphDef, labels, false);
    }
    if (graphDef.showLegends) {
        var i = 0;
        for (i = 0; i < dataset.length; i++) {
            AR.Utility.createLegends(self._panel, i, dataset[i].seriesname, colors[i % dataset.length],graphDef);
        }
    }
    if (graphDef.interpolated) {
        self._areaObj.interpolate("step-after");
    }
    AR.Utility.setToolTip(graphDef, self._areaObj, "s");
};
AR.StackedAreaGraph.prototype = new AR.Graph();

/**
 * A constructor function to create a Area Object.
 *
 * @class
 * @param {object}
 *            [parentDimension] The dimension Object of the parent element. Here the parent element is the panel
 * @param {object}
 *            [panel] The panel Object to which the graph objects will be added
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @param {object}
 *            [dataObj] An object containing the graph data
 * @param {object}
 *            [color] If defined then the fill color of area object will be set to color
 * @param {object}
 *            [seriesname] If given defined then this area object is a part for multi series area graph and series name is <b>seriesname</b>
 *
 * @author Aditya Gaur
 */

AR.Area = function(parentDimension, panel, graphDef, dataObj, color, seriesname, seriesNumber) {
    var self = this;
    self._areaObj = panel.add(pv.Area);
    var dataArr = AR.Utility.getDataArray(dataObj);
    self._areaObj.data(dataArr);
/*
     * Sets the height of the area object
     */
    var setHeight = function() {
        var maxVal = AR.Utility.findArrayMax(dataArr);
        var xScale = pv.Scale.linear(0, maxVal).range(0, parentDimension.height - 40);
        self._areaObj.height(function(d) {
            return xScale(d);
        });
    };

/*
     *
     * Sets the left property of the area object
     */
    var setLeft = function() {
        var noOfRecords = dataArr.length;
        var xScale = pv.Scale.linear(0, noOfRecords).range(0, parentDimension.width - 40);
        self._areaObj.left(function(d) {
            return xScale(this.index) + AR.AreaConstants.xOffset;
        });
    };

/*
     * Sets the bottom property of the area object
     */
    var setBottom = function() {
        self._areaObj.bottom(0);
    };

/*
     * Sets the fill color of the area object if <b>color</b> is defined then set to <b>color</b>
     */
    var setFillStyle = function() {
        self._areaObj.strokeStyle(color || graphDef.areaColor);
        self._areaObj.fillStyle(function() {
            return this.strokeStyle().alpha(0.2);
        });
    };


    self.setAreaAttributes = function() {
        var self = this;
        setBottom();
        setHeight();
        setLeft();
        setFillStyle();
        self._areaObj.segmented(true);
        if (graphDef.interpolated === true) {
            self._areaObj.interpolate("step-after");
        }
    };
    self._areaObj.title(function() {
        return (seriesname ? seriesname : dataObj[this.index].toolTipText ? dataObj[this.index].toolTipText : dataObj[this.index].value);
    });
    if (graphDef.showLabels) {
        var label = self._areaObj.add(pv.Label).textBaseline("top").text(function() {
            return seriesname ? graphDef.categories[0].category[this.index].label : dataObj[this.index].label;
        });
        AR.Utility.setLabelProperties(graphDef, label, false);
    }
    if (graphDef.showValues) {
        var values = self._areaObj.anchor("top").add(pv.Label).textBaseline("bottom").text(function() {
            return dataObj[this.index].value;
        }).font(AR.Utility.getSize(graphDef,"gridLabels",AR.constants.values.smallLabels.size) + "px Arial");
    }
    AR.Utility.setToolTip(graphDef, self._areaObj, "s");
    self.setAreaAttributes();

    //Note: Legends for a single series area graph does no make sense. Thus not implemented
    if (graphDef.showLegends) {
        AR.Utility.createLegends(panel, seriesNumber, seriesname, color, graphDef);
    }
};


AR.AreaGraph = function(graphDef) {
    var self = this;
    var area, colors;
    var maxVal = AR.Utility.findMaxValue(graphDef);
    var dataset = graphDef.dataset;
    self.setVerGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setVerGridShow.apply(self, [maxVal, AR.Utility.scale.linear]);
        }
    };
    self.setHorGridShow = function(status) {
        if (status === true) {
            AR.Graph.prototype.setHorGridShow.apply(self, [maxVal, AR.Utility.scale.linear]);
        }
    };
    self.initialize(graphDef);
    if (graphDef.presetPalette) {
        colors = AR.Utility.getPaletteColors(graphDef);
    }
    if (dataset) {
        for (i = 0; i < dataset.length; i++) {
            var panel = self._panel.add(pv.Panel);
            bar = new AR.Area(self._dimension, panel, graphDef, dataset[i].data, colors[i % colors.length], graphDef.dataset[i].seriesname, i);
        }
    }
    else {
        area = new AR.Area(self._dimension, self._panel, graphDef, graphDef.data);
    }


};
AR.AreaGraph.prototype = new AR.Graph();
AR.AreaConstants = {};
AR.AreaConstants.xOffset = 60;