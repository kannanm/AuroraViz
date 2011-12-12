/**@author : aditya.g*/


/**
 * A constructor function to create a Bullet graph.
 *
 * @class
 *
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */

AR.BulletGraph = function(graphDef) {
    var self = this;
    self._bullet = undefined;
    self._bulletPanel = undefined;
    self._graphDef = graphDef;
    //TODO: Create the following using function generator as there is a minor difference between the two
    AR.Graph.apply(self, [graphDef]);

    /**
     * @private
     * Creates a bullet panel and adds to the parent panel
     */
    var addBulletPanel = function() {
        self._bulletPanel = self._panel.add(pv.Panel).margin(20);

    };

    /**
     *  @private
     * Sets the top property of the bullet panel as it should not be placed one on the other
     */
    var setBulletPanelTop = function() {
        self._bulletPanel.top(function() {
            return this.index * 2 * (self._dimension.height) / (2 * self._graphDef.data.length) + 40;
        });
    };

    /**
     * @private
     * Creates the bullet layout and adds to the bulletpanel
     */
    var addBullets = function() {
        self._bullet = self._bulletPanel.add(pv.Layout.Bullet);
    };

    //  The following is an implementation of function generator that creates set<Property> functions.
    //    
    //    var props = ["ranges","measures","markers"];
    //    var setterFunc = function(){
    //        var retObject = {},i,property;
    //        for(i =0 ;i<props.length;i++){
    //            property = props[i];
    //            upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
    //            retObject["set"+upcasedProp] = function(){
    //                bullet[property](function(d) d[property]);
    //            }
    //        }
    //        retun retObject;
    //    };
    /**
     * @private
     * Sets the data for ranges field in bullet object
     */
    var setRange = function() {
        self._bullet.ranges(function(d) {
            return d.ranges;
        });
    };

    /**
     * @private
     * Sets the data for measures field in bullet object
     */
    var setMeasures = function() {
        self._bullet.measures(function(d) {
            return d.measures;
        });
    };

    /**
     * @private
     * Sets the data for markers field in bullet object
     */
    var setMarkers = function() {
        self._bullet.markers(function(d) {
            return d.markers;
        });
    };

    /**
     * @private
     *  Adds the range element
     */
    var addRangeElement = function(elem) {
        self._bullet.range.add(pv[elem] || pv.Bar);
    };

    /**
     * @private
     *  Adds the measures element
     */
    var addMeasureElement = function(elem) {
        self._bullet.measure.add(pv[elem] || pv.Bar);
    };

    /**
     * @private
     *  Adds the marker element
     */
    var addMarkerElement = function(elem) {
        self._bullet.marker.add(pv[elem] || pv.Dot);
    };

    /**
     * @private
     * Creates the rule for the bullet object according the the range  
     */
    var createRule = function() {
        self._bullet.tick.add(pv.Rule).anchor("bottom").add(pv.Label).text(self._bullet.x.tickFormat);
    };

    /**
     * @private
     * Adds text label to each bullet object as given in <b>title</b> property of the data
     */
    var addLabel = function() {
        if (self._graphDef.showLabels) {
            var labels = self._bullet.anchor("left").add(pv.Label).textBaseline("bottom").text(function(d) {
                return d.title;
            });
            AR.Utility.setLabelProperties(self._graphDef, labels, true);
            labels.textAlign("right");
        }
    };

    /**
     * @private
     *  Sets the value
     */
    var addValues = function() {
        if (self._graphDef.showValues) {
            //TODO write code for functionality
        }
    };

    /**
     * @private
     *  Sets the title text as the toolTip text given in the data
     */
    var setTitleText = function() {
        self._bullet.title(function(d) {
            return d.toolTipText;
        });
    };

    /**
     * @private
     * A function to create the bullet chart. Its an aggregator function callin all the other functions
     */
    var createBulletChart = function() {
        addBulletPanel();
        self.addData(self._graphDef.data);
        self.setBulletPanelWidth();
        self.setBulletPanelHeight();
        self.setBulletPanelLeft();
        setBulletPanelTop();
        addBullets();
        self.setOrientation(self._graphDef.bulletOrientation);
        setRange();
        setMeasures();
        setMarkers();
        addRangeElement();
        addMeasureElement();
        addMarkerElement();
        self.setMarkerShape(self._graphDef.markerShape);
        self.setMarkerFillStyle(self._graphDef.markerFillColor);
        self.setMeasuresFillStyle(self._graphDef.measureFillColor);
        self.setRangeFillStyle();
        createRule();
        addLabel();
        setTitleText();
        AR.Utility.setToolTip(self._graphDef, self._bullet, "s");
    };
    createBulletChart();
};

AR.BulletGraph.prototype = AR.extend(AR.Graph);

AR.BulletGraph.prototype.setVerGridShow = function(status) {
    var self = this;
    if (status === true) {
        AR.Graph.prototype.setVerGridShow.apply(self, [self._dimension.width, AR.Utility.scale.linear]);
    }
};
AR.BulletGraph.prototype.setHorGridShow = function(status) {
    var self = this;
    if (status === true) {
        AR.Graph.prototype.setHorGridShow.apply(self, [self._dimension.height, AR.Utility.scale.linear]);
    }
};

/**
 * adds Data to the bullet panel
 * @param {object}
 *           [data] Data to be added to bullet Panel
 */
AR.BulletGraph.prototype.addData = function(data) {
    var self = this;
    self._bulletPanel.data(data);
};

/**
 * sets the width of the bullet panel
 * @param {number}
 *           [width] The width of the bullet panel
 */
AR.BulletGraph.prototype.setBulletPanelWidth = function(width) {
    var self = this;
    self._bulletPanel.width(width || (self._dimension.width - 40) / 2);
};

/**
 * sets the height of the bullet panel
 * @param {number}
 *           [height] The height of the bullet panel
 */
AR.BulletGraph.prototype.setBulletPanelHeight = function(height) {
    var self = this;
    self._bulletPanel.height(height || (self._dimension.height - 40) / (2 * self._graphDef.data.length));
};

/**
 * sets the left property of the bullet panel object
 * @param {number}
 *           [left] The left of the bullet panel
 */
AR.BulletGraph.prototype.setBulletPanelLeft = function(left) {
    var self = this;
    self._bulletPanel.left(left || 100);
};

/**
 * sets the orientation of the bullet. It can be set to either left or right
 * @param {string}
 *           [orientation] The orientation of the bullet
 */
AR.BulletGraph.prototype.setOrientation = function(orientation) {
    var self = this;
    self._bullet.orient(orientation || "left");
};

/**
 * sets the shape of the marker. It can be set to circle, square, triangle etc.
 * @param {string}
 *           [shape] The marker shape  
 */
AR.BulletGraph.prototype.setMarkerShape = function(shape) {
    var self = this;
    self._bullet.marker.shape(shape || "triangle");
};

/**
 * sets the fill color of the marker.
 * @param {string}
 *           [color] The marker fillcolor  
 */
AR.BulletGraph.prototype.setMarkerFillStyle = function(color) {
    var self = this;
    self._bullet.marker.fillStyle(color || "white");
};

/**
 * sets the fill color of the marker.
 * @param {string}
 *           [color] The marker fillcolor  
 */
AR.BulletGraph.prototype.setMeasuresFillStyle = function(color) {
    var self = this;
    self._bullet.measure.fillStyle(color || "#1F77B4");
};


/**
 * sets the fill color of the range accordign to the palette selected.
 */

AR.BulletGraph.prototype.setRangeFillStyle = function() {
    var self = this;
    var colors = AR.Utility.getPaletteColors(self._graphDef);
    self._bullet.range.fillStyle(function() {
        return colors[this.index % colors.length];
    });
};