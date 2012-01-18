
/**
 * @Description The top-level filter namespace.
 * @namespace The top-level filter namespace, <tt>ARV.Filter</tt>. All
 *            the functions related to the filtering the data. The functions in the name space
 *            provide category and measure filtering
 */
ARV.Filter = {};
/**
 * An array that holds all the selected measure axis names
 */
ARV.Filter.selectedMeasureAxis = [];

/**
 * Populates the category filter with all the category values of the selected category axis
 * @param {String} id the id of the category dom element from where the selected category axis is to be taken 
 */
ARV.Filter.addAllCategories = function(id){
	var selected = $("#"+id+ " option:selected");
	var selectedVal = $(selected).val();
	var categories = $("#categoryValues");
	$(categories).empty();
	var i = 0;
	var option;
	var originalData = ARV.DataLoader.dataJSON.data;
	for(i=0;i<originalData.length;i++){
		 var dataItem = originalData[i];
		 option = $('<option />').val(dataItem[selectedVal]).append(dataItem[selectedVal]).attr("selected", "selected");
		 $(categories).append(option);
	}
	$(categories).trigger("liszt:updated");
};

/**
 * Set the value attribute "selected" equal to "selected" for the input element <tt>elem</tt> 
 * @param elem The element for which all the options have to be set to selected
 */
ARV.Filter.setAllSelected = function(elem){
	$(elem).children("option").each(function(){
		$(this).attr("selected","selected");
	});
};

/**
 * Remove the attribute "selected" for the select input element <tt>elem</tt> i.e deselect all the options
 * @param elem The element for which all the options have to be set to deselected
 */
ARV.Filter.setAllDeselected = function(elem){
	$(elem).children("option").each(function(){
		$(this).removeAttr("selected");
	});
};
ARV.Filter.addAllCategories("categoryAxisList");

/**
 * Calculate and return the data filtered after applying filters based selected measure filter values 
 * @param originalData {Object} The data to be filtered
 * @returns {Object} The filtered data 
 */
ARV.Filter.getMeasureFilteredData = function(originalData){
	var filteredData = originalData;
	$(".measure-slider").each(function(){
		var min = $(this).slider("values",0);
		var max = $(this).slider("values",1);
		var measureFeild = $(this).attr("data-measureField");
		filteredData = jlinq.from(filteredData).betweenEquals(measureFeild,min,max).select();
	});
	return filteredData;
};

/**
 * Calculate and return the data filtered after applying filters based selected category filter values 
 * @param originalData {Object} The data to be filtered
 * @returns {Object} The filtered data 
 */
ARV.Filter.getCategoryFilteredData = function(originalData){
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

/**
 * Filter the data and update the data to show the visualization
 */
ARV.Filter.filterData = function(){
	var categoryFilteredData = ARV.Filter.getCategoryFilteredData(ARV.DataLoader.dataJSON.data);
	ARV.DataLoader.filteredData.data = ARV.Filter.getMeasureFilteredData(categoryFilteredData);
	ARV.DataLoader.updateDataForVisualizations();
};

$("#categoryValues").chosen().change(ARV.Filter.filterData);

//toggle if all categories check box is clicked
$("#allCategories").change(function(){
	var filterNS = ARV.Filter;
	if($(this).attr("checked")){
		filterNS.setAllSelected($("#categoryValues"));
	}else{
		filterNS.setAllDeselected($("#categoryValues"));
	}
	$("#categoryValues").trigger("liszt:updated");
	filterNS.filterData();
});

/**
 * Create range slider for the measure fields
 * @param id  {Number} random id is created to append to the slider dom element id. Thus the id of 
 * the slider would be <tt>id</tt>+"Slider" 
 * @param min {Number} The min value of the measure field
 * @param max {Number} The max value of the measure field
 * @param measureFeild {String} The measure field
 */
ARV.Filter.createRangeSlider = function(id,min,max,measureFeild){
	$( "#"+id +"Slider").slider({
		range: true,
		min: min,
		max: max,
		values: [ min, max ],
		stop: function( event, ui ) {
			var minVal = ui.values[ 0 ];
			var maxVal = ui.values[ 1 ];
			$( "#"+id ).val(minVal + " - " + maxVal );
			ARV.Filter.filterData();
		}
	});
	$(  "#"+id ).val( $( "#"+id +"Slider" ).slider( "values", 0 ) +
			" - " + $( "#"+id +"Slider" ).slider( "values", 1 ) );
};

/**
 * Finds the minimum value of the <tt>measureField</tt> from <tt>ARV.DataLoader.filteredData.data</tt>
 * @param measureField {String} The measure field
 * @returns {Number} The minimum value of the <tt>measureField</tt>
 */
ARV.Filter.getMinOfMeasureField = function(measureField){
	var minValObj = jlinq.from(ARV.DataLoader.filteredData.data).min(measureField);
	return minValObj[measureField];
};
/**
 * Finds the maximum value of the <tt>measureField</tt> from <tt>ARV.DataLoader.filteredData.data</tt>
 * @param measureField {String} The measure field
 * @returns {Number} The maximum value of the <tt>measureField</tt>
 */
ARV.Filter.getMaxOfMeasureField = function(measureField){
	var minValObj = jlinq.from(ARV.DataLoader.filteredData.data).max(measureField);
	return minValObj[measureField];
};

/**
 * Creates the measure filteres according to the measure axis selected
 */
ARV.Filter.addMeasureFilters = function(){
	var filterNS = ARV.Filter;
	$("#measureFilter").html("");
	var selected = filterNS.selectedMeasureAxis;
	var i = 0;
	for(i=0;i<selected.length;i++){
		var measureFeild = selected[i];
		var id = "measure"+i;
		var label = $("<label/>").html(measureFeild);
		var slider = $("<div/>").addClass("range-slider").attr("id",id+"Slider").addClass("measure-slider").attr("data-measureField",measureFeild);
		var text = $("<input/>").attr("size","3").attr("type","text").attr("id",id).attr("disabled","disabled").addClass("range-val");
		$("#measureFilter").append(label);
		$("#measureFilter").append(slider).append(text);
		$("#measureFilter").append("<br/>");
		min = filterNS.getMinOfMeasureField(measureFeild);
		max = filterNS.getMaxOfMeasureField(measureFeild);
		filterNS.createRangeSlider(id,min,max,measureFeild);
	}
	
};

// When the category axis is changed populate the category filter
$("#categoryAxisList").chosen().change(function(){
	ARV.Filter.addAllCategories($(this).attr("id"));
});

/**
 * The function is called when measure axis is changed.It changes <tt>ARV.Filter.selectedMeasureAxis</tt> 
 */
ARV.Filter.updateSeletectedMeasureAxis = function(){
	var filterNS = ARV.Filter;
	var selected = $("#measureAxisList option:selected");
	filterNS.selectedMeasureAxis = [];
	var i =0;
	for(i = 0;i<selected.length;i++){
		filterNS.selectedMeasureAxis.push($(selected[i]).val());
	}
};
//When measure axis is changed update the ARV.Filter.selectedMeasureAxis and add measure filters
$("#measureAxisList").chosen().change(function(){
	var filterNS = ARV.Filter;
	filterNS.updateSeletectedMeasureAxis();
	filterNS.addMeasureFilters();
});

//if category list for map is changed update the category filters 
$("#categoryListForMap").chosen().change(function(){
	ARV.Filter.addAllCategories($(this).attr("id"));
});

/**
 * Check if the <tt>val</tt> is defined and push in <tt>arr</tt>
 * @param arr {Array} The array in which the <tt>val</tt> is to be pushed
 * @param val {Number} The value to be pushed
 */
ARV.Filter.checkThenPush = function(arr,val){
	if(val){
		arr.push(val);
	}
};

/**
 * Update the selected measure axis 
 */
ARV.Filter.updateSelectedMeasureAxisForMap = function(){
	var filterNS = ARV.Filter;
	filterNS.selectedMeasureAxis = [];
	filterNS.checkThenPush(filterNS.selectedMeasureAxis,ARV.Utility.getSelectedValue("latitudeForMap"));
	filterNS.checkThenPush(filterNS.selectedMeasureAxis,ARV.Utility.getSelectedValue("longitudeForMap"));
	filterNS.checkThenPush(filterNS.selectedMeasureAxis,ARV.Utility.getSelectedValue("sizeForMap"));
};

/**
 * Update the measure filters for map
 */
ARV.Filter.updateMeasureFiltersForMap = function(){
	ARV.Filter.updateSelectedMeasureAxisForMap();
	ARV.Filter.addMeasureFilters();
};
$("#latitudeForMap").chosen().change(ARV.Filter.updateMeasureFiltersForMap);
$("#longitudeForMap").chosen().change(ARV.Filter.updateMeasureFiltersForMap);
$("#sizeForMap").chosen().change(ARV.Filter.updateMeasureFiltersForMap);
ARV.Filter.updateSeletectedMeasureAxis();
ARV.Filter.addMeasureFilters();
