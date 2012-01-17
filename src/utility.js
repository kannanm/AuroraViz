/** @authors : Aditya Gaur, koushikr */

/**
 * Finds the maximum value in the array
 */
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
 * @Description The top-level aurora utility namespace. All utility functions
 * are within this namespace
 * @namespace The top-level aurora utility namespace, <tt>AR.Utility</tt>.
 */
AR.Utility = {};

/**
 * Scale map. Maps the scale name to the type of scale
 */
AR.Utility.scale = {
    "linear": "linear",
    "ordinal": "ordinal",
    "log": "log"
};

/**
 * Function returns the keys for an object. Check if the the function already exist if not then create the function.
 * The implementation has been taken from <a href="http://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object#answer-3937321">here</a>.
 */
AR.Utility.getKeys = Object.keys ||
function() {
    var ownProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        DontEnums = [
            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
            ],
        DontEnumsLength = DontEnums.length;
    return function(o) {
        if (typeof(o !== "object" && typeof o !== "function") || o === null) {
            throw new TypeError("Object.keys called on a non-object");
        }
        var result = [],
            name, i;
        for (name in o) {
            if (ownProperty.call(o, name)) {
                result.push(name);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < DontEnumsLength; i++) {
                if (ownProperty.call(o, DontEnums[i])) {
                    result.push(DontEnums[i]);
                }
            }
        }
        return result;
    };
};

/**
 * Checks if <tt>obj</tt> is an array or not
 * @param obj The object to be checked if its an array or not
 * @returns {Boolean} True if <tt>obj</tt> is an array. False otherwise
 */
AR.Utility.isArray = function(obj) {
    return (Object.prototype.toString.apply(obj) === '[object Array]');
};

/**
 * Checks if <tt>value</tt> is a number or not
 * @param value
 * @returns {Boolean}  True if <tt>value</tt> is a number. False otherwise
 */
AR.Utility.isNumber = function(value) {
    return value.toFixed && value.toExponential;
};

/**
 * Finds the maximum value in data Object
 * @param data It is an array of Objects  
 * @returns the maximum value
 */
AR.Utility.findMax = function(data) {
    var max = data[0].value;
    data.forEach(function(data) {
        if (parseInt(data.value, 10) > max) {
            max = parseInt(data.value, 10);
        }
    });
    return max;
};


AR.Utility.findArrayMax = function(data) {
    var max = parseInt(data[0], 10);
    var i = 0;
    for (i = 0; i < data.length; i++) {
        var cur = parseInt(data[i], 10);
        if (cur > max) {
            max = cur;
        }
    }
    return max;
};


AR.Utility.getDataArray = function(data) {
    var noOfRecords = data.length;
    var arr = [],
        i;
    for (i = 0; i < noOfRecords; i = i + 1) {
        arr.push(data[i].value);
    }
    return arr;
};

//TODO check if the function is being used . Remove otherwise
AR.Utility.getImageContentChart = function(data, type) {
    var noOfRecords = data.length;
    var arr, i;
    for (i = 0; i < noOfRecords; i = i + 1) {
        if (data[i].chart.type === type) {
            arr = data[i].chart.content.chart;
        }
    }
    return arr;
};

//TODO check if the function is being used . Remove otherwise
AR.Utility.getJSONContentChart = function(data, type) {
    var noOfRecords = data.length;
    var arr, i;
    for (i = 0; i < noOfRecords; i = i + 1) {
        if (data[i].chart.type === type) {
            arr = data[i].chart.content.jsoncontent;
        }
    }
    return arr;
};

AR.Utility.Dimension = {
    x: "x",
    y: "y",
    z: "z"
};

// TODO: Combine the following three methods to one just pass the dimensions usr
// the arguments property of function object
AR.Utility.getSingleDimensionData = function(data, dimension) {
    var noOfRecords = data.length;
    var arr = [];
    for (i = 0; i < noOfRecords; i = i + 1) {
        arr.push(data[i][dimension]);
    }
    return arr;
};

AR.Utility.getTwoDimensionData = function(data) {
    var noOfRecords = data.length;
    var arr = [],
        innerArr = [],
        i;
    for (i = 0; i < noOfRecords; i = i + 1) {
        innerArr = [];
        innerArr.push(data[i].x);
        innerArr.push(data[i].y);
        arr.push(innerArr);
    }
    return arr;
};

AR.Utility.getMultiDimensionData = function(data) {
    var noOfRecords = data.length;
    var arr = [],
        innerArr = [],
        i;
    for (i = 0; i < noOfRecords; i = i + 1) {
        innerArr = [];
        innerArr.push(data[i].x);
        innerArr.push(data[i].y);
        innerArr.push(data[i].z);
        arr.push(innerArr);
    }
    return arr;
};

/**
 * Returns the tooltip text. If the JSON sends in the Tooltip text, then it is returned other wise
 * the value becomes the tooltiptext
 * @param data
 * @param index index of the current data obj
 * @returns the tooltip text
 */
AR.Utility.getToolTipText = function(data, index) {
    return (data[index].toolTipText ? data[index].toolTipText : data[index].value);
};

/**
 * The function returns an array of colors in the palette. If the user has changed the palette then
 * It returns the color in the graphDef. Otherwise returns the colors in the preset palette
 * @param graphDef The graph definition JSON
 * @returns {Array} The colors in the palette
 */
AR.Utility.getPaletteColors = function(graphDef) {
    if ("custom" !== graphDef.presetPalette) {
        var colors = AR.Utility.palettes[graphDef.presetPalette];
        return colors;
    } else {
        return graphDef.paletteColors;
    }
};

/**
 * The map for palette name vs colors in the palette
 */
AR.Utility.palettes = {
    "Plain": ["#1F77B4"],
    "Simple": ["#d42f3c", "#85b1e6", "#FD6D16", "#dfe617"],
    "RGB": ["#bb2211", "#2222bb", "#22aa22", "#9999aa", "#223322"],
    "Olive": ["#B4AF91", "#787746", "#40411E", "#32331D"],
    "Soil and Sky": ["#928174", "#AA9788", "#BDE4E9", "#A8E1E9", "#90D1DA"],
    "Candid": ["#EADEA1", "#808355", "#4E493D", "#3A301C", "#3F7696"],
    "Sulphide": ["#949993", "#615952", "#343640", "#A15026", "#C7B091"],
    "New Moon": ["#EEE6AB", "#C5BC8E", "#696758", "#45484B", "#36393B"],
    "Nature": ["#EEEFD8", "#BECD8A", "#73880A", "#CCCC33", "#E2EAA3"],
    "Earth": ["#862424", "#D8D1B4", "#B3AB8E", "#F1F0E9", "#353535"],
    "Sea": ["#334433", "#6699aa", "#88aaaa", "#aacccc", "#447799"],
    "Lemon": ["#eebb00", "#ddaa00", "#eecc00", "#ffee11"],
    "Water": ["#2266bb", "#3388dd", "#55aaee", "#bbddee", "#113355"],
    "Grass": ["#00AF64", "#36D729", "#61D7A4", "#007241"]

};

/**
 * Sets the colors for the <tt>element</tt> with the <tt>colors</tt>
 * @param element the element whose color is to be set
 * @param colors An array of colors of the palette
 */

AR.Utility.setPalette = function(element, colors) {
    element.fillStyle(function() {
        return colors[this.index % colors.length];
    });

};

/**
 * Finds the maximum value from the measure axis
 * @param graphDef the graph defination
 * @returns the maximum value
 */
AR.Utility.findMaxValue = function(graphDef) {
    if (graphDef.dataset) {
        var dataArray = [];
        for (i = 0; i < graphDef.dataset.length; i++) {
            var max = AR.Utility.findMax(graphDef.dataset[i].data);
            var maxMap = {
                "value": max
            };
            dataArray.push(maxMap);
        }
        return AR.Utility.findMax(dataArray);
    } else {
        return AR.Utility.findMax(graphDef.data);
    }
};

/**
 * Sets the properties of the text/label object . It sets properties such as font size, font color, rotation angle
 * @param graphDef The graph definition
 * @param labelObj The object whose properties have to be set
 * @param isHorizontal true if the graph is horizontal, false otherwise
 */
AR.Utility.setLabelProperties = function(graphDef, labelObj, isHorizontal) {
    var self = this;
    var properties = AR.Graph.labelProperties;
    properties.forEach(function(prop) {
        var upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
        AR.Utility["set" + upcasedProp](graphDef[prop], labelObj, graphDef, isHorizontal);
    });
};

/**
 * Sets the size of the <tt>labelObj</tt>.
 * @param size Size in px
 * @param labelObj The label object whose size is to be set
 * @param graphDef The graph Definition
 */
AR.Utility.setLabelFontSize = function(size, labelObj, graphDef) {
    if (labelObj) {
        labelObj.font(AR.Utility.getSize(graphDef, "gridLabels", size) + "px Arial");
    }
};

/**
 * Sets the color of the <tt>labelObj</tt>.
 * @param color The color in hex format
 * @param labelObj The label object whose color is to be set
 */
AR.Utility.setLabelFontColor = function(color, labelObj) {
    if (labelObj) {
        labelObj.textStyle(color);
    }
};

/**
 *  Sets the rotation angle of the <tt>labelObj</tt>.
 * @param angle The angle in degrees
 * @param labelObj The label object whose rotation angle is to be set
 * @param graphDef The graph Definition
 * @param isHorizontal true if the graph is horizontal, false otherwise
 */
AR.Utility.setLabelRotateAngle = function(angle, labelObj, graphDef, isHorizontal) {
    var dummy;
    angle = parseInt(angle, 10);
    if (labelObj) {
        labelObj.textAngle(angle / 180 * Math.PI);
        if (isHorizontal) {
            dummy = angle < 0 ? labelObj.textBaseline("right") : angle === 0 ? labelObj.textBaseline("center") : labelObj.textBaseline("top");
            dummy = (angle === 90 || angle === -90) ? labelObj.textAlign("center") : labelObj.textAlign("right");
        } else {
            dummy = angle < 0 ? labelObj.textAlign("right") : angle === 0 ? labelObj.textAlign("center") : labelObj.textAlign("left");
        }

    }
};
/**
 * Sets the tooltip for the <tt>element</tt> with anchor direction in <tt>direction</tt>
 * @param graphDef the graph definition
 * @param element The object on which the tool tip is to be set
 * @param direction The anchor direction e.g. "s","n", etc.
 */
AR.Utility.setToolTip = function(graphDef, element, direction) {
    if (graphDef.toolTip) {
        element.event("mouseover", pv.Behavior.tipsy({
            gravity: function() {
                return (direction);
            },
            fade: true
        }));
    }
};

/**
 * Create legend and add it to the panel
 * @param panel the panel to which the legends will be added
 * @param index the index of the legend
 * @param text the text for the legend
 * @param color the color of the legend
 * @param graphDef the graph definition
 */
AR.Utility.createLegends = function(panel, index, text, color, graphDef) {
    if (text) {
        var dots = panel.add(pv.Dot).shape("square").top(AR.constants.values.legend.top).fillStyle(color).shapeRadius(AR.Utility.getSize(graphDef, "legend", AR.constants.values.legend.size));
        AR.Utility.setLeftOfLegends(dots, graphDef, index);
        dots.anchor("right").add(pv.Label).text(function() {
            return text;
        }).font(AR.Utility.getSize(graphDef, "gridLabels", AR.constants.values.smallLabels.size) + "px Arial");
    }
};

// TODO the legends are being added to the object. This if any operation is
// performed on the object it will effect the
// legend also. Thus separate out legends.
AR.Utility.addLegendToObject = function(object, data, graphDef) {
    var dots = object.add(pv.Dot).shape("square").top(AR.constants.values.legend.top).shapeRadius(AR.Utility.getSize(graphDef, "legend", AR.constants.values.legend.size));
    AR.Utility.setLeftOfLegends(dots, graphDef);
    dots.anchor("right").add(pv.Label).text(function() {
        return data[this.index].label;
    }).font(AR.Utility.getSize(graphDef, "gridLabels", AR.constants.values.smallLabels.size) + "px Arial");

};

/**
 * Sets the left property of the legent object
 * @param dots the legend object
 * @param graphDef the graph definition
 * @param index the index of the legend
 */
AR.Utility.setLeftOfLegends = function(dots, graphDef, index) {
    var width = graphDef.width;
    // value is kept assuming that maximum no. of legends is numberOfLegends
    var n = width / AR.constants.values.legend.numberOfLegends;
    dots.left(function() {
        var l = (index || this.index) * n;
        //    TODO: write the condition if the left of legend is more than the width move it to next line. Not working when tried to implement
        //        if(l>=width-40){
        //            this.top(this.top()-10);
        //        }
        return l;
    });
};

/**
 * @Description The top-level aurora constants namespace. All constants
 * are within this namespace
 * @namespace The top-level aurora constants namespace, <tt>AR.constants</tt>.
 */
AR.constants = {};

/**
 * Some constant values
 */
AR.constants.values = {
    legend: {
        top: -20,
        size: 15,
        numberOfLegends: 6
    },
    smallLabels: {
        size: 15
    }
};

/**
 *    The scale for the different objects in the chart. This is useful whene the chart is resized. So the
 * elements on the chart are resized according to it
 */
AR.constants.scale = {
    caption: 1 / (240000),
    gridLabels: 1 / (400000),
    wedge: 1 / 240000,
    legend: 1 / 1000000,
    mapDot: 1 / 10
};
/**
 * Calculates the size of the <tt>element</tt> with respect to the height and width of the graph and the actual <tt>value</tt>
 * @param graphDef the graph definition
 * @param element the element whose height is required
 * @param value The value set by the user
 * @returns {Number} The size of the <tt>element</tt>
 */
AR.Utility.getSize = function(graphDef, element, value) {
    return AR.constants.scale[element] * value * graphDef.height * graphDef.width;
};