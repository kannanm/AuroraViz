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
		"palette" : "1"
	},
	
	"grid" : {
		"horizontal" : "yes",
		"vertical" 	 : "yes"
	},
	
	"chart" : {
		 "caption"	:	"Top5SalesPerson",
		 "yAxisName":	"Names",
         "xAxisName":	"SalesFigure",
         "toolTip"	:	1,
         "Color" : [] 
	},
	
	"bardata" : {
		"type" 	:   "bar",
		"align" : "h",
		"showLables" : "1",
		"series":[
				{
					"values":[4],
					"label":"Item 0"
				},
				{
					"values":[8],
					"label":"Item 1"
				},
				{
					"values":[10],
					"label":"Item 2"
				},
				{
					"values":[6],
					"label":"Item 3"
				}
		   ]
	},
	
	"linedata" : {
		"type" 	:   "line",
		"lineStyle":"step",
		"series":[
				{
					"values":[4],
					"label":"Item 0"
				},
				{
					"values":[8],
					"label":"Item 1"
				},
				{
					"values":[10],
					"label":"Item 2"
				},
				{
					"values":[6],
					"label":"Item 3"
				}
		   ]
	},
	
	"mbardata" : {
		"type" 	:   "bar",
		"align" : "h",
		"showLables" : "1",
		"series":[
				{
					"values":[4,29,14],
					"label":"Item 0"
				},
				{
					"values":[48,44,12],
					"label":"Item 1"
				}
		   ]
	},
	
	"mlinedata" : {
		"type" 	:   "line",
		"lineStyle":"step",
		"series":[
				{
					"values":[4,29,14],
					"label":"Item 0"
				},
				{
					"values":[48,44,12],
					"label":"Item 1"
				}
		   ]
	},

	"piedata" : {
		"type" 	:   "pie",
		"showValues":1,
		"showLabels":1,
		"Radius" : "5", 
		"angle" : "5", 
		"startAngle" : "5", 
		"endAngle" : "5", 
		"series":[
				{
					"values":4,
					"label":"Item 0"
				},
				{
					"values":6,
					"label":"Item 1"
				}
		   ]
	},
	
	"scatterdata" : {
		"type" 	:   "scatter",
		"series":[
				{
					"values":[1,2,4],
					"label":"Item 0"
				},
				{
					"values":[2,3,6],
					"label":"Item 1"
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
					"values":4,
					"label":"Item 0"
				},
				{
					"values":6,
					"label":"Item 1"
				}
		   ]
	},

	"areadata" : {
		"type" 	:   "area",
		"areaSegemented":true,
		"areaInterpolate":false,
		"series":[
				{
					"values":[3,1.3],
					"label":"Item 0"
				},
				{
					"values":[2,4],
					"label":"Item 1"
				},
				{
					"values":[2,1],
					"label":"Item 2"
				},
				{
					"values":[3,1.5],
					"label":"Item 3"
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
		if(jsonSample.data.series.values.length < 1){
			return getBarData(jsonSample)
		}else{
			return getmultiBarData(jsonSample);
		}
	}
	if(jsonSample.data.type == "line"){
		if(jsonSample.data.series.values.length < 1){
			return getLineData(jsonSample);
		}else{
			return getmultiLineData(jsonSample);
		}
	}
	if(jsonSample.data.type == "pie"){
		return getPieDonutData(jsonSample);
	}
	if(jsonSample.data.type == "donut"){
		return getDonutData(jsonSample);
	}if(jsonSample.data.type == "scatter"){
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
	if(jsonSample.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		barLineGraph.grid = "b";
	
	if(jsonSample.grid.horizontal != "yes")
	    barLineGraph.grid = "v";
	
	if(jsonSample.grid.vertical != "yes")
	    barLineGraph.grid = "h";
	    
	barLineGraph.toolTip = jsonSample.chart.toolTip;
	if(jsonSample.bardata.align)
		barLineGraph.type = jsonSample.bardata.align;
	if(jsonSample.bardata.showLabels)
		barLineGraph.showLabels = jsonSample.bardata.showLabels;
	var data = [];
	for(var i=0; i < jsonSample.bardata.series.length; i++){
		data.push({label : jsonSample.bardata.series[i].label, value : jsonSample.bardata.series[i].values[0]});
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
	
	if(jsonSample.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		barLineGraph.grid = "b";
	
	if(jsonSample.grid.horizontal != "yes")
	    barLineGraph.grid = "v";
	
	if(jsonSample.grid.vertical != "yes")
	    barLineGraph.grid = "h";
	    
	if(jsonSample.linedata.lineStyle)
		barLineGraph.style = jsonSample.linedata.lineStyle;
	barLineGraph.toolTip = jsonSample.chart.toolTip;
	var data = [];
	for(var i=0; i < jsonSample.linedata.series.length; i++){
		data.push({label : jsonSample.linedata.series[i].label, value : jsonSample.linedata.series[i].values[0]});
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
	pieDonutGraph.outerRadius = jsonSample.piedata.Radius;
	pieDonutGraph.angle = jsonSample.piedata.angle;
	
	var data = [];
	for(var i=0; i < jsonSample.piedata.series.length; i++){
		data.push({label : jsonSample.piedata.series[i].label, value : jsonSample.piedata.series[i].values});
	}
	pieDonutGraph.data = data;
	return pieDonutGraph;
};

getDonutData = function(jsonSample){
	pieDonutGraph.height = jsonSample.canvas.height;
	pieDonutGraph.width = jsonSample.canvas.width;
	pieDonutGraph.caption = jsonSample.chart.caption;
	pieDonutGraph.toolTip = jsonSample.chart.toolTip;
	pieDonutGraph.showValues = jsonSample.piedata.showValues;
	pieDonutGraph.showLabels = jsonSample.piedata.showLabels;
	pieDonutGraph.palette = jsonSample.canvas.palette;
	pieDonutGraph.outerRadius = jsonSample.donutdata.outerRadius;
	pieDonutGraph.angle = jsonSample.donutdata.angle;
	if(jsonSample.donutdata.innerRadius)
		pieDonutGraph.innerRadius = jsonSample.donutdata.innerRadius;
	var data = [];
	for(var i=0; i < jsonSample.donutdata.series.length; i++){
		data.push({label : jsonSample.donutdata.series[i].label, value : jsonSample.donutdata.series[i].values});
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
	
	if(jsonSample.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		scatterGraph.grid = "b";
	
	if(jsonSample.grid.horizontal != "yes")
	    scatterGraph.grid = "v";
	
	if(jsonSample.grid.vertical != "yes")
	    scatterGraph.grid = "h";
	
	scatterGraph.fillColor = jsonSample.scatterdata.fillColor;
	var data = [];
	for(var i=0; i < jsonSample.scatterdata.series.length; i++){
		data.push({toolTipText : jsonSample.scatterdata.series[i].label, x : jsonSample.scatterdata.series[i].values[0], y : jsonSample.scatterdata.series[i].values[1], z : jsonSample.scatterdata.series[i].values[2]});
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
	if(jsonSample.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		areaGraph.grid = "b";
	
	if(jsonSample.grid.horizontal != "yes")
	    areaGraph.grid = "v";
	
	if(jsonSample.grid.vertical != "yes")
	    areaGraph.grid = "h";
	var data = [];
	for(var i=0; i < jsonSample.areadata.series.length; i++){
		data.push({x : jsonSample.areadata.series[i].values[0], y : jsonSample.areadata.series[i].values[1]});
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
	
	
	if(multiBarGraph.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		scatterGraph.grid = "b";
	
	if(multiBarGraph.grid.horizontal != "yes")
	    scatterGraph.grid = "v";
	
	if(multiBarGraph.grid.vertical != "yes")
	    scatterGraph.grid = "h";
	
	
	if(jsonSample.mbardata.align)
		multiBarGraph.type = jsonSample.mbardata.align;
	if(jsonSample.mbardata.showLabels)
		multiBarGraph.showLabels = jsonSample.mbardata.showLabels;
	var dataset = [];
	for(var i=0; i < jsonSample.mbardata.series.length; i++){
		var tempContent = [];
		tempContent = jsonSample.mbardata.series[i].values;
		dataset.push({seriesname : jsonSample.mbardata.series[i].label, color : "FEEEAA", data : getData(tempContent)
		});
	}
	multiBarGraph.dataset = dataset;
	return multiBarGraph;
};

getData = function(tempContent){
			var content = [];
			for(var j=0; j < tempContent.length; j++){
				content.push({value : tempContent[j]});	
			}
			return content;
}

getmultiLineData = function(jsonSample){
	multiLineGraph.height = jsonSample.canvas.height;
	multiLineGraph.width = jsonSample.canvas.width;
	multiLineGraph.caption = jsonSample.chart.caption;
	multiLineGraph.toolTip = jsonSample.chart.toolTip;
	multiLineGraph.xAxisName = jsonSample.chart.xAxisName;
	multiLineGraph.yAxisName = jsonSample.chart.yAxisName;
	multiLineGraph.palette = jsonSample.canvas.palette;
	
	if(multiBarGraph.grid.horizontal == "yes" && jsonSample.grid.vertical == "yes")
		multiLineGraph.grid = "b";
	
	if(multiBarGraph.grid.horizontal != "yes")
	    multiLineGraph.grid = "v";
	
	if(multiBarGraph.grid.vertical != "yes")
	    multiLineGraph.grid = "h";
	    
	var dataset = [];
	for(var i=0; i < jsonSample.mlinedata.series.length; i++){
		var tempContent = jsonSample.mlinedata.series[i].values;
		var seriesLabel = jsonSample.mlinedata.series[i].label;
		var seriesTooltip = jsonSample.mlinedata.series[i].toolTipText;		
		dataset.push({data : getLineSeriesData(tempContent, seriesLabel, seriesTooltip)});
	}
	multiLineGraph.dataset = dataset;
	return multiLineGraph;
};

getLineSeriesData = function(tempContent, seriesLabel, seriesTooltip){
			var content = [];
				for(var j=0; j<tempContent.length; j++){
					content.push({value : tempContent[j], toolTipText : seriesTooltip+"-"+tempContent[j], label : seriesLabel});	
				}		
			return content;
		}



ARV.drawGraph = function() {
    var index, param, value;
    $("#chart").html("");
    var graphType = $("select option:selected").attr("value");
    var a = {};
   /* for (index = 0; index < ARV.con.commonParams.length; index++) {
        param = ARV.con.commonParams[index];
        value = $("#" + param).val();
        $("#chart").append(param + ":" + value + "<br>");
     } */
   // Canvas Properties 
   
   jsonSample.canvas.height = $("#" + ARV.con.commonParams[0]).val();
   jsonSample.canvas.width = $("#" + ARV.con.commonParams[1]).val();
   if($("#" + ARV.con.commonParams[2]).val() != "" && $("#" + ARV.con.commonParams[2]).val() != null)
		jsonSample.canvas.palette = 1;
   
   // Grid Properties
   if($("#" + ARV.con.commonParams[3]).val() == "on" && $("#" + ARV.con.commonParams[4]).val() == "on")
   {
		jsonSample.grid.horizontal = "yes";
		jsonSample.grid.vertical = "yes";
   }
   
   if($("#" + ARV.con.commonParams[3]).val() == "off")
			jsonSample.grid.horizontal = "no";

	if($("#" + ARV.con.commonParams[4]).val() == "off")
			jsonSample.grid.vertical = "no";
	
   // Chart Properties
   jsonSample.chart.xAxisName = $("#" + ARV.con.commonParams[7]).val();;
   jsonSample.chart.yAxisName = $("#" + ARV.con.commonParams[6]).val();;
   if($("#" + ARV.con.commonParams[8]).val() == "on")
		jsonSample.chart.toolTip = 1;
   jsonSample.chart.caption = $("#" + ARV.con.commonParams[5]).val();;
   
   
   // Specific Properties..
    var chartSpecificParams = ARV.con[graphType + "ChartParams"];
    
  /*  for (index = 0; index < chartSpecificParams.length; index++) {
		
        param = chartSpecificParams[index];
        value = $("#" + param).val();
        $("#chart").append(param + ":" + value + "<br>");
	} */
	
        if(graphType == "bar"){
			if($("#" + chartSpecificParams[0]).val() == "hor"){
				jsonSample.bardata.align = "h";
			}else{
				jsonSample.bardata.align = "v";
			}
				
		}else if(graphType == "multibar"){
			if($("#" + chartSpecificParams[0]).val() == "hor"){
				jsonSample.mbardata.align = "h";
			}else{
				jsonSample.mbardata.align = "v";
			}			
		}else if(graphType == "line"){
			if($("#" + chartSpecificParams[0]).val() == "on"){
				jsonSample.linedata.lineStyle = "step";
			}else{
				jsonSample.linedata.lineStyle = "";
			}
		}else if(graphType == "multiline"){
			if($("#" + chartSpecificParams[0]).val() == "on"){
				jsonSample.mlinedata.lineStyle = "step";
			}else{
				jsonSample.mlinedata.lineStyle = "";
			}
		}else if(graphType == "pie"){
	
			jsonSample.piedata.Radius = $("#" + chartSpecificParams[0]).val();
			jsonSample.piedata.angle = $("#" + chartSpecificParams[1]).val();
			jsonSample.piedata.startAngle = $("#" + chartSpecificParams[2]).val();
			jsonSample.piedata.endAngle = $("#" + chartSpecificParams[3]).val();
		}else if(graphType == "donut"){
			
			jsonSample.donutdata.innerRadius = $("#" + chartSpecificParams[0]).val();
			jsonSample.donutdata.outerRadius = $("#" + chartSpecificParams[1]).val();
			jsonSample.donutdata.angle = $("#" + chartSpecificParams[2]).val();
		}else if(graphType == "scatter"){
			
		}else if(graphType == "area"){
			if($("#" + chartSpecificParams[0]).val() == "on")
				jsonSample.areadata.areaSegemented = true;
			else
				jsonSample.areadata.areaSegemented = false;
				
			if($("#" + chartSpecificParams[1]).val() == "on")
				jsonSample.areadata.areaInterpolate = true;
			else
				jsonSample.areadata.areaInterpolate = false;
		}
		
		renderChart(graphType);
};

renderChart = function(graphType){
	if(graphType == "bar"){
		var graphDef = getBarData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.bardata);
		var renderGraph = new AR.BarGraph(graphDef);
		renderGraph.render("chart");
	}
	else if(graphType == "multibar"){
		var graphDef = getmultiBarData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.mbardata);
		var renderGraph = new AR.BarGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "line"){
		var graphDef = getLineData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.linedata);
		var renderGraph = new AR.LineGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "multiline"){
		var graphDef = getmultiLineData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.mlinedata);
		var renderGraph = new AR.LineGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "area"){
		var graphDef = getareaData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.areadata);
		var renderGraph = new AR.StackedAreaGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "pie"){
		var graphDef = getPieDonutData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.piedata);
		var renderGraph = AR.WedgeGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "donut"){
		var graphDef = getDonutData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.donutdata);
		var renderGraph = AR.WedgeGraph(graphDef);
		renderGraph.render("chart");
	}else if(graphType == "scatter"){
		var graphDef = getScatterData(jsonSample);
		document.getElementById("tabs-1").innerHTML = "<pre>"+JSON.stringify(graphDef)+"</pre>";
		document.getElementById("editJSON").innerHTML = JSON.stringify(jsonSample.scatterdata);
		var renderGraph = AR.BubbleGraph(graphDef);
		renderGraph.render("chart");
	}
};




editJSONData = function(data, graphType){
	var jsonData = JSON.parse(data);
		
	if(graphType == "bar"){
		jsonSample.bardata = data;
	}
	else if(graphType == "multibar"){
		jsonSample.mbardata = data;
		
	}else if(graphType == "line"){
		jsonSample.linedata = data;
		
	}else if(graphType == "multiline"){
		jsonSample.mlinedata = data;
		
	}else if(graphType == "area"){
		jsonSample.areadata = data;
		
	}else if(graphType == "pie"){
		jsonSample.piedata = data;
		
	}else if(graphType == "donut"){
		jsonSample.donutdata = data;
		
	}else if(graphType == "scatter"){
		jsonSample.scatterdata = data;
		
	}
	
	renderChart(graphType);
		
};
