ARV.paletteColorCounter = 0;
ARV.paletteChanged = false;
ARV.getData = function(chartType) {
    var graphDef = {},
        prop;
    graphDef.style = ARV.styles;
    for (prop in ARV.commonProperties) {
        graphDef[prop] = ARV.commonProperties[prop];
    }
    if (ARV.userDataDefined) {

    } else {
        graphDef.data = ARV.defaultData[chartType];
        if (chartType === "MultiBarGraph") {
            graphDef.categories = ARV.defaultCategories;
            graphDef.dataset = ARV.defaultDataSet;
        }
    }
    return graphDef;
};
ARV.updateStyleProperties = function() {
    var styles = ARV.graphDef.style,
        prop;
    for (prop in styles) {
        var elem = $("#" + prop);
        var value = elem.val();
        if (prop === "verGridShow" || prop === "horGridShow" || prop === "verGridLabelShow" || prop === "horGridLabelShow") {
            value = elem.attr("checked")?true:false;
        }
        if (styles.hasOwnProperty(prop)) {
            ARV.graphDef.style[prop] = value;
        }
    }
};
ARV.updateGraphProperties = function() {
    var prop;
    for (prop in ARV.graphDef) {
        var elem = $("#" + prop);
        var value = elem.val();
        if (prop === "toolTip" || prop === "showLabels" || prop === "showValues" || prop === "isLineStyleStep" || prop === "interpolated" || prop === "segmented"|| prop === "showLegends") {
            value = elem.attr("checked")?true:false;
        }
        if (ARV.graphDef.hasOwnProperty(prop) && value !== undefined) {
            ARV.graphDef[prop] = value;
        }
    }
};

ARV.checkPaletteChanged = function() {
    if (ARV.paletteChanged) {
        var colors = [];
        $("#colors input").each(function() {
            colors.push($(this).val());
        });
        ARV.graphDef.presetPalette = "custom";
        ARV.graphDef.paletteColors = colors;
    }
};

ARV.getNumberOfSelectedMeasureAxis = function(){
	var selected = $("#measureAxisList option:selected");
	var noOfSelected = selected.length;
	return noOfSelected;
};

ARV.getGraphType = function(){
	var graphType = $("#chartTypes option:selected").attr("value");
    var graphName = graphType + "Graph";
    var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
    if(noOfSelected>1){
    	graphName = ARV.singleToMultiMap[graphName];
    }
    return graphName;
};

ARV.modifyJSON = function(div) {
	$("#chart").html("<img src='css/images/loading.gif' class='loading'/>");
    var index, param, value;
    var graphName = ARV.getGraphType();
    ARV.graphDef = ARV.getData(ARV.JsonMap[graphName]);
    ARV.updateStyleProperties();
    ARV.updateGraphProperties();
    ARV.checkPaletteChanged();
    ARV.showGraph(graphName,div);
};

ARV.showGraph = function(graphName,div, graphDef) {
    graph = new AR[ARV.ChartTypeMap[graphName]](graphDef || ARV.graphDef);
    graph.render(div || "chart");
};

ARV.addColorsDiv = function() {
    ARV.paletteChanged = false;
    var selectedVal = $("#presetPalette option:selected").attr("value");
    var colors = AR.Utility.palettes[selectedVal];
    var colorsDiv = $("#colors");
    colorsDiv.html("");
    for (ARV.paletteColorCounter = 0; ARV.paletteColorCounter < colors.length; ARV.paletteColorCounter++) {
        colorsDiv.append('<input value="' + colors[ARV.paletteColorCounter] + '" class="colorInput colorPicker" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        colorsDiv.append('<button id="color' + ARV.paletteColorCounter + '"  class="delColorBtn">x</button>');
    }
    colorsDiv.append('<button id="addColorBtn" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></button>');

    ARV.initializeColorPicker(ARV.colorPickerCB.chartGenerator);
};

ARV.reset = function(){
   GUnload();
    $("#chart").css("background-color","#ffffff");
    $("#dataDiv").html("");
    $(".tipsy").remove();
};
ARV.toggleParameters = function(isMap){
	if(isMap){
		$("#MapAxisSelector").css("display","inline");
		$("#defaultAxisSelector").css("display","none");
	}
	else{
		$("#MapAxisSelector").css("display","none");
		$("#defaultAxisSelector").css("display","inline");
	}
}
ARV.performActionsBasedOnChart = function(chartType){
	switch(chartType){
		case "table":
			ARV.refreshTable();
			ARV.toggleParameters(false);
			break;
		case "select":
			 $("#dataDiv").html("Please select a chart");
			 ARV.toggleParameters(false);
			 break;
		case "Map":
			ARV.toggleParameters(true);
			 $("#dataDiv").html(ARV.con[chartType + "ChartOptions"])
			break
		default:
			 $("#dataDiv").html(ARV.con[chartType + "ChartOptions"])
			 ARV.toggleParameters(false);
	}
};
ARV.addEventListeners = function() {
    $(".delColorBtn").live("click", function() {
        var izzy = $(this).prev();
        izzy.prev().remove();
        izzy.remove();
        $(this).remove();
    });
    $("#colors").live("click", function() {
        ARV.paletteChanged = true;
    });
    $("#addColorBtn").live("click", function() {
        $(this).before('<input value="#ffffff" class="colorInput colorPicker" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        $(this).before('<button id="delColor' + (ARV.paletteColorCounter) +'"  class="delColorBtn">x</button>');
        $("#delColor"+ (ARV.paletteColorCounter)).button();
        ARV.paletteColorCounter++;
        ARV.initializeColorPicker(ARV.colorPickerCB.chartGenerator);
    });

    $("#presetPalette option").click(function() {
        ARV.addColorsDiv();
    });

    $("button").button();
    $("#generate").click(function(event) {
        $(".tipsy").remove();
        ARV.modifyJSON();
    });
    $("#chartTypes option").click(function() {
    	ARV.reset();
        var selectedVal = $("#chartTypes option:selected").attr("value");
        ARV.performActionsBasedOnChart(selectedVal);
        ARV.createSliders(ARV.createSlidersCB.chartGenerator);
        ARV.initializeColorPicker(ARV.colorPickerCB.chartGenerator);

    });

    $("#accordion").change(function() {
    	ARV.refreshGraph();
    });
    $("#accordion input").keyup(function() {
    	ARV.refreshGraph();
    });
    $("#colors").live("click", function() {
    	ARV.refreshGraph();
    });
};

ARV.initChartGenerator = function() {
    for (palette in AR.Utility.palettes) {
        var option = $('<option />').val(palette).append(palette);
        if (palette === "Water") {
            option.attr("selected", "selected")
        }
        $('#presetPalette').append(option);
    }
    ARV.createSliders(ARV.createSlidersCB.chartGenerator);
    ARV.addColorsDiv();
    ARV.addEventListeners();
    $("#measureAxisList").chosen().trigger("change");
};

ARV.refreshTable = function(){
	var table = $("<div/>").attr("id","tableDiv");
	var title = $("<label/>").html($("#caption").val()).addClass("tableHeading");
	var div = $("<div/>").attr("id","tableCont");
	$("#chart").html("");
	table.append(title);
	table.append(div);
	$("#chart").append(table);
	ARV.grid = new Slick.Grid("#tableCont", ARV.TableData, ARV.TableColumns, ARV.gridOptions);
}
ARV.refreshGraph = function(){
	var selectedVal = $("#chartTypes option:selected").attr("value");
	if(selectedVal !== "table"){
		ARV.modifyJSON();
	}

};

