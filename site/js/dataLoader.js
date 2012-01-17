//TODO create data that is original and create filtered data
/**
 * The original data 
 */
ARV.dataJSON = {
    id: "4ed630d8ed9be9723687620d",
    columns: [
        {
        id: "company",
        name: "Company",
        field: "company",
        editor: TextCellEditor},
    {
        id: "sales",
        name: "Sales",
        field: "sales",
        editor: TextCellEditor},
    {
        id: "revenue",
        name: "Revenue",
        field: "revenue",
        editor: TextCellEditor},
    {
        id: "profit",
        name: "Profit",
        field: "profit",
        editor: TextCellEditor}
    ],
    data: [
        {
        company: "LG",
        sales: 41,
        revenue: 22,
        profit: 10},
    {
        company: "Samsung",
        sales: 24,
        revenue: 12,
        profit: 20},
    {
        company: "Philips",
        sales: 20,
        revenue: 15,
        profit: 7},
    {
        company: "GE",
        sales: 55,
        revenue: 34,
        profit: 25}
    ]
};
ARV.editableGridOptions = {
    editable: true,
    enableAddRow: true,
    enableCellNavigation: true,
    enableColumnReorder: true,
    asyncEditorLoading: false,
    autoEdit: false,
    autoHeight: true
};
ARV.gridOptions = {
    enableCellNavigation: true,
    enableColumnReorder: true,
    autoHeight: true,
    forceFitColumns: true
};

/**
 * Populate the <tt>ARV.TableData</tt> and <tt>ARV.TableColumns</tt> from the filtered data
 * <tt>ARV.TableData</tt> and <tt>ARV.TableColumns</tt> will be used to create the SlickGrid
 * datatable
 */
ARV.createDataForTable = function() {
    var i, label;
    var categoryLabel = $("#categoryAxisList option:selected").val();
    var measureLabels = $("#measureAxisList option:selected");
    var columns = ARV.filteredData.columns;
    ARV.TableColumns = [];
    ARV.TableData = [];
    for (i = 0; i < ARV.filteredData.data.length; i++) {
        ARV.TableData.push(ARV.filteredData.data[i]);
    }
    ARV.TableColumns.push(jlinq.from(columns).equals("field", categoryLabel).select()[0]);
    for (i = 0; i < measureLabels.length; i++) {
        label = $(measureLabels[i]).val();
        ARV.TableColumns.push(jlinq.from(columns).equals("field", label).select()[0]);
    }
};

//TODO Do this in one parse
/**
 * Populate the select dom element for the map view.
 * @param div The id of the dom element 
 */
ARV.populateSingleSelectForMap = function(div){
	var columns = ARV.dataJSON.columns;
	if($("#"+div).is(".select-deselect")){
		 option = $('<option />').val("");
		 $("#"+div).append(option);
	}
	for (i = 0; i < columns.length; i++) {
	    option = $('<option />').val(columns[i].field).append(columns[i].name);
	    $("#"+div).append(option);
	}
	if($("#"+div).is(".select-deselect")){
		 $("#"+div).chosen({allow_single_deselect: true});
	}else{
		$("#"+div).chosen();
	}
	
};
ARV.populateSingleSelectForMap("categoryListForMap");
ARV.populateSingleSelectForMap("latitudeForMap");
ARV.populateSingleSelectForMap("longitudeForMap");
ARV.populateSingleSelectForMap("sizeForMap");


/**
 * Update the data for the single series graph. Example data format for single series graph:
 * <pre>"data": [{
        "value": 22,
        "label": "LG"
        },
    	{
        "value": 12,
        "label": "Samsung"
        }
       ]</pre>
 */
ARV.modifyDataForSingleSeries = function() {
    var dataArr = [];
    var selected = $("#measureAxisList option:selected");
    var field = $(selected[0]).val();
    labelField = $("#categoryAxisList option:selected").val();
    var data = ARV.filteredData.data;
    for (i = 0; i < data.length; i++) {
        var dataElement = data[i];
        var value = parseInt(dataElement[field], 10);
        if (isNaN(value)) {
            $("#dialog-illegal-data").dialog("open");
            return;
        }
        label = dataElement[labelField];
        obj = {
            value: value,
            label: label
        };
        dataArr.push(obj);
    }
    ARV.defaultData.BarGraph = dataArr;
};
/**
 * Update the categories array for a multiseries graph
 */
ARV.updateCategoryArray = function() {
    ARV.defaultCategories[0].category = [];
    var labelField = $("#categoryAxisList option:selected").val();
    var obj = {};
    var i = 0;
    for (i = 0; i < ARV.filteredData.data.length; i++) {
        var dataElement = ARV.filteredData.data[i];
        category = dataElement[labelField];
        obj = {
            label: category
        };
        ARV.defaultCategories[0].category.push(obj);
    }
};
/**
 * Returns the data for the <tt>seriesname</tt>
 * @param seriesname {String} 
 * @returns The data array for the <tt>seriesname</tt>
 */
ARV.getDataArrayForSeries = function(seriesname) {
    var dataArr = [];
    var obj = {};
    var index = 0;
    for (index = 0; index < ARV.filteredData.data.length; index++) {
        var dataElement = ARV.filteredData.data[index];
        var value = parseInt(dataElement[seriesname], 10);
        if (isNaN(value)) {
            $("#dialog-illegal-data").dialog("open");
            return undefined;
        }
        obj = {
            value: value
        };
        dataArr.push(obj);
    }
    return dataArr;
};
/**
 * Updates the data set for a multiseries graph
 */
ARV.updateDatasetArray = function() {
    var dataSet = [];
    var obj = {},
        seriesname;
    var selected = $("#measureAxisList option:selected");
    var index = 0;
    for (index = 0; index < selected.length; index++) {
        seriesname = $(selected[index]).val();
        var data = ARV.getDataArrayForSeries(seriesname);
        if (!data) {
            return;
        }
        obj = {
            seriesname: seriesname,
            data: data
        };
        dataSet.push(obj);
    }
    ARV.defaultDataSet = dataSet;
};

/**
 * Update the data and the categories for a multiseries graph. Example multiseries data: 
 * <pre>
 * "categories": [{
    "category": [{
      "label": "LG"
    },
              {
      "label": "GE"
    }]
  }],
  "dataset": [{
    "seriesname": "sales",
    "data": [{
      "value": 41
    },
              {
      "value": 55
    }]
  },
        {
    "seriesname": "revenue",
    "data": [{
      "value": 22
    },
              {
      "value": 34
    }]
  }]
 * </pre>
 */
ARV.updateDataForMultiSeries = function() {
    ARV.updateCategoryArray();
    ARV.updateDatasetArray();
};

/**
 * Updates the data for the bubble chart. Example data format for the bubble chart:
 * <pre> "data": [{
        "x": 41,
        "y": 22,
        "z": 10,
        "label": "LG"
        },
    	{
        "x": 24,
        "y": 12,
        "z": 20,
        "label": "Samsung"
        }
       ]</pre>
 */
ARV.updateDataForBubbleChart = function() {
    var dataArr = [],
    	obj ={},
    	index = 0,
    	xValue,	yValue, zValue,
    	dataItem,
    	selected = $("#measureAxisList option:selected"),
    	x = $(selected[0]).val(),
    	y = $(selected[1]).val(),
    	z = $(selected[2]).val(),
        labelField = $("#categoryAxisList option:selected").val();
    
    for (index = 0; index < ARV.filteredData.data.length; index++) {
        dataItem = ARV.filteredData.data[index];
        xValue = parseInt(dataItem[x],10);
        yValue = parseInt(dataItem[y],10);
        zValue = parseInt(dataItem[z],10);
        if (isNaN(xValue) || isNaN(yValue) || isNaN(zValue)) {
            $("#dialog-illegal-data").dialog("open");
            return undefined;
        }
        obj = {
            x: xValue,
            y: yValue,
            z: zValue,
            label: dataItem[labelField]
        };
       dataArr.push(obj);
    }
    ARV.defaultData.BubbleGraph = dataArr;
};
/**
 * Updates the data for the map. Takes the latitude, longitude,size and category measures 
 * and creates a JSON for the map. 
 * e.g. JSON for map <pre>
 * "data": [{ 
        "lat": 22,
        "lon": 22,
        "size": 10,
        "category": "LG"
        },
    	{
        "lat": 12,
        "lon": 12,
        "size": 20,
        "category": "Samsung"
        }
    ]</pre>
 */
ARV.updateDataForMap = function(){
	var dataArr = [],
 		obj ={},
 		index = 0,
 		xValue,	yValue, zValue,
 		dataItem,
 		lat = $("#latitudeForMap option:selected").val(),
 		long = $("#longitudeForMap option:selected").val(),
 		size = $("#sizeForMap option:selected").val(),
 		category = $("#categoryListForMap option:selected").val() ;
	for (index = 0; index < ARV.filteredData.data.length; index++) {
		dataItem = ARV.filteredData.data[index];
		latValue = parseInt(dataItem[lat],10);
		longValue = parseInt(dataItem[long],10);
		sizeValue = parseInt(dataItem[size] || 10 ,10);
		if (isNaN(latValue) || isNaN(longValue) || isNaN(sizeValue)) {
			$("#dialog-illegal-data").dialog("open");
			return undefined;
		}
		obj = {
			lat: latValue,
			lon: longValue,
			size: sizeValue,
			category: dataItem[category] || " "
		};
		dataArr.push(obj);
	}
	ARV.defaultData.MapGraph = dataArr;
};

/**
 * The function calls the update data method for all the types for the graph viz single series, multiseries,
 * bubble chart. 
 */
ARV.updateDataForVisualizations = function(){
	if(ARV.filteredData.data.length === 0){
		$("#chart").html("Select some fields to view data");
		return;
	}
    var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
    try {
        if (noOfSelected === 1) {
            ARV.modifyDataForSingleSeries();
        }
        if (noOfSelected > 1) {
            ARV.modifyDataForSingleSeries();
            ARV.updateDataForMultiSeries();
            if (noOfSelected === 3) {
                ARV.updateDataForBubbleChart();
            }
        }
    }
    catch (e) {
        alert(e);
    }
    if("Map" === $("#chartTypes option:selected").attr("value")){
    	ARV.updateDataForMap();
    }
    ARV.createDataForTable();
    ARV.refreshTable();
    ARV.refreshGraph();
};


(function(){
	var data = ARV.dataJSON.data;
	var columns = ARV.dataJSON.columns;
	var i = 0;
	var option;
	for (i = 0; i < columns.length; i++) {
	    option = $('<option />').val(columns[i].field).append(columns[i].name);
	    if (i === 1) {
	        option.attr("selected", "selected");
	    }
	    $("#measureAxisList").append(option);
	}
	$("#measureAxisList").chosen();

	for (i = 0; i < columns.length; i++) {
	    option = $('<option />').val(columns[i].field).append(columns[i].name);
	    if (i === 0) {
	        option.attr("selected", "selected");
	    }
	    $("#categoryAxisList").append(option);
	}
	$("#categoryAxisList").chosen();
	 $("#dialog-illegal-data").dialog({
	        modal: true,
	        autoOpen: false,
	        buttons: {
	            Ok: function() {
	                $(this).dialog("close");
	            }
	        }
	    });
	
})();

$("#categoryAxisList").chosen().change(ARV.updateDataForVisualizations);
$("#measureAxisList").chosen().change(ARV.updateDataForVisualizations);
$("#dataUpdater").live("click",function() {
	ARV.updateDataForVisualizations();
});

/**
 * The filtered data 
 */
ARV.filteredData = {};
//Deep copy the original data into the filtered data so that the original data does not change 
jQuery.extend(ARV.filteredData,ARV.dataJSON);