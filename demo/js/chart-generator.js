ARV.styles = {
		captionSize:"20",
		captionColor:"#000000",
		canvasFillColor : "#fffff",
		canvasBorderColor : "#cccccc",
		canvasBorderThickness : "1",
		chartFillColor : "#fffff",
		horAxisLabelColor : "#000000",
		horAxisLabelSize : "12",
		horAxisColor : "#000000",
		horAxisThickness : "2",
		verAxisLabelColor : "#000000",
		verAxisLabelSize : "12",
		verAxisColor : "#000000",
		verAxisThickness : "2",
		verGridShow : "checked",
		verGridColor : "#cccccc",
		verGridLabelShow : "checked",
		verGridThickness : "1",
		horGridShow : "checked",
		horGridColor : "#cccccc",
		horGridLabelShow : "checked",
		horGridThickness : "1",
//		legendfontSize : "12",
//		legendFontColor : "#000000",
//		legendBorderColor : "#000000",
//		legendBorderThickness : "1",
//		legendBgColor : "#ffffff"
	};
ARV.commonProperties = {
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		palette : "presetPalette",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		pieRadius: "100",
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		outerRadius:"100",
		innerRadius:"70",
		interpolated:false,
		segmented : true,
		areaColor:"#1F77B4",
		
};
ARV.defaults = {
	BarGraph : {
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		palette : "presetPalette",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		pieRadius: "200",
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		outerRadius:"100",
		innerRadius:"70",
		interpolated:false,
		segmented : true,
		areaColor:"#1F77B4",
		style : ARV.styles,
		data : [ {
			label : "2005",
			value : 5
		}, {
			label : "2006",
			value : 10
		}, {
			label : "2007",
			value : 8
		}, {
			label : "2008",
			value : 12
		}, {
			label : "2009",
			value : 2
		} ]
	},
	MultiBarGraph:{
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		palette : "presetPalette",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		interpolated:false,
		style : ARV.styles,
		categories: [
		               {
		                   category: [
		                       {
		                           label: "Hardware"
		                       },
		                       {
		                           label: "Software"
		                       },
		                       {
		                           label: "Service"
		                       },
		                       {
		                    	   label:"HR"
		                       }
		                   ]
		               }
		           ],
		           dataset: [
		               {
		                   seriesname: "Domestic",
		                   color: "8EAC41",
		                   data: [
		                       {
		                           value: "84"
		                       },
		                       {
		                           value: "207"
		                       },
		                       {
		                           value: "116"
		                       },
		                       {
		                           value: "100"
		                       }
		                   ]
		               },
		               {
		                   seriesname: "International",
		                   color: "607142",
		                   data: [
		                       {
		                           value: "116"
		                       },
		                       {
		                           value: "237"
		                       },
		                       {
		                           value: "83"
		                       },
		                       {
		                           value: "90"
		                       }
		                   ]
		               }
		           ]
	},
	BubbleGraph : {
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		palette : "presetPalette",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		pieRadius: "100",
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		outerRadius:"100",
		innerRadius:"70",
		style : ARV.styles,
		"data": [
	                {
	                    "x": 30,
	                    "y": 1.3,
	                    "z": 116,
	                    "label": "Traders",
	                    "toolTipText": "Traders"
	                },
	                {
	                    "x": 32,
	                    "y": 3.5,
	                    "z": 99,
	                    "label": "Farmers",
	                    "toolTipText": "Farmers"
	                },
	                {
	                    "x": 8,
	                    "y": 2.1,
	                    "z": 33,
	                    "label": "Individuals",
	                    "toolTipText": "Individuals"
	                },
	                {
	                    "x": 62,
	                    "y": 2.5,
	                    "z": 72,
	                    "label": "MBH",
	                    "toolTipText": "Medium Business Houses"
	                },
	                {
	                    "x": 78,
	                    "y": 2.3,
	                    "z": 55,
	                    "label": "Corporate",
	                    "toolTipText": "Corporate Group A"
	                }
	            ]
	},
	AreaGraph : {
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		palette : "presetPalette",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		pieRadius: "100",
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		outerRadius:"100",
		innerRadius:"70",
		segmented : true,
		interpolated: true,
		style : ARV.styles,
		"data": [{
			"x": 1,
			"y": 1.3
	},
    {
			"x": 2,
			"y": 4
	},
    {
			"x": 3,
			"y": 1.0
	},
    {
			"x": 4,
			"y": 1.5
	},

    {
			"x": 5,
			"y": 1.3
	}
	]
	},
	BulletGraph:{
		caption : "Profit (Yearly)",
		yAxisName : "Amount (in billions)",
		xAxisName : "Years",
		width : 800,
		height : 700,
		type : "v",
		toolTip: true,
		showLabels: true,
		showValues: true,
		labelFontSize:"10",
		labelFontColor:"#000000",
		labelRotateAngle:"0",
		paletteColors:[],
		presetPalette:"Plain",
		isLineStyleStep: false,
		pieRadius: "100",
		dotSize:"2",
		lineWidth:"2",
		lineColor:"#000000",
		outerRadius:"100",
		innerRadius:"70",
		interpolated:false,
		segmented : true,
		areaColor:"#1F77B4",
		bulletOrientation:"left",
		markerShape:"triangle",
		markerFillColor:"#ccccc",
		measureFillColor:"#cfcfcf",
		style : ARV.styles,
		data:[
		      {
		    	    title: "Revenue",
		    	    toolTipText: "US$, in thousands",
		    	    ranges: [150, 225, 300],
		    	    measures: [270],
		    	    markers: [250]
		    	  },
		    	  {
		    	    title: "Profit",
		    	    toolTipText: "%",
		    	    ranges: [20, 25, 30],
		    	    measures: [23],
		    	    markers: [26]
		    	  },
		    	  {
		    	    title: "Order Size",
		    	    toolTipText: "US$, average",
		    	    ranges: [350, 500, 600],
		    	    measures: [320],
		    	    markers: [550]
		    	  },
		    	  {
		    	    title: "New Customers",
		    	    toolTipText: "count",
		    	    ranges: [1400, 2000, 2500],
		    	    measures: [1650],
		    	    markers: [2100]
		    	  },
		    	  {
		    	    title: "Satisfaction",
		    	    toolTipText: "out of 5",
		    	    ranges: [3.5, 4.25, 5],
		    	    measures: [4.7],
		    	    markers: [4.4]
		    	  }
		    	]
	}
};


ARV.JsonMap ={
		BarGraph:"BarGraph",
		LineGraph:"BarGraph",
		PieGraph:"BarGraph",
		DonutGraph:"BarGraph",
		BubbleGraph:"BubbleGraph",
		MultibarGraph:"MultiBarGraph",
		MultilineGraph:"MultiBarGraph",
		AreaGraph:"BarGraph",
		MultiAreaGraph:"MultiBarGraph",
		StackedAreaGraph:"MultiBarGraph",
		BulletGraph:"BulletGraph"
};
ARV.ChartTypeMap = {
		BarGraph:"BarGraph",
		LineGraph:"LineGraph",
		PieGraph:"PieGraph",
		DonutGraph:"DonutGraph",
		MultibarGraph:"BarGraph",
		MultilineGraph:"LineGraph",
		BubbleGraph:"BubbleGraph",
		AreaGraph: "AreaGraph",
		MultiAreaGraph:"AreaGraph",
		StackedAreaGraph:"StackedAreaGraph",
		BulletGraph:"BulletGraph"
}
ARV.modifyJSON = function() {
	var index, param, value;
	$("#chart").html("");
	var graphType = $("select option:selected").attr("value");
	var graphName = graphType+"Graph";
	var graphDef = ARV.defaults[ARV.JsonMap[graphName]];
	var styles = graphDef.style;
	for (prop in styles) {
		var elem = $("#"+prop);
		var value = elem.val();
		if(prop === "verGridShow" || prop === "horGridShow" || prop === "verGridLabelShow" || prop === "horGridLabelShow"){
			value = elem.attr("checked");
		}
		if(styles.hasOwnProperty(prop)){
			graphDef.style[prop] = value;
		}
	}
	for (prop in graphDef) {
		var elem = $("#"+prop);
		var value = elem.val();
		if(prop === "toolTip" || prop === "showLabels" || prop === "showValues" || prop === "isLineStyleStep" || prop ==="interpolated" || prop==="segmented"){
			value = elem.attr("checked");
		}
		if(graphDef.hasOwnProperty(prop) && value!=undefined){
			graphDef[prop] = value;
		}
	}
	if(ARV.paletteChanged){
		var colors = [];
		$("#colors input").each(function(){
			colors.push($(this).val());
		});
		graphDef.presetPalette = "custom";
		graphDef.paletteColors = colors;
	}
	ARV.showGraph(graphType);
};
ARV.showGraph= function (graphType){
	 var graphName = graphType+"Graph";
	 graph = new AR[ARV.ChartTypeMap[graphName]](ARV.defaults[ARV.JsonMap[graphName]]);
	 graph.render("chart");
};