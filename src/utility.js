/** @authors : Aditya Gaur, koushikr */

AR.Utility = {};
/**
 * Finds the maximum value in the data sent for the graph creation.
 *
 * @param {object}
 *            [graphDef] An object containing the graph properties and the data
 */
AR.Utility.scale = {
    "linear": "linear",
    "ordinal": "ordinal",
    "log": "log"
};

AR.Utility.getKeys = Object.keys || function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [ 
            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }   
        }

        return result;
    };
};

AR.Utility.isArray= function(a){
	return (Object.prototype.toString.apply(a) === '[object Array]');
};

AR.Utility.isNumber = function(value) { 
	return value.toFixed && value.toExponential; 
};

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
    var len = data.length;
    for (i = 0; i < len; i++) {
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
AR.Utility.getToolTipText = function(data, index) {
    return (data[index].toolTipText ? data[index].toolTipText : data[index].value);
};

AR.Utility.getPaletteColors = function(graphDef) {
    if ("custom" !== graphDef.presetPalette) {
        var colors = AR.Utility.palettes[graphDef.presetPalette];
        return colors;
    } else {
        return graphDef.paletteColors;
    }
};
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
// TODO create your own palette
AR.Utility.setPalette = function(element, colors) {
    element.fillStyle(function() {
        return colors[this.index % colors.length];
    });
};

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
AR.Utility.setLabelProperties = function(graphDef, labelObj, isHorizontal) {
    var self = this;
    var properties = AR.Graph.labelProperties;
    properties.forEach(function(prop) {
        var upcasedProp = prop.substring(0, 1).toUpperCase() + prop.substring(1);
        AR.Utility["set" + upcasedProp](graphDef[prop], labelObj, graphDef, isHorizontal);
    });
};

AR.Utility.setLabelFontSize = function(size, labelObj, graphDef) {
    if (labelObj) {
        labelObj.font(AR.Utility.getSize(graphDef,"gridLabels",size) + "px Arial");
    }
};
AR.Utility.setLabelFontColor = function(color, labelObj, graphDef) {
    if (labelObj) {
        labelObj.textStyle(color);
    }
};
AR.Utility.setLabelRotateAngle = function(angle, labelObj,graphDef, isHorizontal) {
    angle = parseInt(angle, 10);
    if (labelObj) {
        labelObj.textAngle(angle / 180 * Math.PI);
        if (isHorizontal) {
            angle < 0 ? labelObj.textBaseline("right") : angle === 0 ? labelObj.textBaseline("center") : labelObj.textBaseline("top");
            (angle === 90 || angle === -90) ? labelObj.textAlign("center") : labelObj.textAlign("right");
        } else {
            angle < 0 ? labelObj.textAlign("right") : angle === 0 ? labelObj.textAlign("center") : labelObj.textAlign("left");
        }

    }
};
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

AR.Utility.createLegends = function(panel, index, text, color,graphDef) {
    if (text) {
        var dots = panel.add(pv.Dot).shape("square").top(AR.constants.values.legend.top)
        				.fillStyle(color)
        				.shapeRadius(AR.Utility.getSize(graphDef,"legend",AR.constants.values.legend.size));
        AR.Utility.setLeftOfLegends(dots,graphDef,index);
        dots.anchor("right").add(pv.Label).text(function() {
            return text;
        }).font(AR.Utility.getSize(graphDef,"gridLabels",AR.constants.values.smallLabels.size) + "px Arial");
    }
};

// TODO the legends are being added to the object. This if any operation is
// performed on the object it will effect the
// legend also. Thus separate out legends.
AR.Utility.addLegendToObject = function(object, data, graphDef) {
    var dots = object.add(pv.Dot).shape("square").top(AR.constants.values.legend.top)
    				 .shapeRadius(AR.Utility.getSize(graphDef,"legend",AR.constants.values.legend.size));
   AR.Utility.setLeftOfLegends(dots,graphDef);
   dots.anchor("right").add(pv.Label).text(function(d) {
   		var categoryAxis = graphDef.categoryAxis[0];
        return d[categoryAxis];
    }).font(AR.Utility.getSize(graphDef,"gridLabels",AR.constants.values.smallLabels.size) + "px Arial");

};
AR.Utility.setLeftOfLegends = function(dots, graphDef,index){
	var width = graphDef.width;
	// value is kept assuming that maximum no. of legends is numberOfLegends
	var n = width/AR.constants.values.legend.numberOfLegends;  
	dots.left(function(){
		var l = (index || this.index) * n;
//	TODO: write the condition if the left of legend is more than the width move it to next line. Not working when tried to implement
//		if(l>=width-40){
//			this.top(this.top()-10);
//		}
		return l;
	});
};
AR.constants = {};
AR.constants.values = {
		legend:{
			top:-20,
			size:15,
			numberOfLegends: 6
		},
		smallLabels :{
			size:15
		}
};
AR.constants.scale ={
	caption:1/(240000),
	gridLabels:1/(400000),
	wedge:1/240000,
	legend:1/1000000,
	mapDot:1/10
};
AR.Utility.getSize = function(graphDef,element,value){
	return AR.constants.scale[element]*value*graphDef.height*graphDef.width;
};

/**
* @class It is a Utilty Class used to look the data as a table with columns and rows.
* It also provides functions to access data.
*
* @param {Array}
* columnNames It is an array consisting of the names of the columns
* @param {Array}
* data It is an array containing the data for the table. It can either be an array of arrays or array of objects
* @param {boolean}
* isJson a boolean field representing if the data is array of arrays or array of Objects
*/

AR.Utility.Table = function (columnNames, data, isJson) {
 this.columnNames = columnNames;
 this._data = data;
 this._isAA = ! isJson;
};

/**
* Returns the data value based on the rowIndex and the column name
* @param {Number} rowIndex
* This is the index of the row from where the data is to be accessed
* @param {String} columnName
* This is the name of the column from where the data is to be accessed
* @returns {Number} The data value
*/

AR.Utility.Table.prototype.dataValue = function (rowIndex, columnName) {
 var row = this._data[rowIndex];
 if(this._isAA){
  var colIndex = this.columnNames.indexOf(columnName);
  return row[colIndex];
 }else{
  return row[columnName];
 }
};

/**
* Returns the data value based on the rowIndex and the column index
* @param {Number} rowIndex
* This is the index of the row from where the data is to be accessed
* @param {Number} colIndex
* This is the index of the column from where the data is to be accessed
* @returns {Number} The data value
*/

AR.Utility.Table.prototype.dataValueByRowAndColIndex = function (rowIndex, colIndex) {
 if(this._isAA){
  return this._data[rowIndex][colIndex];
 }else{
  return this._data[rowIndex][this.columnNames[colIndex]];
 }

};

/**
* Returns the row based on the row index
* @param {Number} rowIndex
* This is the index of the row
* @returns {Array} The row
*/
AR.Utility.Table.prototype.row = function (rowIndex) {
 return this._data[rowIndex];
};

/**
* Returns size of the data
* @returns {Number} The size of the data
*
*/
AR.Utility.Table.prototype.getLength = function () {
 return this._data.length;
};

/**
* Checks if <tt>dataObj</tt> is an array of arrays or array of Objects.
* @param {Array} dataObj
* Data for the chart
* @returns {boolean} true if the its an array of objects, false otherwise
*/
AR.Utility.checkIfJSON = function(dataObj){
	if(dataObj.length>0){
		return ("object" === typeof dataObj[0]);	
	}
	
};

/**
 * Returns the column names if <tt>dataObj</tt> is array of Objects
 * @param {Array} dataObj
 * 		 	data for the chart
 * @return {Array} 
 * 			Array of column names
 */
AR.Utility.getColNames = function(dataObj){
	var colNames = [],
		prop,
		row = dataObj[0];
	for(prop in row){
		if(row.hasOwnProperty(prop)){
			colNames.push(prop);
		}
	}
	return colNames; 	
};
AR.Utility.removeCommaFromNumber = function(num){
	if(typeof num === "string"){
		return num.replace(/\,/g,'');	
	}
  return num;
	
}
AR.Utility.findMaxVal= function(dataTable, fields){
	var max,
		dataLen = dataTable.getLength(),
		noOfFields = fields.length,
		i,j,curVal;
	curVal = dataTable.dataValue(0,fields[0]);
	curVal = AR.Utility.removeCommaFromNumber(curVal);
	max = parseFloat(curVal);
	for(i=0;i<dataLen;i++){
		for(j=0;j<noOfFields;j++){
			curVal = dataTable.dataValue(i,fields[j]);
			curVal = AR.Utility.removeCommaFromNumber(curVal);
			curVal = parseFloat(curVal);
			if(max<curVal){
				max = curVal;
			}
		}
	}
	return max;
}
	