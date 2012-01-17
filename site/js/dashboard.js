//TODO replace this and get data from server
ARV.GraphData = {
    r1: {
        "graphType": "BarGraph",
        "style": {
            "captionSize": "20",
            "captionColor": "#000000",
            "chartFillColor": "#FFFFFF",
            "horAxisLabelColor": "#000000",
            "horAxisLabelSize": "12",
            "horAxisColor": "#CCCCCC",
            "horAxisThickness": "2",
            "verAxisLabelColor": "#000000",
            "verAxisLabelSize": "12",
            "verAxisColor": "#CCCCCC",
            "verAxisThickness": "2",
            "verGridShow": true,
            "verGridColor": "#CCCCCC",
            "verGridLabelShow": false,
            "verGridThickness": "1",
            "horGridShow": true,
            "horGridColor": "#CCCCCC",
            "horGridLabelShow": true,
            "horGridThickness": "1"
        },
        "caption": "Profit (Yearly)",
        "yAxisName": "",
        "xAxisName": "",
        "width": 600,
        "height": 400,
        "type": "v",
        "toolTip": true,
        "showLabels": true,
        "showValues": true,
        "labelFontSize": "15",
        "labelFontColor": "#000000",
        "labelRotateAngle": "0",
        "palette": "presetPalette",
        "paletteColors": [],
        "presetPalette": "Water",
        "isLineStyleStep": false,
        "pieRadius": "100",
        "dotSize": "5",
        "lineWidth": "2",
        "lineColor": "#000000",
        "outerRadius": "100",
        "innerRadius": "50",
        "interpolated": false,
        "segmented": false,
        "areaColor": "#1F77B4",
        "showLegends": true,
        "categories": [{
            "category": [{
                "label": "LG"},
            {
                "label": "Samsung"},
            {
                "label": "Philips"},
            {
                "label": "GE"}]}],
        "dataset": [{
            "seriesname": "sales",
            "data": [{
                "value": 41},
            {
                "value": 24},
            {
                "value": 20},
            {
                "value": 55}]},
        {
            "seriesname": "revenue",
            "data": [{
                "value": 22},
            {
                "value": 12},
            {
                "value": 15},
            {
                "value": 34}]},
        {
            "seriesname": "profit",
            "data": [{
                "value": 10},
            {
                "value": 20},
            {
                "value": 7},
            {
                "value": 25}]}]
    },
    r2: {
        "graphType": "PieGraph",
        "style": {
            "captionSize": "20",
            "captionColor": "#000000",
            "chartFillColor": "#FFFFFF",
            "horAxisLabelColor": "#000000",
            "horAxisLabelSize": "12",
            "horAxisColor": "#CCCCCC",
            "horAxisThickness": "0",
            "verAxisLabelColor": "#000000",
            "verAxisLabelSize": "12",
            "verAxisColor": "#CCCCCC",
            "verAxisThickness": "0",
            "verGridShow": false,
            "verGridColor": "#CCCCCC",
            "verGridLabelShow": false,
            "verGridThickness": "1",
            "horGridShow": false,
            "horGridColor": "#CCCCCC",
            "horGridLabelShow": true,
            "horGridThickness": "1"
        },
        "caption": "Profit (Yearly)",
        "yAxisName": "",
        "xAxisName": "",
        "width": 600,
        "height": 400,
        "type": "v",
        "toolTip": true,
        "showLabels": true,
        "showValues": true,
        "labelFontSize": "26",
        "labelFontColor": "#000000",
        "labelRotateAngle": "0",
        "palette": "presetPalette",
        "paletteColors": [],
        "presetPalette": "Water",
        "isLineStyleStep": false,
        "pieRadius": "150",
        "dotSize": "5",
        "lineWidth": "2",
        "lineColor": "#000000",
        "outerRadius": "100",
        "innerRadius": "50",
        "interpolated": false,
        "segmented": false,
        "areaColor": "#1F77B4",
        "showLegends": false,
        "data": [{
            "value": 10,
            "label": "LG"},
        {
            "value": 20,
            "label": "Samsung"},
        {
            "value": 7,
            "label": "Philips"},
        {
            "value": 25,
            "label": "GE"}]
    },
    r3: {
        "graphType": "StackedAreaGraph",
        "style": {
            "captionSize": "10",
            "captionColor": "#000000",
            "canvasFillColor": "#FFFFFF",
            "canvasBorderColor": "#CCCCCC",
            "canvasBorderThickness": "0",
            "chartFillColor": "#FFFFFF",
            "horAxisLabelColor": "#000000",
            "horAxisLabelSize": "0",
            "horAxisColor": "#CCCCCC",
            "horAxisThickness": "0",
            "verAxisLabelColor": "#000000",
            "verAxisLabelSize": "0",
            "verAxisColor": "#CCCCCC",
            "verAxisThickness": "0",
            "verGridShow": true,
            "verGridColor": "#CCCCCC",
            "verGridLabelShow": false,
            "verGridThickness": "1",
            "horGridShow": true,
            "horGridColor": "#CCCCCC",
            "horGridLabelShow": true,
            "horGridThickness": "1"
        },
        "caption": "Profit (Yearly)",
        "yAxisName": "Amount (in billions)",
        "xAxisName": "Years",
        "width": "600",
        "height": "400",
        "type": "v",
        "toolTip": true,
        "showLabels": true,
        "showValues": true,
        "labelFontSize": "12",
        "labelFontColor": "#000000",
        "labelRotateAngle": "0",
        "palette": "presetPalette",
        "paletteColors": [],
        "presetPalette": "Sulphide",
        "isLineStyleStep": false,
        "pieRadius": "200",
        "dotSize": "2",
        "lineWidth": "2",
        "lineColor": "#000000",
        "outerRadius": "200",
        "innerRadius": "100",
        "interpolated": false,
        "segmented": true,
        "areaColor": "#1F77B4",
        "categories": [{
            "category": [{
                "label": "Hardware"},
            {
                "label": "Software"},
            {
                "label": "Service"},
            {
                "label": "HR"}]}],
        "dataset": [{
            "seriesname": "Domestic",
            "color": "8EAC41",
            "data": [{
                "value": "84"},
            {
                "value": "207"},
            {
                "value": "116"},
            {
                "value": "100"}]},
        {
            "seriesname": "International",
            "color": "607142",
            "data": [{
                "value": "116"},
            {
                "value": "237"},
            {
                "value": "83"},
            {
                "value": "90"}]}]
    }
};


ARV.originalGraphData = {

};

ARV.deleteSymbol = '<button class="delComponentBtn ui-state-default ui-corner-all"><span class="ui-icon ui-icon-trash"></span></button>';
ARV.editableTextElements = ["heading", "description", "label"];
ARV.setPosition = function(elem, position) {
    elem.css("position", "absolute");
    elem.css("top", position.top);
    elem.css("left", position.left);
};
ARV.setSize = function(div, width, height) {
    div.css("width", width + 20);
    div.css("height", height + 20);
};
ARV.defaultPosition = {
    top: "0",
    left: "0"
};
ARV.getComponent = {
    heading: function() {
        return $("<label/>").addClass("heading").addClass("component").html("Double Click to edit");
    },
    description: function() {
        return $("<p/>").addClass("description").addClass("component").html("Double Click to edit");
    },
    label: function() {
        return $("<label/>").addClass("label").addClass("component").html("Double Click to edit");
    },
    report: function() {

    }

};

ARV.components = {
    heading: "heading",
    description: "description",
    label: "label"
};

ARV.setReportResizable = function() {
    $(".report").resizable({
        aspectRatio: true,
        ghost: true,
        stop: function(event, ui) {
            var containerID = $(this).attr("id");
            var graphDef = ARV.originalGraphData[containerID].graphDef;
            graphDef.width = ui.size.width;
            graphDef.height = ui.size.height;
            $(this).html("");
            ARV.showGraph(graphDef.graphType, containerID, graphDef);
            //TODO: Following is a cheap hack to make the report resizable again. Change it
            $('#saveBtn').trigger('click');
            $('#editBtn').trigger('click');
        }

    });
};

ARV.removeComponentParent = function(component) {
    $(component).parent().remove();
};

ARV.addTextComponents = function(componentClass, type, oldComponent, position) {
    var component;
    if (oldComponent) {
        component = $(oldComponent).clone().addClass("component");
        oldComponent.remove();
    }
    else {
        component = ARV.getComponent[componentClass]();
    }
    $(component).inLineEditor({
        'event': 'dblclick',
        'onblur': 'save',
        'submit': 'Done',
        'cancel': 'Undo',
        'remove': 'Delete',
        'toolTip': 'Double Click to edit',
        'removeHandler': function() {
            $(this).parent().remove();
        },
        'type': type
    });
    var div = $("<div/>").addClass("draggable").addClass("element-container").append(component);
    if (position) {
        ARV.setPosition(div, position);
        ARV.setPosition(component, ARV.defaultPosition);
        $(component).css("position", "relative");
    }
    $("#dashboardEditor").append(div);
    $(".draggable").draggable({
        containment: "parent"
    });

};


ARV.setSelected = function(elem) {
    ARV.selectedElement = elem;
};

ARV.options = {
    text: [
        '<label>Size: </label>',
        '<div class="slider" id="textSizeSlider"></div>',
        '<input size="8" type="text" id="textSize" value="10" disabled="disabled" /> <br />',
        '<label>Angle: </label>',
        '<div class="slider" id="textRotateAngleSlider"></div>',
        '<input size="8" type="text" id="textRotateAngle" value="0" disabled="disabled" /> <br />',
        '<label>Color: </label>',
        '<input value="#000000" class="colorPicker" size="8" type="text" id="textColor" /><br/>',
        ].join(" "),
    report: [
        '<button id="deleteReport">Delete</button>',
        ].join(" "),
};

ARV.populateOptions = function() {
    var isReport = $(ARV.selectedElement).is(".report");
    var html = isReport ? ARV.options.report : ARV.options.text;
    $("#options").html(html);
    $("button").button();
    ARV.initializeColorPicker(ARV.colorPickerCB.dashboard);
    ARV.createSliders(ARV.createSlidersCB.dashboard);
};
ARV.setOptionsValues = function() {
    var color = ARV.rgb2hex($(ARV.selectedElement).css("color"));
    var size = parseInt($(ARV.selectedElement).css("font-size"), 10);
    var angle = ARV.matrixToDegree($(ARV.selectedElement).css("-moz-transform"));
    $("#textColor").val(color);
    $("#textSize").val(size);
    $("#textSizeSlider").slider("value", size);
    $("#textRotateAngle").val(angle);
    $("#textRotateAngleSlider").slider("value", angle);
};
ARV.removeSelectedElemStyling = function() {
    $(".selected").each(function() {
        $(this).removeClass("selected");
    });
};
ARV.setColor = function(elem, color) {
    $(elem).css("color", color);
};
ARV.setTextAngle = function(elem, angle) {
    $(elem).css("-webkit-transform", "rotate(" + angle + "deg)");
    $(elem).css("-moz-transform", "rotate(" + angle + "deg)");
    $(elem).css("-ms-transform", "rotate(" + angle + "deg)");
    $(elem).css("-o-transform", "rotate(" + angle + "deg)");
    $(elem).css("transform", "rotate(" + angle + "deg)");
};
ARV.setTextSize = function(elem, size) {
    $(elem).css("font-size", size + "px");
};
ARV.updateSelectedElement = function() {
    ARV.setColor(ARV.selectedElement, $("#textColor").val());
    ARV.setTextAngle(ARV.selectedElement, $("#textRotateAngle").val());
    ARV.setTextSize(ARV.selectedElement, $("#textSize").val());
};

ARV.moveMap = {
    37: function(elem, pos) {
        $(elem).css("left", pos.left - 1);
    },
    38: function(elem, pos) {
        $(elem).css("top", pos.top - 1);
    },
    39: function(elem, pos) {
        $(elem).css("left", pos.left + 1);
    },
    40: function(elem, pos) {
        $(elem).css("top", pos.top + 1);
    },
};

ARV.moveComponent = function(component, key) {
    var parent = $(component).parent();
    var position = $(parent).position();
    ARV.moveMap[key](parent, position);
};

ARV.noOfReports = 0;

ARV.initDashboard = function() {
    //initialize menu bar with jquery ui
    $("#addReports").menubar();

    //initialize button with jquery ui
    $("button").button();

    //Click handle if the add TextField button is clicked
    $("#addTextField").click(function() {
        ARV.addTextComponents(ARV.components.label, "textBox");
    });

    //Click handle if the add Heading button is clicked
    $("#addHeading").click(function() {
        ARV.addTextComponents(ARV.components.heading, "textBox");
    });

    //Click handle if the add Description button is clicked
    $("#addDesciption").click(function() {
        ARV.addTextComponents(ARV.components.description, "textArea");
    });

    //Click handle if the add Report button is clicked
    $("#addReports li ul li").click(function() {
        var containerID = "report" + (ARV.noOfReports);
        var id = $(this).children(":first").attr("id");
        var svgContainer = $("<div/>").addClass("component").attr("id", containerID).addClass("report");
        var div = $("<div/>").addClass("element-container").addClass("draggable").append(svgContainer);
        var graphType = ARV.GraphData[id].graphType;
        $("#dashboardEditor").append(div);
        ARV.showGraph(graphType, containerID, ARV.GraphData[id]);
        $(".draggable").draggable({
            containment: "parent"
        });
        ARV.originalGraphData[containerID] = {
            height: div.height(),
            width: div.width(),
            graphDef: ARV.GraphData[id]
        };
        ARV.setReportResizable();
        ARV.noOfReports += 1;
    });

    //Click handle if any of the components is clicked. It stylize it and adds the options menu
    $(".component").live("click", function() {
        ARV.removeSelectedElemStyling();
        $(this).addClass("selected");
        ARV.setSelected($(this));
        ARV.populateOptions();
        ARV.setOptionsValues();
    });

    //Makes the components editable if Edit button is clicked
    $("#editBtn").click(function() {
        var index = 0;
        for (index = 0; index < ARV.editableTextElements.length; index++) {
            $("." + ARV.editableTextElements[index]).each(function() {
                var componentClass = ARV.editableTextElements[index];
                var type = componentClass === ARV.components.description ? "textArea" : "textBox";
                ARV.addTextComponents(componentClass, type, $(this), $(this).position());
            });
        }
        $(".report").each(function() {
            var div = $("<div/>").addClass("element-container").addClass("draggable").append($(this));
            $(this).addClass("component");
            $("#dashboardEditor").append(div);
            ARV.setPosition(div, $(this).position());
            ARV.setPosition($(this), ARV.defaultPosition);
            $(this).css("position", "relative");
            $(".draggable").draggable({
                containment: "parent"
            });
            ARV.setReportResizable();
        });
        //TODO stylize disabled button
        $(this).attr("disabled", "disabled");
    });


    $(".delComponentBtn").live("click", function() {
        var parent = $(this).parent();
        $(parent).remove();

    });

    //Makes all the components non editable if the save button is clicked
    $("#saveBtn").click(function() {
        $(".component").each(function() {
            var position = $(this).parent().position();
            var a = $(this).clone();
            a.removeClass("component");
            a.css("position", "absolute");
            a.css("top", position.top);
            a.css("left", position.left);
            a.attr("title", "Click on the Edit Button to Edit");
            $(this).parent().parent().append(a);
            $(this).parent().remove();
        });
        $("#editBtn").removeAttr("disabled");
        $(".report").each(function() {
            var containerID = $(this).attr("id");
            var graphDef = ARV.originalGraphData[containerID].graphDef;
            ARV.showGraph(graphDef.graphType, containerID, graphDef);
        });
        ARV.removeSelectedElemStyling();
    });
    $("#deleteReport").live("click", function() {
        ARV.removeComponentParent(ARV.selectedElement);
    });
    $(document).keydown(function(event) {
        if (event.keyCode === 46) {
            event.preventDefault();
            ARV.removeComponentParent(ARV.selectedElement);
        }
        //TODO implement it using dragabble somehow as the containment is not being set i.e. it is moving out of the dashboardEditor
        //           else if (event.keyCode >= 37 && event.keyCode <= 41) {
        //             event.preventDefault();
        //             ARV.moveComponent(ARV.selectedElement,event.keyCode);
        //           }
    });
};