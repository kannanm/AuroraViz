/**
 * @Description The top level namespace for all the utility functions in Aurora.
 * @namespace The top-level utility namespace, <tt>AR.Utility</tt>.
 */
AR.Utility = {};

/**
 * @class It is a Utilty Class used to look the data as a table with columns and rows. 
 * It also provides functions to access data.
 * 
 * @param {Array}
 *            columnNames It is an array consisting of the names of the columns
 * @param {Array}
 *            data It is an array containing the data for the table. It can either be an array of arrays or array of objects
 * @param {boolean}
 * 			  isJson a boolean field representing if the data is array of arrays or array of Objects
 */

AR.Utility.Table = function (columnNames, data, isJson) {
 this.columnNames = columnNames;
 this._data = data;
 this._isAA = ! isJson;
};

/**
 * Returns the data value based on the rowIndex and the column name
 * @param {Number} rowIndex
 *             This is the index of the row from where the data is to be accessed
 * @param {String} columnName
 * 				This is the name of the column from where the data is to be accessed
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
 *             This is the index of the row from where the data is to be accessed
 * @param {Number} colIndex
 * 				This is the index of the column from where the data is to be accessed
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
 *             This is the index of the row 
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
 * Checks if the <tt>chartType</tt> exists.
 * @param {string} chartType 
 * 			It is the type of the Chart that the user wants to initialize
 * @return {boolean} true if the <tt>chartType</tt> exists, otherwise false
 */

AR.Utility.checkChartType = function(chartType){
	return chartType?true:false;
};

/**
 * Checks if the <tt>graphData</tt> contains both the data and the series.
 * @param {json} graphData 
 * 			The data for the graph
 * @return {boolean} true if the <tt>graphData</tt> is valid, otherwise false
 */

AR.Utility.checkGraphData = function(graphData){
	var isValid = true;
	isValid = isValid && (graphData.data)? true: false;
	isValid = isValid && (graphData.series)? true: false; 
	return isValid;
};

/**
 * Checks if <tt>chartType</tt> exists and the data and the series name are present and their length is equal 
 * as with every series a data is associated  
 * @param {string} chartType 
 * 		 	It is the type of the Chart that the user wants to initialize
 * @param {json} graphData
 * 			It is an object containing the data and the series name for the graph
 * @returns {boolean} if the Params are valid the true, otherwise false
 */
AR.Utility.checkParams = function(chartType,graphData){
	var isValid = true;
	isValid = isValid && AR.Utility.checkChartType(chartType);
	isValid = isValid && AR.Utility.checkGraphData(graphData);
	return isValid;
};

/**
 * Checks if <tt>data</tt> is an array of arrays or array of Objects.
 * @param {Array} data
 * 			Data for the chart 
 * @returns {boolean} true if the its an array of objects, false otherwise
 */
AR.Utility.checkIfJSON = function(data){
	if(data.length>0){
		return ("object" === typeof data[0]);
	}
};