ARV.addAllCategories = function(){
	var selected = $("#categoryAxisList option:selected");
	var selectedVal = $(selected).val();
	var categories = $("#categoryValues");
	$(categories).empty();
	var i = 0;
	var option;
	var originalData = ARV.dataJSON.data;
	for(i=0;i<originalData.length;i++){
		 var dataItem = originalData[i]
		 option = $('<option />').val(dataItem[selectedVal]).append(dataItem[selectedVal]).attr("selected", "selected");
		 $(categories).append(option);
	}
	$(categories).trigger("liszt:updated");
};
ARV.setAllSelected = function(elem){
	$(elem).children("option").each(function(){
		$(this).attr("selected","selected");
	});
};
ARV.setAllDeselected = function(elem){
	$(elem).children("option").each(function(){
		$(this).removeAttr("selected");
	});
};
ARV.addAllCategories();

ARV.getMeasureFilteredData = function(originalData){
	var filteredData = originalData;
	$(".measure-slider").each(function(){
		var min = $(this).slider("values",0);
		var max = $(this).slider("values",1);
		var measureFeild = $(this).attr("data-measureField");
		filteredData = jlinq.from(filteredData).betweenEquals(measureFeild,min,max).select();
	});
	return filteredData;
};
ARV.getCategoryFilteredData = function(originalData){
	var selected = $("#categoryValues option:selected");
	var category = $("#categoryAxisList option:selected").val();
	var filteredData = [];
	var i = 0;
	for(i=0;i<selected.length;i++){
		var categoryValue = $(selected[i]).val();
		var dataItems = jlinq.from(originalData).equals(category,categoryValue).select();
		var j =0;
		for(j=0;j<dataItems.length;j++){
			filteredData.push(dataItems[j]);
		}
		
	}
	return filteredData;
};
ARV.filterData = function(){
	var categoryFilteredData = ARV.getCategoryFilteredData(ARV.dataJSON.data);
	ARV.filteredData.data = ARV.getMeasureFilteredData(categoryFilteredData);
	ARV.updateDataForVisualizations();
};
$("#categoryValues").chosen().change(ARV.filterData);
$("#allCategories").change(function(){
	if($(this).attr("checked")){
		ARV.setAllSelected($("#categoryValues"));
	}else{
		ARV.setAllDeselected($("#categoryValues"));
	}
	$("#categoryValues").trigger("liszt:updated");
	ARV.filterData();
});
ARV.createRangeSlider = function(id,min,max,measureFeild){
	$( "#"+id +"Slider").slider({
		range: true,
		min: min,
		max: max,
		values: [ min, max ],
		stop: function( event, ui ) {
			var minVal = ui.values[ 0 ];
			var maxVal = ui.values[ 1 ];
			$( "#"+id ).val(minVal + " - " + maxVal );
			ARV.filterData();
		}
	});
	$(  "#"+id ).val( $( "#"+id +"Slider" ).slider( "values", 0 ) +
			" - " + $( "#"+id +"Slider" ).slider( "values", 1 ) );
};
ARV.getMinOfMeasureField = function(measureField){
	var minValObj = jlinq.from(ARV.filteredData.data).min(measureField);
	return minValObj[measureField];
};
ARV.getMaxOfMeasureField = function(measureField){
	var minValObj = jlinq.from(ARV.filteredData.data).max(measureField);
	return minValObj[measureField];
};
ARV.addMeasureFilters = function(){
	$("#measureFilter").html("");
	var selected = $("#measureAxisList option:selected");
	var i = 0;
	for(i=0;i<selected.length;i++){
		var measureFeild = $(selected[i]).val();
		var id = "measure"+i;
		var label = $("<label/>").html(measureFeild);
		var slider = $("<div/>").addClass("range-slider").attr("id",id+"Slider").addClass("measure-slider").attr("data-measureField",measureFeild);
		var text = $("<input/>").attr("size","3").attr("type","text").attr("id",id).attr("disabled","disabled").addClass("range-val");
		$("#measureFilter").append(label);
		$("#measureFilter").append(slider).append(text);
		$("#measureFilter").append("<br/>");
		min = ARV.getMinOfMeasureField(measureFeild);
		max = ARV.getMaxOfMeasureField(measureFeild);
		ARV.createRangeSlider(id,min,max,measureFeild);
	}
};
ARV.addMeasureFilters();
$("#categoryAxisList").chosen().change(ARV.addAllCategories);
$("#measureAxisList").chosen().change(ARV.addMeasureFilters);