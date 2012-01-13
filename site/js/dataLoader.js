//TODO create data that is original and create filtered data
//ARV.dataJSON = {
//    id: "4ed630d8ed9be9723687620d",
//    columns: [
//        {
//        id: "company",
//        name: "Company",
//        field: "company",
//        editor: TextCellEditor},
//    {
//        id: "sales",
//        name: "Sales",
//        field: "sales",
//        editor: TextCellEditor},
//    {
//        id: "revenue",
//        name: "Revenue",
//        field: "revenue",
//        editor: TextCellEditor},
//    {
//        id: "profit",
//        name: "Profit",
//        field: "profit",
//        editor: TextCellEditor}
//    ],
//    data: [
//        {
//        company: "LG",
//        sales: 41,
//        revenue: 22,
//        profit: 10},
//    {
//        company: "Samsung",
//        sales: 24,
//        revenue: 12,
//        profit: 20},
//    {
//        company: "Philips",
//        sales: 20,
//        revenue: 15,
//        profit: 7},
//    {
//        company: "GE",
//        sales: 55,
//        revenue: 34,
//        profit: 25}
//    ]
//};
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

ARV.createDataForTable = function() {
    var i, label;
    var categoryLabel = $("#categoryAxisList option:selected").val();
    var measureLabels = $("#measureAxisList option:selected");
    var columns = ARV.filteredData.columns;
    ARV.TableColumns = [];
    ARV.TableData = [];
    //    for(i=0; i<ARV.filteredData.columns.length; i++){
    //        ARV.TableColumns.push(ARV.filteredData.columns[i]);
    //    }
    for (i = 0; i < ARV.filteredData.data.length; i++) {
        ARV.TableData.push(ARV.filteredData.data[i]);
    }
    ARV.TableColumns.push(jlinq.from(columns).equals("field", categoryLabel).select()[0]);
    for (i = 0; i < measureLabels.length; i++) {
        label = $(measureLabels[i]).val();
        ARV.TableColumns.push(jlinq.from(columns).equals("field", label).select()[0]);
    }
};


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
(function(){
	var data = ARV.dataJSON.data;
	var columns = ARV.dataJSON.columns;
	var i = 0;
	var option;
	
	ARV.grid = new Slick.Grid("#dataGrid", data, columns, ARV.editableGridOptions);
	ARV.grid.setSelectionModel(new Slick.CellSelectionModel());
	ARV.grid.onAddNewRow.subscribe(function(e, args) {
	    var item = args.item;
	    var column = args.column;
	    ARV.grid.invalidateRow(data.length);
	    data.push(item);
	    ARV.grid.updateRowCount();
	    ARV.grid.render();
	});
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

	
})();
ARV.initializeDialog = function() {
    $("#dialog-illegal-data").dialog({
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });
};
ARV.initializeDialog();

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
ARV.modifyDataForMultiSeries = function() {
    ARV.updateCategoryArray();
    ARV.updateDatasetArray();
};

ARV.modifyDataForBubbleChart = function() {
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
ARV.modifyDataForMap = function(){
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
            ARV.modifyDataForMultiSeries();
            if (noOfSelected === 3) {
                ARV.modifyDataForBubbleChart();
            }
        }
    }
    catch (e) {
        alert(e);
    }
    if("Map" === $("#chartTypes option:selected").attr("value")){
    	ARV.modifyDataForMap();
    }
    ARV.createDataForTable();
    ARV.refreshTable();
    ARV.refreshGraph();
};
$("#categoryAxisList").chosen().change(ARV.updateDataForVisualizations);
$("#measureAxisList").chosen().change(ARV.updateDataForVisualizations);
$("#dataUpdater").live("click",function() {
	ARV.updateDataForVisualizations();
});
ARV.filteredData = {};
jQuery.extend(ARV.filteredData,ARV.dataJSON);