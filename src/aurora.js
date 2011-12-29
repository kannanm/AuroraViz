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
 
 * @Description The top-level aurora namespace. All public methods and
 *  fields should be registered on this namespace object.
 * @namespace The top-level aurora namespace, <tt>AR</tt>.
 */
var AR = {};

/**
 
 * Returns a prototype object suitable for extending the
 *         given class <tt>f</tt>. For more details, see Douglas Crockford's
 *         essay on prototypal inheritance.
 * @param  {function}
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
 * @class
 * The basefunction for the graph initilization.
 * Initializes the panel and sets parentDimensions and property values
 * @param {json}
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
    self._caption = undefined;
    self._horAxisLabel = undefined;
    self._verAxisLabel = undefined;
    self._horGrid = undefined;
    self._verGrid = undefined;
    self._outerPanel = new pv.Panel().left(0).right(0).bottom(0).top(0);
    self._panel = self._outerPanel.add(pv.Panel);
    self._panel.left(self._dimension.left).right(self._dimension.right).bottom(self._dimension.bottom).top(self._dimension.top);
    self._horAxis = self._panel.add(pv.Rule).bottom(0);
    self._verAxis = self._panel.add(pv.Rule).left(0);
    this.properties.forEach(function(property) {
        upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
        if (graphDef[property]) {
            self["set" + upcasedProp](graphDef[property]);
        }
    });
    var styles = graphDef.style;
    var prop;
    for (prop in styles) {
        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
        if (styles.hasOwnProperty(prop)) {
            self["set" + upcasedProp](styles[prop]);
        }
    }
};
AR.Graph.prototype.properties = ["width", "height", "caption", "xAxisName", "yAxisName"];
AR.Graph.labelProperties = ["labelFontSize", "labelFontColor", "labelRotateAngle"];
AR.Graph.lineElements = ["horAxis", "verAxis", "verGrid", "horGrid"];
AR.Graph.labelElements = ["caption", "horAxisLabel", "verAxisLabel"];

//Following is a function generator for setting line thickness
//(function(){
//    for (i=0;i<AR.Graph.lineElements.length;i++){
//        var prop = AR.Graph.lineElements[i];
//        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
//        AR.Graph.prototype["set"+upcasedProp+"Thickness"] = function(thickness){
//            var self = this;
//            console.log("thickness"+thickness);
//            if (self["_"+prop]) {
//                self["_"+prop].lineWidth(thickness);
//            }        
//        }
//    }    
//}());
//TODO write commong function for all

AR.Graph.prototype.setHorAxisThickness = function(thickness) {
    var self = this;
    if (self._horAxis) {
        self._horAxis.lineWidth(thickness);
    }
};

AR.Graph.prototype.setVerAxisThickness = function(thickness) {
    var self = this;
    if (self._verAxis) {
        self._verAxis.lineWidth(thickness);
    }
};

AR.Graph.prototype.setVerGridThickness = function(thickness) {
    var self = this;
    if (self._verGrid) {
        self._verGrid.lineWidth(thickness);
    }
};

AR.Graph.prototype.setHorGridThickness = function(thickness) {
    var self = this;
    if (self._horGrid) {
        self._horGrid.lineWidth(thickness);
    }
};

AR.Graph.prototype.setCanvasBorderThickness = function(thickness) {
    var self = this;
    self._outerPanel.lineWidth(thickness);
};

// Following is a function generator for creating setcolor functions
//(function(){
//    var i=0;
//    for (i=0;i<AR.Graph.labelElements.length;i++){
//        var prop = AR.Graph.labelElements[i];
//        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
//        AR.Graph.prototype["set"+upcasedProp+"Color"] = function(color){
//            var self = this;
//            if (self["_"+prop]) {
//                self["_"+prop].textStyle(color);
//            }        
//        }
//    }    
//}());
/**
 * Sets the caption color. Caption is the string that comes on the top of the graph
 * @param {string}
 *            [color] The hexadecimal string for color.For example #cccccc. If undefined set to default value #000000
 */
AR.Graph.prototype.setCaptionColor = function(color) {
    var self = this;
    if (self._caption) {
        self._caption.textStyle(color || "#000000");
    }
};

/**
 * Sets the Horizontal axis color.  
 * @param {string}
 *            [color] The hexadecimal string for color.For example #cccccc. If undefined set to default value #000000
 */
AR.Graph.prototype.setHorAxisLabelColor = function(color) {
    var self = this;
    if (self._horAxisLabel) {
        self._horAxisLabel.textStyle(color || "#000000");
    }
};

/**
 * Sets the vertical axis color.  
 * @param {string}
 *            [color] The hexadecimal string for color.For example #cccccc. If undefined set to default value #000000
 */
AR.Graph.prototype.setVerAxisLabelColor = function(color) {
    var self = this;
    if (self._verAxisLabel) {
        self._verAxisLabel.textStyle(color || "#000000");
    }
};


// Following is a function generator for setting caption size
//(function(){
//    var i=0;
//    for (i=0;i<AR.Graph.labelElements.length;i++){
//        var prop = AR.Graph.labelElements[i];
//        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
//        AR.Graph.prototype["set"+upcasedProp+"Color"] = function(size){
//            var self = this;
//            if (self["_"+prop]) {
//                self["_"+prop].font(size + "pt Arial");
//            }        
//        }
//    }    
//}());
/**
 * Sets the caption size. Caption is the string that comes on the top of the graph
 * @param {string}
 *            [size] The size of the caption. If undefined set to default value 16pt
 */
AR.Graph.prototype.setCaptionSize = function(size) {
    var self = this;
    if (self._caption) {
    	//Note: here we are scaling the size of the caption according to the size of the graph. The size is relative
        self._caption.font(AR.Utility.getSize(self.__graphDef,"caption",size) + "px Arial");
    }
};
/**
 * Sets a horizontal axis label size
 * @param {string}
 *             [size] The size of the horizontal axis label. If undefined set to default value 12pt
 */
AR.Graph.prototype.setHorAxisLabelSize = function(size) {
    var self = this;
    if (self._horAxisLabel) {
        self._horAxisLabel.font(AR.Utility.getSize(self.__graphDef,"caption",size)  + "px Arial");
    }
};
/**
 * Sets the Vertical axis lavel size.
 * @param {string}
 *               [size] The size of the vertical axis label. If undefined set to default value 12pt
 */
AR.Graph.prototype.setVerAxisLabelSize = function(size) {
    var self = this;
    if (self._verAxisLabel) {
        self._verAxisLabel.font(AR.Utility.getSize(self.__graphDef,"caption",size)  + "px Arial");
    }
};

/**
 * Sets a graph's caption.
 * Caption is one of the properties of any graph
 * @param {string}
 *             Sets the caption for the given graph as the supplied parameter value
 */
AR.Graph.prototype.setCaption = function(newVal) {
    var self = this;
    if (self._caption) {
        self._caption.text(newVal);
    } else {
        self._caption = self._outerPanel.add(pv.Label).text(newVal).left(self._dimension.width / 2 + 40).top(0).textAlign("center").textBaseline("top");
    }
};

/**
 * Sets a graph's width.
 * Width is one of the properties of a graph
 * @param {string}
 *             [width] Sets the width for the given graph as the supplied parameter value
 */
AR.Graph.prototype.setWidth = function(width) {
    var self = this;
    self._dimension.width = width - self._dimension.left - self._dimension.right;
    self._outerPanel.width(width);
    if (self._caption) {
        self._caption.left(self._dimension.width / 2);
    }
};

/**
 * Sets a graph's Height.
 * @param {string}
 *             [height] Height of the graph
 */
AR.Graph.prototype.setHeight = function(height) {
    var self = this;
    self._dimension.height = height - self._dimension.top - self._dimension.bottom;
    self._outerPanel.height(height);
};

/**
 * Sets a graph's xAxisName.
 * @param {string}
 *             [name] The string for the x Axis Label
 */
AR.Graph.prototype.setXAxisName = function(name) {
    var self = this;
    if (self._horAxisLabel) {
        self._horAxisLabel.text(name);
    } else {
        self._horAxisLabel = self._outerPanel.add(pv.Label).bottom(0).text(name).textAlign("center");
    }
};
/**
 * Sets a graph's yAxisName.
 * @param {string}
 *             [name] The string for the y Axis label
 */
AR.Graph.prototype.setYAxisName = function(name) {
    var self = this;
    if (self._verAxisLabel) {
        self._verAxisLabel.text(name);
    } else {
        self._verAxisLabel = self._panel.add(pv.Label).left(-50).text(name).textAlign("center").textAngle(-Math.PI / 2);
    }
};


/**
 * Sets horizontal rules in a graph.
 * Rules are nothing but lines that divide the graph to form a grid like structure
 * @param {integer}
 *               [maxValue] This is the maximimum value that the graph would have in horizontal direction. It is required to calculate the scale.
 * @param {object}
 *            [scaleType] It takes the scaleType (Linear/Ordinal etc)
 */

AR.Graph.prototype.setHorGridShow = function(maxValue, scaleType) {
    var self = this;
    self._y = pv.Scale[scaleType](0, maxValue).range(0, self._dimension.height - 40);
    if (!self._horGrid) {
        self._horGrid = self._panel.add(pv.Rule);
        self._horGrid.data(self._y.ticks().splice(1, self._y.ticks().length)).bottom(self._y);
    } else {
        self._horGrid.bottom(self._y);
    }
};

/**
 * It shows the Horizontal grid axis if the <b>status</b> is set to true
 * @param {boolean}
 *         [status]If set to true it show the labels for the Horizontal grid
 */
AR.Graph.prototype.setHorGridLabelShow = function(status) {
    var self = this;
    if (self._horGrid && status === true) {
        self._horGrid.anchor("left").add(pv.Label).text(self._y.tickFormat).font(AR.Utility.getSize(self.__graphDef,"gridLabels",15)  + "px Arial");
    }
};

/**
 * Sets vertical rules in a graph.
 * Rules are nothing but lines that divide the graph to form a grid like structure
 * @param {integer}
 *               [maxValue] This is the maximimum value that the graph would have in vertical direction. It is required to calculate the scale.
 * @param {object}
 *            [scaleType] It takes the scaleType (Linear/Ordinal etc)
 *             
 */

AR.Graph.prototype.setVerGridShow = function(maxValue, scaleType) {
    var self = this;
     self._x = pv.Scale[scaleType](0, maxValue).range(0, self._dimension.width - 40);
    if (!self._verGrid) {
        self._verGrid = self._panel.add(pv.Rule);
        self._verGrid.data(self._x.ticks().splice(1, self._x.ticks().length)).left(self._x); /* }).anchor("bottom").add(pv.Label).text(x.tickFormat);*/
    } else {
        self._verGrid.left(self._x);
    }
};

/**
 * It shows the Vertical grid axis if the <b>status</b> is set to true
 * @param {boolean}
 *         [status] If set to true it show the labels for the vertical grid
 */
AR.Graph.prototype.setVerGridLabelShow = function(status) {
    var self = this;
    if (self._verGrid && status === true) {
        self._verGrid.anchor("bottom").add(pv.Label).text(self._x.tickFormat).font(AR.Utility.getSize(self.__graphDef,"gridLabels",15)  + "px Arial");
    }
};


/**
 * Sets a canvas BorderColor
 * @param {colorcode}
 *           [color]  It takes the colorcode as input (Eg : 'red' etc or a hex form) and sets the border color to be that.
 * This method setBorderColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setCanvasBorderColor = function(color) {
    var self = this;
    self._outerPanel.strokeStyle(color);
};

/**
 * Sets a canvas FillColor
 * @param {colorcode}
 *            [color] It takes the colorcode as input (Eg : 'red' etc or a hex form) and fills the graph components using that color.
 * This method setFillColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setChartFillColor = function(color) {
    var self = this;
    self._panel.fillStyle(color);
};


/**
 * Sets a canvas FillColor
 * @param {colorcode}
 *             [color] It takes the colorcode as input (Eg : 'red' etc or a hex form) and fills the graph components using that color.
 * This method setFillColor permenantly sticks with the AR.Graph object as it is prototyped.
 * This can be used by any AR.Graph type object
 */
AR.Graph.prototype.setCanvasFillColor = function(color) {
    var self = this;
    self._outerPanel.fillStyle(color);
};

/**
 * Renders the Component
 * @param {html node}
 *             [div]The node in which the graph has to be rendered. If undefined grpah is rendered whereever the function is called.
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

// Following is a function generator for setting line elemnt color
//(function(){
//    var i=0;
//    for (i=0;i<AR.Graph.lineElements.length;i++){
//        var prop = AR.Graph.lineElements[i];
//        upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
//        AR.Graph.prototype["set"+upcasedProp+"Color"] = function(color){
//            var self = this;
//            if (self["_"+prop]) {
//                self["_"+prop].strokeStyle(color);
//            }        
//        }
//    }    
//}());
/**
 * Sets the horizontal axis color
 * @param {string}
 *             [color] The hexadecimal representation of the color for e.g. #cccccc
 */
AR.Graph.prototype.setHorAxisColor = function(color) {
    var self = this;
    self._horAxis.strokeStyle(color);
};

/**
 * Sets the vertical axis color
 * @param {string}
 *             [color] The hexadecimal representation of the color for e.g. #cccccc
 */
AR.Graph.prototype.setVerAxisColor = function(color) {
    var self = this;
    self._verAxis.strokeStyle(color);
};

/**
 * Sets the vertical grid color
 * @param {string}
 *             [color] The hexadecimal representation of the color for e.g. #cccccc
 */
AR.Graph.prototype.setVerGridColor = function(color) {
    var self = this;
    if (self._verGrid) {
        self._verGrid.strokeStyle(color);
    }
};

/**
 * Sets the horizontal grid color
 * @param {string}
 *             [color] The hexadecimal representation of the color for e.g. #cccccc
 */
AR.Graph.prototype.setHorGridColor = function(color) {
    var self = this;
    if (self._horGrid) {
        self._horGrid.strokeStyle(color);
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