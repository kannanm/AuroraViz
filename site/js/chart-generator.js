ARV.paletteColorCounter = 0;
ARV.paletteChanged = false;
ARV.styles = {
    captionSize: "20",
    captionColor: "#000000",
    canvasFillColor: "#fffff",
    canvasBorderColor: "#111",
    canvasBorderThickness: "0",
    chartFillColor: "#fffff",
    horAxisLabelColor: "#000000",
    horAxisLabelSize: "12",
    horAxisColor: "#000000",
    horAxisThickness: "0",
    verAxisLabelColor: "#000000",
    verAxisLabelSize: "12",
    verAxisColor: "#000000",
    verAxisThickness: "0",
    verGridShow: "checked",
    verGridColor: "#cccccc",
    verGridLabelShow: "checked",
    verGridThickness: "1",
    horGridShow: "checked",
    horGridColor: "#cccccc",
    horGridLabelShow: "checked",
    horGridThickness: "1"
};
ARV.commonProperties = {
    caption: "Profit (Yearly)",
    yAxisName: "Amount (in billions)",
    xAxisName: "Years",
    width: 600,
    height: 400,
    type: "v",
    toolTip: true,
    showLabels: true,
    showValues: true,
    labelFontSize: "10",
    labelFontColor: "#000000",
    labelRotateAngle: "0",
    palette: "presetPalette",
    paletteColors: [],
    presetPalette: "Plain",
    isLineStyleStep: false,
    pieRadius: "100",
    dotSize: "5",
    lineWidth: "2",
    lineColor: "#000000",
    outerRadius: "100",
    innerRadius: "50",
    interpolated: false,
    segmented: true,
    areaColor: "#1F77B4",
    showLegends : true

};
ARV.defaultData = {
    BarGraph: [
        {
        label: "2005",
        value: 5},
    {
        label: "2006",
        value: 10},
    {
        label: "2007",
        value: 8},
    {
        label: "2008",
        value: 12},
    {
        label: "2009",
        value: 2}
    ],
    BubbleGraph: [
        {
        "x": 30,
        "y": 1.3,
        "z": 116,
        "label": "Traders",
        "toolTipText": "Traders"},
    {
        "x": 32,
        "y": 3.5,
        "z": 99,
        "label": "Farmers",
        "toolTipText": "Farmers"},
    {
        "x": 8,
        "y": 2.1,
        "z": 33,
        "label": "Individuals",
        "toolTipText": "Individuals"},
    {
        "x": 62,
        "y": 2.5,
        "z": 72,
        "label": "MBH",
        "toolTipText": "Medium Business Houses"},
    {
        "x": 78,
        "y": 2.3,
        "z": 55,
        "label": "Corporate",
        "toolTipText": "Corporate Group A"}
    ],
    BulletGraph: [
        {
        title: "Revenue",
        toolTipText: "US$, in thousands",
        ranges: [150],
        measures: [270],
        markers: [250]},
    {
        title: "Profit",
        toolTipText: "%",
        ranges: [20],
        measures: [23],
        markers: [26]},
    {
        title: "Order Size",
        toolTipText: "US$, average",
        ranges: [350],
        measures: [320],
        markers: [550]},
    {
        title: "New Customers",
        toolTipText: "count",
        ranges: [1400, 2000, 2500],
        measures: [1650],
        markers: [2100]},
    {
        title: "Satisfaction",
        toolTipText: "out of 5",
        ranges: [3.5, 4.25, 5],
        measures: [4.7],
        markers: [4.4]}
         ]

};
ARV.defaultCategories = [
    {
    category: [
        {
        label: "Hardware"},
    {
        label: "Software"},
    {
        label: "Service"},
    {
        label: "HR"}
    ]}
];
ARV.defaultDataSet = [
    {
    seriesname: "Domestic",
    color: "8EAC41",
    data: [
        {
        value: "84"},
    {
        value: "207"},
    {
        value: "116"},
    {
        value: "100"}
    ]},
{
    seriesname: "International",
    color: "607142",
    data: [
        {
        value: "116"},
    {
        value: "237"},
    {
        value: "83"},
    {
        value: "90"}
    ]}
];
ARV.JsonMap = {
    BarGraph: "BarGraph",
    LineGraph: "BarGraph",
    PieGraph: "BarGraph",
    DonutGraph: "BarGraph",
    BubbleGraph: "BubbleGraph",
    MultibarGraph: "MultiBarGraph",
    MultilineGraph: "MultiBarGraph",
    AreaGraph: "BarGraph",
    MultiAreaGraph: "MultiBarGraph",
    StackedAreaGraph: "MultiBarGraph",
    BulletGraph: "BulletGraph"
};
ARV.ChartTypeMap = {
    BarGraph: "BarGraph",
    LineGraph: "LineGraph",
    PieGraph: "PieGraph",
    DonutGraph: "DonutGraph",
    MultibarGraph: "BarGraph",
    MultilineGraph: "LineGraph",
    BubbleGraph: "BubbleGraph",
    AreaGraph: "AreaGraph",
    MultiAreaGraph: "AreaGraph",
    StackedAreaGraph: "StackedAreaGraph",
    BulletGraph: "BulletGraph"
};
ARV.singleToMultiMap = {
	BarGraph: "MultibarGraph",
	LineGraph: "MultilineGraph",
	AreaGraph:"MultiAreaGraph",
	PieGraph:"PieGraph",
	DonutGraph:"DonutGraph",
	StackedAreaGraph:"StackedAreaGraph",
	BubbleGraph:"BubbleGraph",
	BulletGraph: "BulletGraph"
};


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
    var index, param, value;
    $("#chart").html("");
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

ARV.initializeColorPicker = function(){
	$(".colorPicker").miniColors({
				change:function(hex,rgb){
					ARV.modifyJSON();
				}
	});    
};

ARV.addColorsDiv = function() {
    ARV.paletteChanged = false;
    var selectedVal = $("#presetPalette option:selected").attr("value");
    var colors = AR.Utility.palettes[selectedVal];
    var colorsDiv = $("#colors");
    colorsDiv.html("");
    for (ARV.paletteColorCounter = 0; ARV.paletteColorCounter < colors.length; ARV.paletteColorCounter++) {
        colorsDiv.append('<input value="' + colors[ARV.paletteColorCounter] + '" class="colorInput colorPicker" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        colorsDiv.append('<button id="color' + ARV.paletteColorCounter + '"  class="delColorBtn">x</button><br/>');
    }
    colorsDiv.append('<button id="addColorBtn" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></button>');

    ARV.initializeColorPicker();
};

ARV.createSliders = function() {
    $(".slider").each(function() {
        var sliderID = $(this).attr("id");
        var textID = sliderID.substr(0, sliderID.indexOf("Slider"));
        var min = 0,
            max = 40;
        if (sliderID.indexOf("Rotate") >= 0) {
            min = -90;
            max = 90;
        }
        $(this).slider({
            range: "max",
            min: min,
            max: max,
            value: 2,
            slide: function(event, ui) {
                $("#" + textID).val(ui.value);
                ARV.modifyJSON();
            }
        });
        $(this).slider("value", $("#" + textID).val()); /* $( "#"+textID).val($(this).slider( "value" ) ); */
    });
};

ARV.addEventListeners = function() {
    $(".delColorBtn").live("click", function() {
        var izzy = $(this).prev();
        izzy.prev().remove();
        izzy.remove();
        $(this).remove();
    });
    $("#colors").live("click", function() {
        console.log("changed");
        ARV.paletteChanged = true;
    });
    $("#addColorBtn").live("click", function() {
        $(this).before('<input value="#ffffff" class="colorInput colorPicker" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        $(this).before('<button id="color' + ARV.paletteColorCounter+++'"  class="delColorBtn">x</button><br/>');
        ARV.initializeColorPicker();
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
        var selectedVal = $("#chartTypes option:selected").attr("value");
        $("dataDiv").html("");
        $(".tipsy").remove();
        if (selectedVal === "table"){
        	ARV.refreshTable();
        }else if (selectedVal !== "select" ) {
            $("#dataDiv").html(ARV.con[selectedVal + "ChartOptions"])
        }else {
            $("#dataDiv").html("Please select a chart");
        }
        ARV.createSliders();
        ARV.initializeColorPicker();

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

ARV.init = function() {
    for (palette in AR.Utility.palettes) {
        var option = $('<option />').val(palette).append(palette);
        if (palette === "Water") {
            option.attr("selected", "selected")
        }
        $('#presetPalette').append(option);
    }
    ARV.createSliders();
    ARV.addColorsDiv();
    ARV.addEventListeners();
    $('#dataUpdater').trigger('click');
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
ARV.init();

