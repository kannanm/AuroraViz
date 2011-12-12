
ARV.dataJSON = {
		id: "4ed630d8ed9be9723687620d",
		columns:[
					{id:"company", name:"Company", field:"company", width:120, editor:TextCellEditor},
		            {id:"sales", name:"Sales", field:"sales", width:80, editor:TextCellEditor},
					{id:"revenue", name:"Revenue", field:"revenue", width:80,editor:TextCellEditor},
					{id:"profit", name:"Profit", field:"profit", width:80,editor:TextCellEditor},
				],
		data:[
		      {
		    	company:"LG",
		    	sales:41,
		    	revenue:22,
		    	profit:10
		      },
		      {
			    company:"Samsung",
			    sales:24,
			    revenue:21,
			    profit:20
			   },
			   {
			    company:"Philips",
			    sales:42,
			    revenue:22,
			    profit:10
			   },
			   {
			    company:"GE",
			    sales:12,
			    revenue:2,
			    profit:1
			   },
			 ]
};
var options = {
		editable: true,
		enableAddRow: true,
		enableCellNavigation: true,
		enableColumnReorder:true,
		asyncEditorLoading: false,
        autoEdit: false,
	};
	
var data = ARV.dataJSON.data;
var columns = ARV.dataJSON.columns;
var i = 0;
var option;
ARV.grid = new Slick.Grid("#dataGrid", data, columns, options);
ARV.grid.setSelectionModel(new Slick.CellSelectionModel());
ARV.grid.onAddNewRow.subscribe(function(e, args) {
    var item = args.item;
    var column = args.column;
    ARV.grid.invalidateRow(data.length);
    data.push(item);
    ARV.grid.updateRowCount();
    ARV.grid.render();
});
var i = 0; 
for(i=0;i<columns.length;i++){
	option = $('<option />').val(columns[i].field).append(columns[i].name);
	if(columns[i].field === "sales")
	{
		option.attr("selected","selected");
	}
	$("#measureAxisList").append(option);
}
for(i=0;i<columns.length;i++){
	option = $('<option />').val(columns[i].field).append(columns[i].name);
	if(columns[i].field === "company")
	{
		option.attr("selected","selected");
	}
	$("#categoryAxisList").append(option);	
}
$(".chzn-select").chosen();

// TODO: Disable field if chosen in on of the list 

//$("#measureAxisList").chosen().change(function(){
//	var selected = $("#measureAxisList option:selected");
//	var noOfSelected = selected.length;
//	console.log(noOfSelected);	
//	$("#categoryAxisList option").attr("disabled",false);
//	for(i=0;i<noOfSelected;i++){
//		var selectedItem = $(selected[i]).val();
//		var a = $("#categoryAxisList option").filter(function() {
//    		return $(this).val()=== selectedItem;
//		}).attr("disabled",true);
//	}
//});

//$("#measureAxisList").chosen().change(function(){
//	ARV.userDataDefined = true;
//	ARV.createChartJSON();
//});	

ARV.modifyDataForSingleSeries = function(){
	ARV.defaultData.BarGraph = [];
	var selected = $("#measureAxisList option:selected");
		var field = $(selected[0]).val();
		labelField = $("#categoryAxisList option:selected").val();
		for (i=0;i<data.length;i++){
			var dataElement = data[i];
			var value = parseInt(dataElement[field],10);
			if(value == NaN){
				alert("The measure fields should have a number");
			}
			label = dataElement[labelField];
			obj = {
					value:value,
					label:label
				}
			ARV.defaultData.BarGraph.push(obj);
		}
};
ARV.updateCategoryArray =function(){
	ARV.defaultCategories[0].category = [];
	var labelField = $("#categoryAxisList option:selected").val();
	var obj = {};
	var i = 0; 
	for(i=0;i<ARV.dataJSON.data.length;i++){
		var dataElement = ARV.dataJSON.data[i];
		category = dataElement[labelField];
		obj ={
			label:category
		}
		ARV.defaultCategories[0].category.push(obj);
	};
};
ARV.getDataArrayForSeries = function(seriesname){
	var dataArr = [];
	var obj ={};
	var index = 0; 
	for(index=0;index<ARV.dataJSON.data.length;index++){
		var dataElement = ARV.dataJSON.data[index]; 
		obj = {
			value:dataElement[seriesname]
		};
		dataArr.push(obj);
	}
	return dataArr;
};
ARV.updateDatasetArray = function(){
	ARV.defaultDataSet = [];
	var obj = {},seriesname;
	var selected = $("#measureAxisList option:selected");
	var index = 0; 
	for(index=0;index<selected.length;index++){
		seriesname = $(selected[index]).val();
		var data = ARV.getDataArrayForSeries(seriesname);
		obj ={
			seriesname : seriesname,
			data : data
		}
		ARV.defaultDataSet.push(obj);
	}
};
ARV.modifyDataForMultiSeries = function(){
	ARV.updateCategoryArray();
	ARV.updateDatasetArray();
};
ARV.modifyDataForBubbleChart = function(){
	ARV.defaultData.BubbleGraph = [];
	var obj = {};
	var index = 0;
	var selected = $("#measureAxisList option:selected");
	var x = $(selected[0]).val();
	var y = $(selected[1]).val();
	var z = $(selected[2]).val();
	var	labelField = $("#categoryAxisList option:selected").val();
	for(index=0;index<ARV.dataJSON.data.length;index++){
		var dataItem = ARV.dataJSON.data[index];
		obj={
			x: dataItem[x],
			y: dataItem[y],
			z: dataItem[z],
			label: dataItem[labelField]
		}
		ARV.defaultData.BubbleGraph.push(obj);
	}
};
$("#dataUpdater").click(function(){
	var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
	try{
	if(noOfSelected === 1){
		ARV.modifyDataForSingleSeries();
	}
	if(noOfSelected>1){
		ARV.modifyDataForSingleSeries();
		ARV.modifyDataForMultiSeries();
		if(noOfSelected === 3){
			ARV.modifyDataForBubbleChart();
		}
	} 
	}
	catch(e){
		alert(e);
	}
	ARV.modifyJSON();
});
