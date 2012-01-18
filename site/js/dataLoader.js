//TODO create data that is original and create filtered data

/**
 * @Description The top-level dataloader namespace.
 * @namespace The top-level dataloader namespace, <tt>ARV.DataLoader</tt>. All
 *            the functions related preparing the data for the aurora source in the particular
 *            format are here.
 */
ARV.DataLoader = {};
/**
 * The original data
 */
ARV.DataLoader.dataJSON = {
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
ARV.DataLoader.editableGridOptions = {
    editable: true,
    enableAddRow: true,
    enableCellNavigation: true,
    enableColumnReorder: true,
    asyncEditorLoading: false,
    autoEdit: false,
    autoHeight: true
};
ARV.DataLoader.gridOptions = {
    enableCellNavigation: true,
    enableColumnReorder: true,
    autoHeight: true,
    forceFitColumns: true
};

/**
 * Populate the <tt>ARV.DataLoader.TableData</tt> and <tt>ARV.DataLoader.TableColumns</tt> from the filtered data
 * <tt>ARV.DataLoader.TableData</tt> and <tt>ARV.DataLoader.TableColumns</tt> will be used to create the SlickGrid
 * datatable
 */
ARV.DataLoader.createDataForTable = function() {
    var i, 
    	label,
    	dataLoadNS = ARV.DataLoader;
    var categoryLabel = $("#categoryAxisList option:selected").val();
    var measureLabels = $("#measureAxisList option:selected");
    var columns = dataLoadNS.filteredData.columns;
    dataLoadNS.TableColumns = [];
    dataLoadNS.TableData = [];
    for (i = 0; i < dataLoadNS.filteredData.data.length; i++) {
        dataLoadNS.TableData.push(dataLoadNS.filteredData.data[i]);
    }
    dataLoadNS.TableColumns.push(jlinq.from(columns).equals("field", categoryLabel).select()[0]);
    for (i = 0; i < measureLabels.length; i++) {
        label = $(measureLabels[i]).val();
        dataLoadNS.TableColumns.push(jlinq.from(columns).equals("field", label).select()[0]);
    }
};

//TODO Do this in one parse
/**
 * Populate the select dom element for the map view.
 * @param div The id of the dom element
 */
ARV.DataLoader.populateSingleSelectForMap = function(div) {
    var columns = ARV.DataLoader.dataJSON.columns;
    if ($("#" + div).is(".select-deselect")) {
        option = $('<option />').val("");
        $("#" + div).append(option);
    }
    for (i = 0; i < columns.length; i++) {
        option = $('<option />').val(columns[i].field).append(columns[i].name);
        $("#" + div).append(option);
    }
    if ($("#" + div).is(".select-deselect")) {
        $("#" + div).chosen({
            allow_single_deselect: true
        });
    } else {
        $("#" + div).chosen();
    }

};
ARV.DataLoader.populateSingleSelectForMap("categoryListForMap");
ARV.DataLoader.populateSingleSelectForMap("latitudeForMap");
ARV.DataLoader.populateSingleSelectForMap("longitudeForMap");
ARV.DataLoader.populateSingleSelectForMap("sizeForMap");


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
ARV.DataLoader.modifyDataForSingleSeries = function() {
    var dataArr = [];
    var selected = $("#measureAxisList option:selected");
    var field = $(selected[0]).val();
    labelField = $("#categoryAxisList option:selected").val();
    var data = ARV.DataLoader.filteredData.data;
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
ARV.DataLoader.updateCategoryArray = function() {
    ARV.defaultCategories[0].category = [];
    var labelField = $("#categoryAxisList option:selected").val();
    var obj = {};
    var i = 0;
    for (i = 0; i < ARV.DataLoader.filteredData.data.length; i++) {
        var dataElement = ARV.DataLoader.filteredData.data[i];
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
ARV.DataLoader.getDataArrayForSeries = function(seriesname) {
    var dataArr = [];
    var obj = {};
    var index = 0;
    for (index = 0; index < ARV.DataLoader.filteredData.data.length; index++) {
        var dataElement = ARV.DataLoader.filteredData.data[index];
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
ARV.DataLoader.updateDatasetArray = function() {
    var dataSet = [];
    var obj = {},
        seriesname;
    var selected = $("#measureAxisList option:selected");
    var index = 0;
    for (index = 0; index < selected.length; index++) {
        seriesname = $(selected[index]).val();
        var data = ARV.DataLoader.getDataArrayForSeries(seriesname);
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
ARV.DataLoader.updateDataForMultiSeries = function() {
    ARV.DataLoader.updateCategoryArray();
    ARV.DataLoader.updateDatasetArray();
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
ARV.DataLoader.updateDataForBubbleChart = function() {
    var dataArr = [],
        obj = {},
        index = 0,
        xValue, yValue, zValue, dataItem, selected = $("#measureAxisList option:selected"),
        x = $(selected[0]).val(),
        y = $(selected[1]).val(),
        z = $(selected[2]).val(),
        labelField = $("#categoryAxisList option:selected").val();

    for (index = 0; index < ARV.DataLoader.filteredData.data.length; index++) {
        dataItem = ARV.DataLoader.filteredData.data[index];
        xValue = parseInt(dataItem[x], 10);
        yValue = parseInt(dataItem[y], 10);
        zValue = parseInt(dataItem[z], 10);
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
ARV.DataLoader.updateDataForMap = function() {
    var dataArr = [],
        obj = {},
        index = 0,
        xValue, yValue, zValue, dataItem, lat = $("#latitudeForMap option:selected").val(),
        long = $("#longitudeForMap option:selected").val(),
        size = $("#sizeForMap option:selected").val(),
        category = $("#categoryListForMap option:selected").val();
    for (index = 0; index < ARV.DataLoader.filteredData.data.length; index++) {
        dataItem = ARV.DataLoader.filteredData.data[index];
        latValue = parseInt(dataItem[lat], 10);
        longValue = parseInt(dataItem[long], 10);
        sizeValue = parseInt(dataItem[size] || 10, 10);
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
ARV.DataLoader.updateDataForVisualizations = function() {
	var dataLoadNS = ARV.DataLoader;
    if (dataLoadNS.filteredData.data.length === 0) {
        $("#chart").html("Select some fields to view data");
        return;
    }
    var noOfSelected = ARV.CG.getNumberOfSelectedMeasureAxis();
    try {
        if (noOfSelected === 1) {
            dataLoadNS.modifyDataForSingleSeries();
        }
        if (noOfSelected > 1) {
            dataLoadNS.modifyDataForSingleSeries();
            dataLoadNS.updateDataForMultiSeries();
            if (noOfSelected === 3) {
                dataLoadNS.updateDataForBubbleChart();
            }
        }
    }
    catch (e) {
        alert(e);
    }
    if ("Map" === $("#chartTypes option:selected").attr("value")) {
        dataLoadNS.updateDataForMap();
    }
    dataLoadNS.createDataForTable();
    ARV.CG.refreshTable();
    ARV.CG.refreshGraph();
};


(function() {
	var dataLoadNS = ARV.DataLoader;
    var data = dataLoadNS.dataJSON.data;
    var columns = dataLoadNS.dataJSON.columns;
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

}());

$("#categoryAxisList").chosen().change(ARV.DataLoader.updateDataForVisualizations);
$("#measureAxisList").chosen().change(ARV.DataLoader.updateDataForVisualizations);
$("#dataUpdater").live("click", function() {
    ARV.DataLoader.updateDataForVisualizations();
});

/**
 * The filtered data
 */
ARV.DataLoader.filteredData = {};
//Deep copy the original data into the filtered data so that the original data does not change
jQuery.extend(ARV.DataLoader.filteredData, ARV.DataLoader.dataJSON);