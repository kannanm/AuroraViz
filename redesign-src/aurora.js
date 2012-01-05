/**@author: aditya.g (agaur111@gmail.com)*/

/**
 * @Description The top-level aurora namespace. All public methods and
 *  fields should be registered on this namespace object.
 * @namespace The top-level aurora namespace, <tt>AR</tt>.
 */
AR = {};

/**
 * @constant
 * @property
 * @Description This is a an object containing the list of ChartTypes Supported By Aurora
 *  
 */
AR.ChartType = {
	BarChart : "BarChart",
	LineChart : "LineChart",
	PieChart : "PieChart",
	DonutChart : "DonutChart",
	MultibarChart : "BarChart",
	MultilineChart : "LineChart",
	BubbleChart : "BubbleChart",
	AreaChart : "AreaChart",
	MultiAreaChart : "AreaChart",
	StackedAreaChart : "StackedAreaChart",
	BulletChart : "BulletChart",
	Map : "Map"
};
/**
 * @class The basefunction for the Chart initilization.
 * @param {string}
 *            chartType is the type of the Chart that the user wants to initialize
 * @param {json}
 *            graphData is a json consisting of the data,series for the graph and if its a multiseries categories is included
 * @param {json}
 * 			  specs include styling of the graph and information about which axis is measure axis and which axis is category Axis 
 */

AR.Chart = function(chartType,graphData,specs){
	var isJSONArray = AR.Utility.checkIfJSON(graphData); 
	if(!isJSONArray){
		this._dataTable = AR.Utility.Table(graphData.columns,graphData.data,false);
	}
	else{
		//TODO implement it
	}
	this._canvas = new pv.Panel(); 
};

