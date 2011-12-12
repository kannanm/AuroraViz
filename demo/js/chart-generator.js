ARV.paletteColorCounter = 0;
ARV.paletteChanged = false;
ARV.styles = {
    captionSize: "20",
    captionColor: "#000000",
    canvasFillColor: "#fffff",
    canvasBorderColor: "#cccccc",
    canvasBorderThickness: "1",
    chartFillColor: "#fffff",
    horAxisLabelColor: "#000000",
    horAxisLabelSize: "12",
    horAxisColor: "#000000",
    horAxisThickness: "2",
    verAxisLabelColor: "#000000",
    verAxisLabelSize: "12",
    verAxisColor: "#000000",
    verAxisThickness: "2",
    verGridShow: "checked",
    verGridColor: "#cccccc",
    verGridLabelShow: "checked",
    verGridThickness: "1",
    horGridShow: "checked",
    horGridColor: "#cccccc",
    horGridLabelShow: "checked",
    horGridThickness: "1"
    //        legendfontSize : "12",
    //        legendFontColor : "#000000",
    //        legendBorderColor : "#000000",
    //        legendBorderThickness : "1",
    //        legendBgColor : "#ffffff"
};
ARV.commonProperties = {
    caption: "Profit (Yearly)",
    yAxisName: "Amount (in billions)",
    xAxisName: "Years",
    width: 800,
    height: 700,
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
    pieRadius: "200",
    dotSize: "2",
    lineWidth: "2",
    lineColor: "#000000",
    outerRadius: "200",
    innerRadius: "100",
    interpolated: false,
    segmented: true,
    areaColor: "#1F77B4"

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
            value = elem.attr("checked");
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
        if (prop === "toolTip" || prop === "showLabels" || prop === "showValues" || prop === "isLineStyleStep" || prop === "interpolated" || prop === "segmented") {
            value = elem.attr("checked");
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
	var graphType = $("select option:selected").attr("value");
    var graphName = graphType + "Graph";
    var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
    if(noOfSelected>1){
    	graphName = ARV.singleToMultiMap[graphName];
    }
    return graphName;
};

ARV.modifyJSON = function() {
    var index, param, value;
    $("#chart").html("");
    var graphName = ARV.getGraphType();
    ARV.graphDef = ARV.getData(ARV.JsonMap[graphName]);
    ARV.updateStyleProperties();
    ARV.updateGraphProperties();
    ARV.checkPaletteChanged();
    ARV.showGraph(graphName);
};

ARV.showGraph = function(graphName) {
    graph = new AR[ARV.ChartTypeMap[graphName]](ARV.graphDef);
    graph.render("chart");
};

ARV.addColorsDiv = function() {
    ARV.paletteChanged = false;
    var selectedVal = $("#presetPalette option:selected").attr("value");
    var colors = AR.Utility.palettes[selectedVal];
    var colorsDiv = $("#colors");
    colorsDiv.html("");
    for (ARV.paletteColorCounter = 0; ARV.paletteColorCounter < colors.length; ARV.paletteColorCounter++) {
        colorsDiv.append('<input value="' + colors[ARV.paletteColorCounter] + '" class="colorInput izzyColor" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        colorsDiv.append('<button id="color' + ARV.paletteColorCounter + '"  class="delColorBtn ui-state-default ui-corner-all"><span class="ui-icon ui-icon-trash"></span></button>');
    }
    colorsDiv.append('<button id="addColorBtn" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></button><br/>');
    izzyColor();
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
    $("#accordion").accordion({
        header: "h3",
        autoHeight: false,
        navigation: true
    });
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
        $(this).before('<input value="#ffffff" class="colorInput izzyColor" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        $(this).before('<button id="color' + ARV.paletteColorCounter+++'"  class="delColorBtn ui-state-default ui-corner-all"><span class="ui-icon ui-icon-trash"></span></button>');
        izzyColor();
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
        if (selectedVal !== "select") {
            $("#dataDiv").html(ARV.con[selectedVal + "ChartOptions"])
        } else {
            $("#dataDiv").html("Please select a chart");
        }
        ARV.createSliders();
        izzyColor();

    });

    $("#tabs").tabs();
    $("#accordion").change(function() {
        ARV.modifyJSON();
    });
    $("#accordion input").keyup(function() {
        console.log("changed");
        ARV.modifyJSON();
    });
    $("#colors").live("click", function() {
        console.log("changed");
        ARV.modifyJSON();
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
    ARV.modifyJSON();
    ARV.addColorsDiv();
    ARV.addEventListeners();
};

ARV.init();

/*// This example was created using Protovis & jQuery
 // Base64 provided by http://www.webtoolkit.info/
 function encode_as_img_and_link(){
  // Add some critical information
  $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

  var svg = '<svg height="560" width="870" stroke-width="1.5" stroke="none" fill="none" font-family="sans-serif" font-size="10px"><rect fill="rgb(255,255,255)" height="520" width="830" y="20" x="20"></rect><g transform="translate(20, 20)"><rect fill="rgb(255,255,255)" height="400" width="750" y="60" x="60"></rect><g transform="translate(60, 60)"><line stroke-width="2" stroke="rgb(204,204,204)" y2="400" x2="750" y1="400" x1="0" shape-rendering="crispEdges"></line></g><g transform="translate(60, 60)"><line stroke-width="2" stroke="rgb(204,204,204)" y2="400" x2="0" y1="0" x1="0" shape-rendering="crispEdges"></line></g><g transform="translate(60, 60)"><text style="font: 20pt Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(375, -20)" y="-3" pointer-events="none">Profit (Yearly)</text></g><g transform="translate(60, 60)"><text style="font: 12pt Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(375, 450)" y="-3" pointer-events="none">Years</text></g><g transform="translate(60, 60)"><text style="font: 12pt Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(-30, 200) rotate(-90)" y="-3" pointer-events="none">Amount (in billions)</text></g><g transform="translate(60, 60)"><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="59.166666666666664" y1="0" x1="59.166666666666664" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="118.33333333333333" y1="0" x1="118.33333333333333" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="177.5" y1="0" x1="177.5" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="236.66666666666666" y1="0" x1="236.66666666666666" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="295.83333333333337" y1="0" x1="295.83333333333337" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="355" y1="0" x1="355" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="414.1666666666667" y1="0" x1="414.1666666666667" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="473.3333333333333" y1="0" x1="473.3333333333333" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="532.5" y1="0" x1="532.5" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="591.6666666666667" y1="0" x1="591.6666666666667" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="650.8333333333333" y1="0" x1="650.8333333333333" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="400" x2="710" y1="0" x1="710" shape-rendering="crispEdges"></line></g><g transform="translate(60, 60)"><line stroke-width="1" stroke="rgb(204,204,204)" y2="370" x2="750" y1="370" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="340" x2="750" y1="340" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="310" x2="750" y1="310" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="280" x2="750" y1="280" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="250" x2="750" y1="250" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="220" x2="750" y1="220" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="190" x2="750" y1="190" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="160" x2="750" y1="160" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="130" x2="750" y1="130" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="100" x2="750" y1="100" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="70" x2="750" y1="70" x1="0" shape-rendering="crispEdges"></line><line stroke-width="1" stroke="rgb(204,204,204)" y2="40" x2="750" y1="40" x1="0" shape-rendering="crispEdges"></line></g><g transform="translate(60, 60)"><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 370)" dy=".35em" x="-3" pointer-events="none">1</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 340)" dy=".35em" x="-3" pointer-events="none">2</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 310)" dy=".35em" x="-3" pointer-events="none">3</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 280)" dy=".35em" x="-3" pointer-events="none">4</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 250)" dy=".35em" x="-3" pointer-events="none">5</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 220)" dy=".35em" x="-3" pointer-events="none">6</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 190)" dy=".35em" x="-3" pointer-events="none">7</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 160)" dy=".35em" x="-3" pointer-events="none">8</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 130)" dy=".35em" x="-3" pointer-events="none">9</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 100)" dy=".35em" x="-3" pointer-events="none">10</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 70)" dy=".35em" x="-3" pointer-events="none">11</text><text text-anchor="end" fill="rgb(0,0,0)" transform="translate(0, 40)" dy=".35em" x="-3" pointer-events="none">12</text></g><g transform="translate(60, 60)"><a xlink:title="5"><rect fill="rgb(34,102,187)" height="150" width="72" y="250" x="30"></rect></a><a xlink:title="10"><rect fill="rgb(51,136,221)" height="300" width="72" y="100" x="174"></rect></a><a xlink:title="8"><rect fill="rgb(85,170,238)" height="240" width="72" y="160" x="318"></rect></a><a xlink:title="12"><rect fill="rgb(187,221,238)" height="360" width="72" y="40" x="462"></rect></a><a xlink:title="2"><rect fill="rgb(17,51,85)" height="60" width="72" y="340" x="606"></rect></a></g><g transform="translate(60, 60)"><text text-anchor="middle" fill="rgb(0,0,0)" transform="translate(66, 250)" y="-3" pointer-events="none">5</text><text text-anchor="middle" fill="rgb(0,0,0)" transform="translate(210, 100)" y="-3" pointer-events="none">10</text><text text-anchor="middle" fill="rgb(0,0,0)" transform="translate(354, 160)" y="-3" pointer-events="none">8</text><text text-anchor="middle" fill="rgb(0,0,0)" transform="translate(498, 40)" y="-3" pointer-events="none">12</text><text text-anchor="middle" fill="rgb(0,0,0)" transform="translate(642, 340)" y="-3" pointer-events="none">2</text></g><g transform="translate(60, 60)"><text style="font: 12px Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(66, 400)" dy=".71em" y="3" pointer-events="none">2005</text><text style="font: 12px Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(210, 400)" dy=".71em" y="3" pointer-events="none">2006</text><text style="font: 12px Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(354, 400)" dy=".71em" y="3" pointer-events="none">2007</text><text style="font: 12px Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(498, 400)" dy=".71em" y="3" pointer-events="none">2008</text><text style="font: 12px Arial;" text-anchor="middle" fill="rgb(0,0,0)" transform="translate(642, 400)" dy=".71em" y="3" pointer-events="none">2009</text></g></g><rect stroke-width="3" stroke="rgb(204,204,204)" height="520" width="830" y="20" x="20"></rect></svg>';
  var b64 = btoa(svg);

  // Works in recent Webkit(Chrome)
  $("body").append($("<img src='data:image/svg+xml;base64,\n"+b64+"' alt='file.svg'/>"));

  // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
  $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"' title='file.svg'>Download</a>"));
 }
 encode_as_img_and_link();*/