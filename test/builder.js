var barLineGraph = {
    "caption": "Top 5 Sales Person",
    "yAxisName": "Names",
	"xAxisName": "Sales Figure",
    "width": 500,
    "height": 500,
	"palette": 1,
	"type":"h",
	"grid" : "y",
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
	 "categories": [
        {
            "category": [
                {
                    "label": "Hardware"
                },
                {
                    "label": "Software"
                },
                {
                    "label": "Service"
                }
            ]
        }
    ],
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
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	},
	
	"linedata" : {
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
					"values":[4,29,-39,14,-16,-49,30,7,-32,25],
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
					"label":"Item 1"
				}
		   ]
	},
	
	"scatterdata" : {
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
					"label":"Item 0"
				},
				{
					"values":[-29,48,44,-11,7,50,-20,-21,-5,26],
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

getBarLineData = function(jsonSample){
};
