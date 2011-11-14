var barLineGraph = {
    "caption": "Top 5 Sales Person",
    "yAxisName": "Names",
	"xAxisName": "Sales Figure",
    "width": 500,
    "height": 500,
	"palette": 1,
	"type":"h",
	"grid" : "y",
	"toolTip" : 1,
    "data": [
	{
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
        "value": 3},

    {
        "label": "data5",
        "value": 3
	}
	]
};

var pieDonutGraph = {
    "caption": "Top 5 Sales Person",
    "width": 500,
    "height": 500,
	"palette": 1,
	"showValues" : 1,
	"showLabels" : 1,
	"innerRadius" : null,
	"outerRadius" : null,
	"angle" : null,
	"grid" : "y",
	"toolTip" : 1,
	"wedgeType" : "pie",
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
	]
};

var scatterGraph = {
     "caption": "Top 5 Sales Person",
    "width": 500,
    "height": 500,
	"palette": 1,
	"toolTip": 1,
	"fillColor": "silver",
 	"xAxisName": "Stickiness",
    "yAxisName": "Cost Per Service",
    "data": [
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
            ]
};

var areaGraph = {
    "caption": "Area covered by Sales Persons",
    "yAxisName": "Names",
	"xAxisName": "Sales Figure",
	"toolTip": 1,
    "width": 500,
    "height": 500,
	"palette": 1,
	"grid" : "y",
	 "data": [{
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
	]
};

var multiBarGraph = {
    "caption": "Business Revenue",
    "yAxisName": "Revenue",
	"xAxisName": "Year",
    "width": 500,
    "height": 500,
	 "type": "v",
	 "grid" : "y",
	 "toolTip" : 1,
    "dataset": [
        {
            "seriesname": "2004",
            "color": "FDC12E",
            "data": [
                {
                    "value": "124"
                },
                {
                    "value": "247"
                },
                {
                    "value": "156"
                }
            ]
        },
        {
            "seriesname": "2005",
            "color": "333333",
            "data": [
                {
                    "value": "156"
                },
                {
                    "value": "277"
                },
                {
                    "value": "123"
                }
            ]
        }
    ]

};

var multiLineGraph = {
    "caption": "Multi Line Graph",
    "yAxisName": "Names",
	"xAxisName": "Sales Figure",
	"toolTip": 1,
    "width": 500,
    "height": 500,
	"palette": 1,
	"toolTip" : 1,
	"grid" : "y",
	"style": "step",
	 "dataset" : [
		{
			"data": [{
			"label": "1data",
			"value": 15,
			"toolTipText": "label:1data, value:15"
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
	 ]
};

var treeGraph = {
    "caption": "Tree and Node Graph",
	"toolTip": 1,
    "width": 500,
    "height": 500,
	"palette": 1,
	"grid" : "y",
	"root" : "Pramati",
	"margin" : "n",
	"orient" : "radial",
	"data":{
        "Pramati":[
								"production department",	
								"research department",
								"quality engineering",
								"algorithms",	
								"pramati labs"],
        "Imaginea":[
								"Platform Development",
								"Community Development",
								"Research on Tools",
								"Social Computing"
        ],
        "SocialTwist":[
								"Social Computing",
								"Tell a Friend",
								"Social Research"
        ],
        "Qontext":[
								"Community Building",
								"Knowledge Management"
        ]
    }
};

//=================================================================================================
//=================================================================================================
//===================================== SAMPLE JSON ================================================
var jsonSample = {
	"canvas" : {
		"height" : 100,
		"width"  : 100,
		"palette" : 1,
		"grid" : "y"
	},	
	"chart" : {
		 "caption"	:	"Top5SalesPerson",
		 "yAxisName":	"Names",
      		  "xAxisName":	"SalesFigure",
       		 "toolTip"	:	1,
       		  "Color" : ["FFFFFF", "EFEFEF"] 
	},
	
	"bardata" : {
		"type" 	:   "bar",
		"align" : "h",
		"showLables" : "1",
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":["Item 0", "Item 1"]
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":["Item 0", "Item 1"]
				}
		   ]
	},
	
	"linedata" : {
		"type" 	:   "line",
		"lineStyle":"step",
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":["Item 0", "Item 1"]
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":["Item 0", "Item 1"]
				}
		   ]
	},

	"piedata" : {
		"type" 	:   "pie",
		"showValues":1,
		"showLabels":1,
		"outerRadius" : "5", 
		"angle" : "5", 
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":["Item 0", "Item 1"]
				}
		   ]
	},
	
	"scatterdata" : {
		"type" 	:   "scatter",
		"fillColor": "silver"
		"series":[
				{
					"values":[[1,2,4], [2,3,6]],
					"label":["Item 0", "Item 1"]
				},
				{
					"values":[[1,2,4], [2,3,6]],
					"label":["Item 0", "Item 1"]
				}
		   ]
	},
	
	"donutdata" : {
		"type" 	:   "donut",
		"showValues":1,
		"showLabels":1,
		"innerRadius" : "5", 
		"outerRadius" : "5", 
		"angle" : "5", 
		"series":[
				{
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":["Item 0", "Item 1"]
				}
		   ]
	},

	"areadata" : {
		"type" 	:   "area",
		"areaSegemented":true,
		"areaInterpolate":false,
		"series":[
				{
					"values":[[1,2], [2,3]],
					"label":["Item 0", "Item 1"]
				},
				{
					"values":[[2,4], [3,6]],
					"label":["Item 0", "Item 1"]
				}
		   ]
	}
	 
};
//==================================================================================================
//===================================================================================================
//====================================================================================================
setData = function(key,val,obj) {
  if (!obj) obj = data; 
  var ka = key.split(/\./); 
  if (ka.length < 2) { 
    obj[ka[0]] = val; 
  } else {
    if (!obj[ka[0]]) obj[ka[0]] = {};
    obj = obj[ka.shift()]; 
    setData(ka.join("."),val,obj);   }    
};
//=========================================================================================================
//=========================================================================================================
//=========================================================================================================
populateJSON = function(jsonSample){
	if(jsonSample.data.type == "bar"){
		if(jsonSample.data.series.length > 1){
			return getBarData(jsonSample)
		}else{
			return getmultiBarData(jsonSample);
		}
	}
	if(jsonSample.data.type == "line"){
		if(jsonSample.data.series.length > 1){
			return getLineData(jsonSample);
		}else{
			return getmultiLineData(jsonSample);
		}
	}
	if(jsonSample.data.type == "pie" || jsonSample.data.type == "donut"){
		return getPieDonutData(jsonSample);
	}
	if(jsonSample.data.type == "scatter"){
		return getScatterData(jsonSample);
	}
	if(jsonSample.data.type == "area"){
		return getareaData(jsonSample);
	}
};
getBarData = function(jsonSample){
	barLineGraph.height = jsonSample.canvas.height;
	barLineGraph.width = jsonSample.canvas.width;
	barLineGraph.caption = jsonSample.chart.caption;
	barLineGraph.xAxisName = jsonSample.chart.xAxisName;
	barLineGraph.yAxisName = jsonSample.chart.yAxisName;
	barLineGraph.palette = jsonSample.canvas.palette;
	barLineGraph.grid = jsonSample.canvas.grid;
	barLineGraph.toolTip = jsonSample.chart.toolTip;
	if(jsonSample.bardata.align)
		barLineGraph.type = jsonSample.bardata.align;
	if(jsonSample.bardata.showLabels)
		barLineGraph.showLabels = jsonSample.bardata.showLabels;
	var data = [];
	for(var i=0; i < jsonSample.bardata.series.values.length; i++){
		data.push({label : jsonSample.bardata.series[0].label[i], value : jsonSample.bardata.series[0].values[i]});
	}
	barLineGraph.data = data;
	return barLineGraph;
};

getLineData = function(jsonSample){
	barLineGraph.height = jsonSample.canvas.height;
	barLineGraph.width = jsonSample.canvas.width;
	barLineGraph.caption = jsonSample.chart.caption;
	barLineGraph.xAxisName = jsonSample.chart.xAxisName;
	barLineGraph.yAxisName = jsonSample.chart.yAxisName;
	barLineGraph.palette = jsonSample.canvas.palette;
	barLineGraph.grid = jsonSample.canvas.grid;
	if(jsonSample.linedata.lineStyle)
		barLineGraph.style = jsonSample.linedata.lineStyle;
	barLineGraph.toolTip = jsonSample.chart.toolTip;
	var data = [];
	for(var i=0; i < jsonSample.linedata.series.values.length; i++){
		data.push({label : jsonSample.linedata.series[0].label[i], value : jsonSample.linedata.series[0].values[i]});
	}
	barLineGraph.data = data;
	return barLineGraph;
};

getPieDonutData = function(jsonSample){
	pieDonutGraph.height = jsonSample.canvas.height;
	pieDonutGraph.width = jsonSample.canvas.width;
	pieDonutGraph.caption = jsonSample.chart.caption;
	pieDonutGraph.toolTip = jsonSample.chart.toolTip;
	pieDonutGraph.showValues = jsonSample.piedata.showValues;
	pieDonutGraph.showLabels = jsonSample.piedata.showLabels;
	pieDonutGraph.palette = jsonSample.canvas.palette;
	pieDonutGraph.outerRadius = jsonSample.piedata.outerRadius;
	pieDonutGraph.angle = jsonSample.piedata.angle;
	if(jsonSample.donutdata.innerRadius)
		pieDonutGraph.innerRadius = jsonSample.donutdata.innerRadius;
	var data = [];
	for(var i=0; i < jsonSample.piedata.series.values.length; i++){
		data.push({label : jsonSample.piedata.series[0].label[i], value : jsonSample.piedata.series[0].values[i]});
	}
	pieDonutGraph.data = data;
	return pieDonutGraph;
};

getScatterData = function(jsonSample){
	scatterGraph.height = jsonSample.canvas.height;
	scatterGraph.width = jsonSample.canvas.width;
	scatterGraph.caption = jsonSample.chart.caption;
	scatterGraph.toolTip = jsonSample.chart.toolTip;
	scatterGraph.xAxisName = jsonSample.chart.xAxisName;
	scatterGraph.yAxisName = jsonSample.chart.yAxisName;
	scatterGraph.palette = jsonSample.canvas.palette;
	scatterGraph.grid = jsonSample.canvas.grid;
	scatterGraph.fillColor = jsonSample.scatterdata.fillColor;
	var data = [];
	for(var i=0; i < jsonSample.scatterdata.series.values.length; i++){
		data.push({toolTipText : jsonSample.scatterdata.series[0].label[i], x : jsonSample.scatterdata.series[0].values[i][0], y : jsonSample.scatterdata.series[0].values[i][1], z : jsonSample.scatterdata.series[0].values[i][2]});
	}
	scatterGraph.data = data;
	return scatterGraph;
};

getareaData = function(jsonSample){
	areaGraph.height = jsonSample.canvas.height;
	areaGraph.width = jsonSample.canvas.width;
	areaGraph.toolTip = jsonSample.chart.toolTip;
	areaGraph.caption = jsonSample.chart.caption;
	areaGraph.xAxisName = jsonSample.chart.xAxisName;
	areaGraph.yAxisName = jsonSample.chart.yAxisName;
	areaGraph.palette = jsonSample.canvas.palette;
	areaGraph.grid = jsonSample.canvas.grid;
	var data = [];
	for(var i=0; i < jsonSample.areadata.series.values.length; i++){
		data.push({x : jsonSample.areadata.series[0].values[i][0], y : jsonSample.areadata.series[0].values[i][1]});
	}
	areaGraph.data = data;
	return areaGraph;
};

getmultiBarData = function(jsonSample){
	multiBarGraph.height = jsonSample.canvas.height;
	multiBarGraph.width = jsonSample.canvas.width;
	multiBarGraph.caption = jsonSample.chart.caption;
	multiBarGraph.toolTip = jsonSample.chart.toolTip;
	multiBarGraph.xAxisName = jsonSample.chart.xAxisName;
	multiBarGraph.yAxisName = jsonSample.chart.yAxisName;
	multiBarGraph.palette = jsonSample.canvas.palette;
	multiBarGraph.grid = jsonSample.canvas.grid;
	if(jsonSample.bardata.align)
		multiBarGraph.type = jsonSample.bardata.align;
	if(jsonSample.bardata.showLabels)
		multiBarGraph.showLabels = jsonSample.bardata.showLabels;
	var dataset = [];
	for(var i=0; i < jsonSample.bardata.series.length; i++){
		var tempContent = jsonSample.bardata.series[i].values;
		dataset.push({seriesname : jsonSample.bardata.series[i].label[0], color : "FEEEAA" data : function(){
			var content = [];
			for(var j=0; j < tempContent.length; j++){
				content.push({value : tempContent[i]});	
			}
			return content;
		});
	}
	return multiBarGraph;
};

getmultiLineData = function(jsonSample){
	multiLineGraph.height = jsonSample.canvas.height;
	multiLineGraph.width = jsonSample.canvas.width;
	multiLineGraph.caption = jsonSample.chart.caption;
	multiLineGraph.toolTip = jsonSample.chart.toolTip;
	multiLineGraph.xAxisName = jsonSample.chart.xAxisName;
	multiLineGraph.yAxisName = jsonSample.chart.yAxisName;
	multiLineGraph.palette = jsonSample.canvas.palette;
	multiLineGraph.grid = jsonSample.canvas.grid;
	var dataset = [];
	for(var i=0; i < jsonSample.bardata.series.length; i++){
		var tempContent = jsonSample.bardata.series[i].values;
		dataset.push({data : function(){
			var content = [];
			for(var j=0; j < tempContent.length; j++){
				content.push({value : tempContent[i], toolTipText : tempContent[i], label : jsonSample.bardata.series[i].label[0]});	
			}
			return content;
		});
	}
	return multiLineGraph;
};
