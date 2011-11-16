/**@author : koushikr*/
/**
 * The basefunction for the Node Link initialization.
 * Initializes the Node Link. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Line graph will be displayed
 * This is a base class and is called by different Line implementations.
 */
AR.NodeLinkGraphDefault = function(parentDimension, panel, graphDef) {
    var self = this;
    var nodeLinkPanel = panel;
    var layout = nodeLinkPanel.add(pv.Layout.Cluster);
    layout.nodes(pv.dom(graphDef.data).root(graphDef.root).sort(function(a, b) {
        return (pv.naturalOrder(a.nodeName, b.nodeName));
    }).nodes());

    self.setLayoutNodes = function(parentDimension) {
        layout.group(true);
        layout.orient("left");
    };

    var linkLayout = layout.link.add(pv.Line);

    self.setLayoutLink = function(parentDimension) {
        linkLayout.strokeStyle("#ccc");
        linkLayout.lineWidth(1);
        linkLayout.antialias(false);
    };

    var nodeLink = layout.node.add(pv.Dot);

    self.setDotFillStyle = function(graphDef) {
        nodeLink.fillStyle(function(n) {
            return (n.firstChild ? "#aec7e8" : "#ff7f0e");
        });
    };

    self.setLayoutLabel = function(parentDimension) {
        layout.label.add(pv.Label);
    };

    self.setDendogramProperties = function() {
        self.setLayoutNodes(parentDimension);
        self.setLayoutLink(parentDimension);
        self.setDotFillStyle(graphDef);
        self.setLayoutLabel(parentDimension);
    };

    self.setDendogramProperties();

};

/**
 * Tree API to construct a Tree Graph or otherwise called the Node-Link graph
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.TreeGraph = function(graphDef) {
    var self = this;
    AR.Graph.apply(self, [graphDef]);

    // Here I'm gonna have to call the Tree API or the Node Link API
    // Before I do so I am gonna adjust the panel dimensions a bit..
    var nodeLink = AR.NodeLinkGraphDefault(self._dimension, self._panel, graphDef);

    if (graphDef.margin === "n") {
        self._panel.strokeStyle("");
    }
    // These are getter and setter methods.
    self.setWidth = function(width) {
        self._panel.width(width);
    };

    self.setHeight = function(height) {
        self._panel.height(height);
    };

    self.setLeft = function(left) {
        self._panel.left(left);
    };

    self.setRight = function(right) {
        self._panel.right(right);
    };

    self.setTop = function(top) {
        self._panel.top(top);
    };

    self.setBottom = function(bottom) {
        self._panel.bottom(bottom);
    };

    self.setWidth(500);
    self.setHeight(500);
    self.setLeft(50);
    self.setRight(160);
    self.setTop(10);
    self.setBottom(10);
};
AR.TreeGraph.prototype = AR.extend(AR.Graph);



/**
 * The following lines of code are for the sunBurst Graph
 */


/**
 * The basefunction for the Node Link initialization.
 * Initializes the Node Link. Sets the data
 * @params {Object}
 *             [graphDef] graphDef object supplied by the User for which the graph needs to be plotted. It contains graph properties and the data
 * @params {Object}
 *             [parentDimension] parentDimension object that will indicate the dimensions of AR.Graph
 * @params {Object}
 *             [panel] A panel object indicating the Graph Panel in which the current Line graph will be displayed
 * This is a base class and is called by different Line implementations.
 */
AR.SunBurstGraphDefault = function(parentDimension, panel, graphDef) {
    var self = this;
    var sunBurstPanel = panel;
    self.sunBurstPartition = sunBurstPanel.add(pv.Layout.Partition.Fill);
    var flag;
    var partitionNodes = self.sunBurstPartition.node.add(pv.Wedge);
    if (graphDef.order === "asc") {
        flag = true;
    }
    else {
        falg = false;
    }

    self.setSunBurstNodes = function() {
        self.sunBurstPartition.nodes(pv.dom(graphDef.data).root(graphDef.root).nodes());
    };

    self.setSunBurstSize = function() {
        self.sunBurstPartition.size(function(d) {
            return 12;
        });
    };

    self.setSunBurstOrder = function(flag) {
        if (flag === true) {
            self.sunBurstPartition.order("ascending");
        } else {
            self.sunBurstPartition.order("descending");
        }
    };

    self.setOrientation = function(orientationType) {
        if (orientationType === null) {
            // Setting default orientation..
            self.sunBurstPartition.orient("radial");
        } else {
            self.sunBurstPartition.orient(orientationType);
        }
    };



    self.setFillStyle = function() {
        partitionNodes.fillStyle(pv.Colors.category19().by(function(d) {
            return (d.parentNode && d.parentNode.nodeName);
        }));
    };

    self.setStrokeStyle = function(style) {
        if (style === null) {
            partitionNodes.strokeStyle("#fff");
        } else {
            partitionNodes.strokeStyle(style);
        }
    };

    self.setLineWidth = function(width) {
        if (width === null) {
            partitionNodes.lineWidth(0.5);
        }
        else {
            partitionNodes.lineWidth(width);
        }
    };

    self.setPartitionLabel = function() {
        self.sunBurstPartition.label.add(pv.Label).visible(function(d) {
            return (d.angle * d.outerRadius >= 6);
        });
    };

    self.setSunBurstProperties = function() {
        self.setSunBurstNodes();
        self.setSunBurstSize();
        self.setSunBurstOrder(false);
        self.setOrientation(null);
        self.setFillStyle();
        self.setStrokeStyle(null);
        self.setLineWidth(0.5);
        self.setPartitionLabel();
    };

    self.setSunBurstProperties();
};

/**
 * Tree API to construct a Tree Graph or otherwise called the Node-Link graph
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 * @extends AR.Graph
 */
AR.SunBurstGraph = function(graphDef) {
    var self = this;
    AR.Graph.apply(self, [graphDef]);

    // Here I'm gonna have to call the Tree API or the Node Link API
    // Before I do so I am gonna adjust the panel dimensions a bit..
    var nodeLink = AR.SunBurstGraphDefault(self._dimension, self._panel, graphDef);

    if (graphDef.margin === "n") {
        self._panel.strokeStyle("");
    }
    // These are getter and setter methods.
    self.setWidth = function(width) {
        self._panel.width(width);
    };

    self.setHeight = function(height) {
        self._panel.height(height);
    };

    self.setLeft = function(left) {
        self._panel.left(left);
    };

    self.setRight = function(right) {
        self._panel.right(right);
    };

    self.setTop = function(top) {
        self._panel.top(top);
    };

    self.setBottom = function(bottom) {
        self._panel.bottom(bottom);
    };

    self.setWidth(500);
    self.setHeight(600);
    self.setLeft(20);
    self.setBottom(-40);
};
AR.SunBurstGraph.prototype = AR.extend(AR.Graph);