
/**
 * @author : koushikr
 * The parser takes data and properties from the webPage, constructs the JSON Object and throws for it rendering. 
 * Every value if not applicable can be NULL.
 * The following jsonData shows the jsonStructure that would be built with respect to the input from the Users.
 * The JSON might have to be modified, depending on the specs time and again and consequently the parser will also have to be modified.
*/

var jsonData = {
    "chartType":"Bar",
    "barType":"v",
    "caption":"Top5SalesPerson",
    "yAxisName":"Names",
    "xAxisName":"SalesFigure",
    "width":500,
    "height":500,
    "palette":1,
    "showValues":1,
    "showLabels":1,
    "toolTip":1,
    "borderColor":"red",
    "grid":"yes",
    "innerRadius":null,
    "outerRadius":null,
    "angle":null,
    "startAngle":null,
    "endAngle":null,
    "lineStyle":"step",
    "areaSegemented":true,
    "areaInterpolate":false,
    "root":"Aurora",
    "margin":"n",
    "data":[{
            "label":"data1",
            "value":15
        },
        {
            "label":"data2",
            "value":3
        },
        {
            "label":"data3",
            "value":2
        },
        {
            "label":"data4",
            "value":3
        },
        {
            "label":"data5",
            "value":3
        }
    ],
    "dataset":[{
            "data":[{
                    "label":"1data",
                    "value":15,
                    "toolTipText":"label: 1data, value: 15"
                },
                {
                    "label":"2data",
                    "value":3
                },
                {
                    "label":"3data",
                    "value":2
                }
            ]
        },
        {
            "data":[{
                    "label":"1data",
                    "value":10,
                    "toolTipText":"label: 1data, value: 10"
                },
                {
                    "label":"2data",
                    "value":5
                },
                {
                    "label":"3data",
                    "value":6
                }
            ]
        }
    ],
    "areaData":[{
            "x":3,
            "y":1.3
        },
        {
            "x":2,
            "y":4
        },
        {
            "x":2,
            "y":1
        },
        {
            "x":3,
            "y":1.5
        },
        {
            "x":3,
            "y":1.3
        }
    ],
    "scatterData":[{
            "x":30,
            "y":1.3,
            "z":116,
            "toolTipText":"Traders"
        },
        {
            "x":32,
            "y":3.5,
            "z":99,
            "toolTipText":"Farmers"
        },
        {
            "x":8,
            "y":2.1,
            "z":33,
            "toolTipText":"Individuals"
        },
        {
            "x":62,
            "y":2.5,
            "z":72,
            "toolTipText":"MediumBusinessHouses"
        },
        {
            "x":78,
            "y":2.3,
            "z":55,
            "toolTipText":"CorporateGroupA"
        }
    ],
    "treeData":{
        "PramatiTechnologies":{
            "productiondepartment":"100",
            "researchdepartment":"100",
            "qualityengineering":"100",
            "algorithms":"100",
            "pramatilabs":"100"
        },
        "ImagineaTechnologies":{
            "PlatformDevelopment":"100",
            "CommunityDevelopment":"100",
            "ResearchonTools":"100",
            "SocialComputing":"100"
        },
        "SocialTwist":{
            "SocialComputing":"100",
            "TellaFriend":"100",
            "SocialResearch":"100"
        },
        "Qontext":{
            "CommunityBuilding":"100",
            "KnowledgeManagement":"100"
        }
    }
};

/* AP is the parserNameSpace*/

AP = {};
/**
 * @author : koushikr
 * The below two methods are written inorder to tidy the JSON. 
 * Tidying is helpful, if you want to display the stringifed JSON on your webPage in a proper JSON format. 
 * The above two methods are utility methods I've written, these have got nothing to with the data, so mustn't be changed, unless you want to change the format in which your JSON should appear
 * */
AP.FormatJSON = function (oData, sIndent) {
    if (arguments.length < 2) {
        var sIndent = "";
    }
    var sIndentStyle = "    ";
    var sDataType = AP.RealTypeOf(oData);

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

AP.RealTypeOf = function(v) {
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

/**
 * There have gotta be methods that take values from the UI and fill up the JSON.
 **/

/**
 * The following method is to set the value of a JSON Object
 * Eg : setData("key1", "updated value1"); // data.key1 == "updated value1"
		setData("key2.nested", 99); // data.key2.nested == 99
 * @params : key, value
 * Usage
 * ==========
 *  1) outside (non-recursive) call, use "data" as our base object
 *  2) split the key by the dots
 *  3) only one part (no dots) in key, just set value
 *  4) create our "new" base obj if it doesn't exist
 *  5) Remove the new "base" obj from string array, and hold actual object for recursive call
 *  6) Join the remaining parts back up with dots, and recursively set data on our new "base" obj
 **/
 
AP.setData = function(key,val,obj) {
  if (!obj) obj = data; 
  var ka = key.split(/\./); 
  if (ka.length < 2) { 
    obj[ka[0]] = val; 
  } else {
    if (!obj[ka[0]]) obj[ka[0]] = {};
    obj = obj[ka.shift()]; 
    setData(ka.join("."),val,obj);   }    
};

/**
 * This builds the dataElement for Conventional Unidimensional Graphs
 */  
AP.buildData = function(categoryList, valueList, toolTipList){
	var jsonObj = [];
	if(categoryList.length == valueList.length){
		for(var i=0; i < categoryList.length; i++){
			if(toolTipList[i] != null){
				jsonObj.push({label: categoryList[i], value: valueList[i], toolTipText: toolTipList[i]});
			}else{
				jsonObj.push({label: categoryList[i], value: valueList[i]});
			}
		}
		return jsonObj;
	}else{
		return -1; // A return -1 would indicate that the data hasn't been provided for all the categories. 
	}
};

/**
 * This builds the data for the AreaGraph
 */  
AP.buildAreaData = function(xAxisList, yAxisList){
	var jsonObj = [];
	if(xAxisList.length == yAxisList.length){
		for(var i=0; i < xAxisList.length; i++){
				jsonObj.push({x: xAxisList[i], y: yAxisList[i]});
		}
		return jsonObj;
	}else{
		return -1; // A return -1 would indicate that the data hasn't been provided for all the categories. 
	}
};

/**
 * This builds the data for the scatterGraph
 */  
AP.buildScatterData = function(xAxisList, yAxisList, zAxisList, toolTipList){
	var jsonObj = [];
	var defaultScatterSize = 50;
	if(xAxisList.length == yAxisList.length){
		for(var i=0; i < xAxisList.length; i++){
			if(zAxisList[i] != null){
				if(toolTipList[i] != null){
					jsonObj.push({x: xAxisList[i], y: yAxisList[i], z: zAxisList[i], toolTipText: toolTipList[i]});
				}else{
					jsonObj.push({x: xAxisList[i], y: yAxisList[i], z: zAxisList[i]});
				}
			}else{
				if(toolTipList[i] != null){
					jsonObj.push({x: xAxisList[i], y: yAxisList[i], z: defaultScatterSize, toolTipText: toolTipList[i]});
				}else{
					jsonObj.push({x: xAxisList[i], y: yAxisList[i], z: defaultScatterSize});
				}
			}
		}
		return jsonObj;
	}else{
		return -1; // A return -1 would indicate that the data hasn't been provided for all the categories. 
	}
};

/**
 * This builds the data for the TreeGraph
 */  
AP.buildTreeData = function(parentNode, childNodeList, childNodeValues){
	var startJSONData;
	if(startJSONData == " "){
			startJSONData = "{";
	}else{
		startJSONData = parentNode+":{";
	}
	for(var i=0; i<childNodeList.length; i++){
		if(childNodeList[i].length > 1){
			AP.buildTreeData(childNodeList[i][0], childNodeList[i], childNodeValues[i]); 
		}else{
			if(childNodeValues[i] == null){
				childNodeValues[i] = 0;
			}
			startJSONData = startJSONData+"{"+childNodeList[i]+":"+" "+childNodeValues[i] +"}";
		}
	}
	startJSONData = startJSONData+"}";
	
	return startJSONData;
};



/**
 * =================================================================================================
 * ================================ APIs from this Parser ==========================================
 * ==================================================================================================
 * **/
 
 /**
 * This is the API that will be exposed to an external js to build the JSON structure for conventional graphs
 * Unidimension or MultiLine however! 
 */ 
AP.populateSimpleJSONData = function(categoryList, dataList, dataToolTipList){
		var data = [];
		for(var i=0; i<dataList.length; i++){
			var roundData = AR.buildData(categoryList, dataList[i], dataToolTipList[i]);
			if(roundData == -1){
				return -1; // The data entered is not proper. No. of Categories and Data elements might not be matching
			}else{
				data.push(roundData);
			}
		}
		return data;
};


/**
 * This is the API that will exposed to an external js to build the JSON structure for Area graphs
 * Unidimension or MultiLine however! 
 */ 
AP.populateAreaJSONData = function(xAxisList, yAxisList){
		var data = [];
		if(xAxisList.length != yAxisList.length){
			return -1; // The length of the series values are not same. 
		}
		for(var i=0; i<xAxisList.length; i++){
			var roundData = AP.buildAreaData(xAxisList[i], yAxisList[i]);
			if(roundData == -1){
				return -1; // The data entered is not proper. No. of Categories and Data elements might not be matching
			}else{
				data.push(roundData);
			}
		}
		return data;
};

/**
 * This is the API that will exposed to an external js to build the JSON structure for Scatter graphs
 * Unidimension or MultiLine however! 
 */ 
AP.populateScatterJSONData = function(xAxisList, yAxisList, zAxisList, dataToolTipList){
		var data = [];
		if(xAxisList.length != yAxisList.length){
			return -1; // The length of the series values are not same. 
		}
		for(var i=0; i<xAxisList.length; i++){
			var roundData = AP.buildScatterData(xAxisList[i], yAxisList[i], zAxisList[i], dataToolTipList[i]);
			if(roundData == -1){
				return -1; // The data entered is not proper. No. of Categories and Data elements might not be matching
			}else{
				data.push(roundData);
			}
		}
		return data;
};
