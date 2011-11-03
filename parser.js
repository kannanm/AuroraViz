
/**
 * @author : koushikr
 * The parser takes data and properties from the webPage, constructs the JSON Object and throws for it rendering. 
 * Every value if not applicable can be NULL.
 * The following jsonData shows the jsonStructure that would be built with respect to the input from the Users.
 * The JSON might have to be modified, depending on the specs time and again and consequently the parser will also have to be modified.
*/

var jsonData = {
	"chartType" : "Bar", // chartType could be Bar/Pie/Line (data) mBar/mPie/mLine/(dataset)  Area/(areaData) Bubble/(scatterData)  nodeLink/SuBurst (treeData)
	"barType"   : "v", // Vertical or Horizontal
    "caption": "Top 5 Sales Person", // Title of the Chart
    "yAxisName": "Names", // Y Axis Name
	"xAxisName": "Sales Figure", // X Axis Name
    "width": 500, // Panel Height
    "height": 500, // Panel Width
	"palette": 1, // Needs a Palette. If 0 default colours
	"showValues" : 1, // Show Values on the Graph, Axis Values
	"showLabels" : 1, // Show Labels on the Graph
	"toolTip": 1, // Show Tooltip
	"borderColor": "red", // Plot the canvas border Color
	"grid" : "yes", // For data grid
	"innerRadius" : null, // For Pie/Donut Graphs
	"outerRadius" : null, // For Pie/Donut Graphs
	"angle" : null, // For Pie/Donut Graphs
	"startAngle" : null, // For Pie/Donut Graphs
	"endAngle" : null, // For Pie/Donut Graphs
	"lineStyle" : "step", // If Step, step graph is plot or otherwise normal Graph
	"areaSegemented" : true, // By default segmented is true, can be set to false as well - Area Specific
	"areaInterpolate" : false, // By default interpolate is false, can be set to true as well - Area Specific
	"root" : "Aurora", // This is for the tree graph - Represents the root of the tree.. 
	"margin" : "n", //  This is for the tree graph again, the margin is by default set to n and for now, you can't change it. 
   
   // data is for bar/line/pie graphs. For other graphs this will be null... 
    "data": [{
        "label": "data1",
        "value": 15
	},
    {
        "label": "data2",
        "value": 3
	},
    {
        "label": "data3",
        "value": 2
	},
    {
        "label": "data4",
        "value": 3
	},

    {
        "label": "data5",
        "value": 3
	}
	], 
	
	// Dataset is for multi bar, multi line graphs, for other graphs this will be null.. 
	"dataset" : [
		{
			"data": [{
			"label": "1data",
			"value": 15,
			"toolTipText": "label:1data, value:15" // If you don't mention the toolTipText your default toolTipText is the Label.
			}, {
			"label": "2data",
			"value": 3
			}, {
			"label": "3data",
			"value": 2
			} ]
	},
	
	{
			"data": [{
			"label": "1data",
			"value": 10,
			"toolTipText": "label:1data, value:10"
			}, {
			"label": "2data",
			"value": 5
			}, {
			"label": "3data",
			"value": 6
			} ]
	}
	],
	
	// "Area Graph Data"
	"areaData": [{
			"x": 3,
			"y": 1.3
	},
    {
			"x": 2,
			"y": 4
	},
    {
			"x": 2,
			"y": 1.0
	},
    {
			"x": 3,
			"y": 1.5
	},

    {
			"x": 3,
			"y": 1.3
	}
	],
	
	// "Bubble GraphData"
	"scatterData" : [
                {
                    "x": 30,
                    "y": 1.3,
                    "z": 116,
                    "toolTipText": "Traders"
                },
                {
                    "x": 32,
                    "y": 3.5,
                    "z": 99,
                    "toolTipText": "Farmers"
                },
                {
                    "x": 8,
                    "y": 2.1,
                    "z": 33,
                    "toolTipText": "Individuals"
                },
                {
                    "x": 62,
                    "y": 2.5,
                    "z": 72,
                    "toolTipText": "Medium Business Houses"
                },
                {
                    "x": 78,
                    "y": 2.3,
                    "z": 55,
                    "toolTipText": "Corporate Group A"
                }
            ],
     
     // "treeGraphData"
     "treeData":{
        "Pramati Technologies":{
            "production department": "100",
            "research department": "100",
            "quality engineering": "100",
            "algorithms": "100",
            "pramati labs": "100"
        },
        "Imaginea Technologies":{
			"Platform Development": "100",
            "Community Development": "100",
            "Research on Tools": "100",
            "Social Computing": "100"
        },
        "Social Twist":{
            "Social Computing":"100",
            "Tell a Friend":"100",
            "Social Research":"100"
        },
        "Qontext":{
            "Community Building":"100",
            "Knowledge Management":"100"
        }
    } 
};


/**
 * @author : koushikr
 * The below two methods are written inorder to tidy the JSON. 
 * Tidying is helpful, if you want to display the stringifed JSON on your webPage in a proper JSON format. 
 * The above two methods are utility methods I've written, these have got nothing to with the data, so mustn't be changed, unless you want to change the format in which your JSON should appear
 * */
function FormatJSON(oData, sIndent) {
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
    // loop through items
   
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

        // loop
        iCount++;
    });

    // close object
    if (sDataType == "array") {
        sHTML += ("\n" + sIndent + "]");
    } else {
        sHTML += ("\n" + sIndent + "}");
    }

    // return
    return sHTML;
}

function RealTypeOf(v) {
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



