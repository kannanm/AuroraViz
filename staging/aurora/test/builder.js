

/**
 * @author : koushikr
 * The parser takes data and properties from the webPage, constructs the JSON Object and throws for it rendering. 
 * Every value if not applicable can be NULL.
 * The following jsonData shows the jsonStructure that would be built with respect to the input from the Users.
 * The JSON might have to be modified, depending on the specs time and again and consequently the parser will also have to be modified.
*/

graphDef : {
	canvas : {
		"height" : 100,
		"width"  : 100,
		"palette" : "1"
	},
	
	grid : {
		"horizontal" : "yes",
		"vertical" 	 : "yes"
	},
	
	chart : {
		 "caption"	:	"Top5SalesPerson",
		 "yAxisName":	"Names",
         "xAxisName":	"SalesFigure",
         "toolTip"	:	1,
         "Color" : [] 
	},
	
	"data" : {
		"type" 	:   "bar",
		"showLables" : "1",
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	}
	
	"data" : {
		"type" 	:   "line",
		"lineStyle":"step",
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	}

	"data" : {
		"type" 	:   "pie",
		"showValues":1,
		"showLabels":1,
		"Radius" : "5", 
		"angle" : "5", 
		"startAngle" : "5", 
		"endAngle" : "5", 
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	}
	
	"data" : {
		"type" 	:   "scatter",
		"series":[
				{
					"values":[[1,2,4], [2,3,6]],
					"label":"Item 0"
				},
				{
					"values":[[1,2,4], [2,3,6]],
					"label":"Item 1"
				}
		   ]
	}
	
	"data" : {
		"type" 	:   "donut",
		"showValues":1,
		"showLabels":1,
		"innerRadius" : "5", 
		"outerRadius" : "5", 
		"angle" : "5", 
		"startAngle" : "5", 
		"endAngle" : "5", 
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	}

	"data" : {
		"type" 	:   "area",
		"areaSegemented":true,
		"areaInterpolate":false,
		"series":[
				{
					"values":[[1,2], [2,3]],
					"label":"Item 0"
				},
				{
					"values":[[2,4], [3,6]],
					"label":"Item 1"
				}
		   ]
	}	 
};

/**
 * @author : koushikr
 * The below two methods are written inorder to tidy the JSON. 
 * Tidying is helpful, if you want to display the stringifed JSON on your webPage in a proper JSON format. 
 * The above two methods are utility methods I've written, these have got nothing to with the data, so mustn't be changed, unless you want to change the format in which your JSON should appear
 * */
FormatJSON = function (oData, sIndent) {
    if (arguments.length < 2) {
        var sIndent = "";
    }
    var sIndentStyle = "    ";
    var sDataType = RealTypeOf(oData);

    // open object
    if (sDataType == "array") {
        if (oData.length == 0) {
            return "[]";
        }
        var sHTML = "[";
    } else {
        var iCount = 0;
        $.each(oData, function() {
            iCount++;
            return;
        });
        if (iCount == 0) { // object is empty
            return "{}";
        }
        var sHTML = "{";
    }
    
    /**
     * Attempting to iterate through items and putting 'em in place
    **/
    var iCount = 0;
    $.each(oData, function(sKey, vValue) {
        if (iCount > 0) {
            sHTML += ",";
        }
        if (sDataType == "array") {
            sHTML += ("\n" + sIndent + sIndentStyle);
        } else {
            sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey + "\"" + ": ");
        }
        // display relevant data type
        switch (RealTypeOf(vValue)) {
            case "array":
            case "object":
                sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
                break;
            case "boolean":
            case "number":
                sHTML += vValue.toString();
                break;
            case "null":
                sHTML += "null";
                break;
            case "string":
                sHTML += ("\"" + vValue + "\"");
                break;
            default:
                sHTML += ("TYPEOF: " + typeof(vValue));
        }
        // loop ends here.. 
        iCount++;
    });
    // close object
    if (sDataType == "array") {
        sHTML += ("\n" + sIndent + "]");
    } else {
        sHTML += ("\n" + sIndent + "}");
    }
    // return the String sHTML, this will be formatted JSON.
    return sHTML;
}

RealTypeOf = function(v) {
  if (typeof(v) == "object") {
    if (v === null) return "null";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof(v);
}
/* End of JSON tidier */
