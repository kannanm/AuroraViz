/**@author : Aditya Gaur*/

Array.prototype.max = Array.prototype.max ||
function() {
    var max = this[0];
    var len = this.length;
    var i;
    for (i = 1; i < len; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
};

/**
 * @author Aditya Gaur
 * @Description The top-level aurora namespace. All public methods and
 *  fields should be registered on this namespace object.
 * @namespace The top-level aurora namespace, <tt>AR</tt>.
 */
var AR = {};

/**
 * @author Aditya Gaur
 * Returns a prototype object suitable for extending the
 *         given class <tt>f</tt>. For more details, see Douglas Crockford's
 *         essay on prototypal inheritance.
 * @param {function}
 *            f a constructor.
 * @returns a suitable prototype object.
 * @see Douglas Crockford's essay on <a
 *      href="http://javascript.crockford.com/prototypal.html">prototypal
 *      inheritance</a>.
 */
AR.extend = function(f) {
    function g() {}
    g.prototype = f.prototype || f;
    return new g();
};

/**
 * @author Aditya Gaur
 * Adds the javascript file specified by the <tt>jsPath</tt>,
 *         at the position <tt>pos</tt>.
 * @param {string}
 *            [jsPath] the path of the JS file to be included.
 * @param {string}
 *            [pos](optional)the dom element in which the script tag to include
 *            js file will appear. If unspecified the js file will be included
 *            in head.
 */
AR.addJavascript = function(jsPath, pos, dataPath, callback) {
    var position = pos || "head";
    var posElem = document.getElementsByTagName(position)[0];
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', jsPath);
    if (dataPath) {
        scriptTag.setAttribute('data-path', dataPath);
    }
    posElem.appendChild(scriptTag);
    return scriptTag;
};


/**
 * @author Aditya Gaur
 * Adds the CSS file specified by the <tt>cssPath</tt>,
 *         at the position <tt>pos</tt>.
 * @param {string}
 *            [cssPath] the path of the CSS file to be included.
 * @param {string}
 *            [pos](optional)the dom element in which the link tag to include
 *            css file will appear. If unspecified the css file will be included
 *            in head.
 */
AR.addCSS = function(cssPath, pos) {
    var position = pos || "head";
    var posElem = document.getElementsByTagName(position)[0];
    var cssTag = document.createElement('link');
    cssTag.setAttribute('type', 'text/css');
    cssTag.setAttribute('href', cssPath);
    cssTag.setAttribute('rel', 'stylesheet');
    posElem.appendChild(cssTag);
};


/**
 * The basefunction for the graph initilization.
 * Initializes the panel and sets parentDimensions and property values
 * @params {json}
 *             graphDef is the current graph Dimension
 * This method should be the first method that should be called when creating any kind of graph.
 * Creates the panel, sets its dimensions, labels and property values and returns.
 */
AR.Graph = function(graphDef) {
    var self = this;
    var upcasedProp;
    self.__graphDef = graphDef;
    self._pos = undefined;
    self._dimension = {
        height: 400,
        width: 400,
        left: 60,
        right: 20,
        bottom: 60,
        top: 60
    };
    self._captionLabel = undefined;
    self._xAxisName = undefined;
    self._yAxisName = undefined;
    self._horRules = undefined;
    self._verticalRules = undefined;
    self._outerPanel = new pv.Panel().left(20).right(20).bottom(20).top(20);
    self._panel = self._outerPanel.add(pv.Panel);
    self._panel.left(self._dimension.left).right(self._dimension.right).bottom(self._dimension.bottom).top(self._dimension.top);
    self._xAxis = self._panel.add(pv.Rule).bottom(0);
    self._yAxis = self._panel.add(pv.Rule).left(0);
    this.properties.forEach(function(property) {
        upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
        if (graphDef[property]) {
            self["set" + upcasedProp](graphDef[property]);
        }
    });
    var styles = graphDef.style;
    for(prop in styles){
        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
        if (styles.hasOwnProperty(prop)) {
            self["set" + upcasedProp](styles[prop]);
        }
    }

};
AR.Graph.prototype.properties = ["width", "height", "caption", "xAxisName", "yAxisName"];
AR.Graph.labelProperties = [ "labelFontSize", "labelFontColor", "labelRotateAngle" ];

//TODO write commong function for all
AR.Graph.prototype.setHorAxisThickness = function(thickness) {
    var self = this;
    if (self._xAxis) {
        self._xAxis.lineWidth(thickness);
    }
};
AR.Graph.prototype.setVerAxisThickness = function(thickness) {
    var self = this;
    if (self._yAxis) {
        self._yAxis.lineWidth(thickness);
    }
};
AR.Graph.prototype.setVerGridThickness = function(thickness) {
    var self = this;
    if (self._verticalRules) {
        self._verticalRules.lineWidth(thickness);
    }
};
AR.Graph.prototype.setHorGridThickness = function(thickness) {
    var self = this;
    if (self._horRules) {
        self._horRules.lineWidth(thickness);
    }
};
/**
 * Sets a graph's caption.
 * Caption is one of the properties of any graph
 * @params{string}
 *             Sets the caption for the given graph as the supplied parameter value
 * This method setCaption permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setCaption = function(newVal) {
    var self = this;
    if (self.__captionLabel) {
        self.__captionLabel.text(newVal);
    } else {
        self.__captionLabel = self._panel.add(pv.Label).text(newVal).left(self._dimension.width / 2).top(-20).textAlign("center");
    }
};
AR.Graph.prototype.setCaptionSize = function(size) {
    var self = this;
    if (self.__captionLabel) {
        self.__captionLabel.font(size + "px Arial");
    }
};
AR.Graph.prototype.setCaptionColor = function(color) {
    var self = this;
    if (self.__captionLabel) {
        self.__captionLabel.textStyle(color);
    }
};
/**
 * Sets a graph's width.
 * Width is one of the properties of a graph
 * @params{string}
 *             Sets the width for the given graph as the supplied parameter value
 * This method setWidth permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setWidth = function(width) {
    var self = this;
    self._dimension.width = width - self._dimension.left - self._dimension.right;
    self._outerPanel.width(width);
    if (self.__captionLabel) {
        self.__captionLabel.left(self._dimension.width / 2);
    }
};

/**
 * Sets a graph's Height.
 * Height is one of the properties of a graph
 * @params{string}
 *             Sets the height for the given graph as the supplied parameter value
 * This method setHeight permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setHeight = function(height) {
    var self = this;
    self._dimension.height = height - self._dimension.top - self._dimension.bottom;
    self._outerPanel.height(height);
};

/**
 * Sets a graph's xAxisName.
 * xAxisName is one of the properties of a graph
 * @params{string}
 *             Sets the xAxisName for the given graph as the supplied parameter value
 * This method setXAxisName permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setXAxisName = function(name) {
    var self = this;
    if (self._xAxisName) {
        self._xAxisName.text(name);
    } else {
        self._xAxisName = self._panel.add(pv.Label).bottom(-50).text(name).textAlign("center");
    }
};
/**
 * Sets a graph's yAxisName.
 * yAxisName is one of the properties of a graph
 * @params{string}
 *             Sets the yAxisName for the given graph as the supplied parameter value
 * This method setyAxisName permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setYAxisName = function(name) {
    var self = this;
    if (self._yAxisName) {
        self._yAxisName.text(name);
    } else {
        self._yAxisName = self._panel.add(pv.Label).left(-30).text(name).textAlign("center").textAngle(-Math.PI / 2);
    }
};


AR.Graph.prototype.setHorAxisLabelSize = function(size) {
    var self = this;
    if (self._xAxisName) {
        self._xAxisName.font(size + "px Arial");
    }
};
AR.Graph.prototype.setVerAxisLabelSize = function(size) {
    var self = this;
    if (self._yAxisName) {
        self._yAxisName.font(size + "px Arial");
    }
};

AR.Graph.prototype.setHorAxisLabelColor = function(color) {
    var self = this;
    if (self._xAxisName) {
        self._xAxisName.textStyle(color);
    }
};
AR.Graph.prototype.setVerAxisLabelColor = function(color) {
    var self = this;
    if (self._yAxisName) {
        self._yAxisName.textStyle(color);
    }
};
/**
 * Sets horizontal rules in a graph.
 * Rules are nothing but lines that divide the graph to form a grid like structure
 * @params{integer, scaleType}
 *             It takes the scaleType (Linear/Ordinal etc) and an integer value that denotes the number of rules to be set
 * This method setHorRules permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */

AR.Graph.prototype.setHorGridShow = function(maxValue, scaleType) {
    var self = this;
    var y;
    if (!self._horRules) {
        self._y = pv.Scale[scaleType](0, maxValue).range(0, self._dimension.height - 40);
        self._horRules = self._panel.add(pv.Rule);
        self._horRules.data(self._y.ticks().splice(1, self._y.ticks().length)).bottom(self._y);
/*.strokeStyle(function(d) {
            return ("#cccccc");
        }).anchor("left").add(pv.Label).text(y.tickFormat);*/
    } else {
        self._y = pv.Scale.linear(0, maxValue).range(0, self._dimension.height - 40);
        self._horRules.bottom(self._y);
    }
};

AR.Graph.prototype.setHorGridLabelShow = function(status) {
    var self = this;
    if (self._horRules && status === true) {
        self._horRules.anchor("left").add(pv.Label).text(self._y.tickFormat);
    }
};

/**
 * Sets vertical rules in a graph.
 * Rules are nothing but lines that divide the graph to form a grid like structure
 * @params{integer, scaleType}
 *             It takes the scaleType (Linear/Ordinal etc) and an integer value that denotes the number of rules to be set
 * This method setVerticalRules permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */

AR.Graph.prototype.setVerGridShow = function(maxValue, scaleType) {
    var self = this;
    self._x = undefined;
    if (!self._verticalRules) {
        self._verticalRules = self._panel.add(pv.Rule);
        self._x = pv.Scale[scaleType](0, maxValue).range(0, self._dimension.width - 40);
        self._verticalRules.data(self._x.ticks().splice(1, self._x.ticks().length)).left(self._x); /* }).anchor("bottom").add(pv.Label).text(x.tickFormat);*/
    } else {
        self._x = pv.Scale.linear(0, maxValue).range(0, self._dimension.width - 40);
        self._verticalRules.left(self._x);
    }
};

AR.Graph.prototype.setVerGridLabelShow = function(status) {
    var self = this;
    if (self._verticalRules && status === true) {
        self._verticalRules.anchor("bottom").add(pv.Label).text(self._x.tickFormat);
    }
};


/**
 * Sets a canvas BorderColor
 * @params{colorcode}
 *             It takes the colorcode as input (Eg : 'red' etc or a hex form) and sets the border color to be that.
 * This method setBorderColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setCanvasBorderColor = function(color) {
    var self = this;
    self._outerPanel.strokeStyle(color);
};

/**
 * Sets a canvas FillColor
 * @params{colorcode}
 *             It takes the colorcode as input (Eg : 'red' etc or a hex form) and fills the graph components using that color.
 * This method setFillColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setChartFillColor = function(color) {
    var self = this;
    self._panel.fillStyle(color);
};


/**
 * Sets a canvas FillColor
 * @params{colorcode}
 *             It takes the colorcode as input (Eg : 'red' etc or a hex form) and fills the graph components using that color.
 * This method setFillColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setCanvasFillColor = function(color) {
    var self = this;
    self._outerPanel.fillStyle(color);
};

AR.Graph.prototype.setCanvasBorderThickness = function(thickness) {
    var self = this;
    self._outerPanel.lineWidth(thickness);
};
/**
 * Renders the Component
 */
AR.Graph.prototype.render = function render(div) {
    var self = this;
    if (div || self.__pos) {
        self._outerPanel.canvas(div || self.__pos);
        self._outerPanel.render();
        self.__pos = div || self.__pos;
    } else {
        self._outerPanel.render();
    }
};

//TODO for setting color make a common function which takes in element and color
AR.Graph.prototype.setHorAxisColor = function(color) {
    var self = this;
    self._xAxis.strokeStyle(color);
};

AR.Graph.prototype.setVerAxisColor = function(color) {
    var self = this;
    self._yAxis.strokeStyle(color);
};

AR.Graph.prototype.setVerGridColor = function(color) {
    var self = this;
    if (self._verticalRules) {
        self._verticalRules.strokeStyle(color);
    }
};
AR.Graph.prototype.setHorGridColor = function(color) {
    var self = this;
    if (self._horRules) {
        self._horRules.strokeStyle(color);
    }
};
/**
 * Register the file to protovis. By registering it means the pv.parse parses
 * the code.
 */
AR.registerToProtovis = function() {
    // TODO: TO BE IMPLEMENTED
};


/**
 * <tt>init</tt> function runs as soon as the this file is included. It adds
 * the required javascript files for protovis
 */
(function() {
/* if (navigator.appName === "Microsoft Internet Explorer") {
        AR.addJavascript("../lib/svg/svg.js", "head", "../lib/svg/");
    }
    var scriptArray = ["../lib/protovis/protovis-d3.3.js", "../src/bar.js", "../src/wedge.js", "../src/utility.js", "../src/bubble.js", "../src/area.js", "../src/line.js", "../lib/js/jquery-1.5.1.js", "../lib/js/jquery.ui.core.js", "../lib/js/jquery.tablesorter.pager.js", "../lib/js/jquery.tablesorter.js", "../lib/js/jquery.validationEngine.js", "../src/tree.js"];
    //var scriptArray = ["lib/protovis/protovis-d3.3.js", "src/bar.js", "src/wedge.js", "src/utility.js", "src/bubble.js", "src/area.js", "src/line.js", "src/tree.js"];
    self._includeScripts = function(scriptArray) {
        for (i = 0; i < scriptArray.length; i++) {
            AR.addJavascript(scriptArray[i]);
        }
    };
    self._includeScripts(scriptArray);
    var jQueryTipsy, tipsy;
    var jQuery = AR.addJavascript("../lib/jQuery/jquery-1.4.2.min.js");
    jQuery.onload = function() {
        jQueryTipsy = AR.addJavascript("../lib/jQuery/tipsy/jquery.tipsy.js");
        jQueryTipsy.onload = function() {
            tipsy = AR.addJavascript("../lib/jQuery/tipsy/tipsy.js");
        };
    };
    AR.addCSS("../lib/jQuery/tipsy/tipsy.css");*/
}());