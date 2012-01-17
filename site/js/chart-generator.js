ARV.paletteColorCounter = 0;
ARV.paletteChanged = false;

/**
 * Creates the JSON <tt>graphDef</tt> for the chart. The aurora source uses
 * <tt>graphDef</tt> to generate chart
 * @param chartType
 * @returns {Object} graphDef
 */

ARV.getData = function(chartType) {
    var graphDef = {},
        prop;
    graphDef.style = ARV.styles;
    for (prop in ARV.commonProperties) {
        graphDef[prop] = ARV.commonProperties[prop];
    }
    graphDef.data = ARV.defaultData[chartType];
    if (chartType === "MultiBarGraph") {
        graphDef.categories = ARV.defaultCategories;
        graphDef.dataset = ARV.defaultDataSet;
    }
    return graphDef;
};
//TODO whenever a property changes at front end the entire graphDef is re-created. Just change the properties that have changed.
/**
 * The function gets the style property value from the front end and sets these style properties in graphDef
 */
ARV.updateStyleProperties = function() {
    var styles = ARV.graphDef.style,
        prop;
    for (prop in styles) {
        var elem = $("#" + prop);
        var value = elem.val();
        if (prop === "verGridShow" || prop === "horGridShow" || prop === "verGridLabelShow" || prop === "horGridLabelShow") {
            value = elem.attr("checked") ? true : false;
        }
        if (styles.hasOwnProperty(prop)) {
            styles[prop] = value;
        }
    }
};

/**
 * The function sets the properties of chart in the graphDef
 */
ARV.updateGraphProperties = function() {
    var prop;
    for (prop in ARV.graphDef) {
        var elem = $("#" + prop);
        var value = elem.val();
        if (prop === "toolTip" || prop === "showLabels" || prop === "showValues" || prop === "isLineStyleStep" || prop === "interpolated" || prop === "segmented" || prop === "showLegends") {
            value = elem.attr("checked") ? true : false;
        }
        if (ARV.graphDef.hasOwnProperty(prop) && value !== undefined) {
            ARV.graphDef[prop] = value;
        }
    }
};

/**
 * The function checks if the palette has changed and if the palette has changed, it creates
 * an array of colors and sets it in <tt>graphDef</tt>
 */
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

/**
 * The function returns the number of measure axis
 * @returns {Number} The number of selected measure axis
 */
ARV.getNumberOfSelectedMeasureAxis = function() {
    var selected = $("#measureAxisList option:selected");
    var noOfSelected = selected.length;
    return noOfSelected;
};

/**
 * The function returns the graph type selected
 * @returns {String} The graph type
 */
ARV.getGraphType = function() {
    var graphType = $("#chartTypes option:selected").attr("value");
    var graphName = graphType + "Graph";
    var noOfSelected = ARV.getNumberOfSelectedMeasureAxis();
    if (noOfSelected > 1) {
        graphName = ARV.singleToMultiMap[graphName];
    }
    return graphName;
};

/**
 * This function updates the JSON for the graph whenever the user makes changes on the front end
 * this function is called.
 * @param {string} div
 *             The div id in which the chart is to be populated
 */
ARV.modifyJSON = function(div) {
    var index, param, value;
    var graphName = ARV.getGraphType();
    ARV.graphDef = ARV.getData(ARV.JsonMap[graphName]);
    ARV.updateStyleProperties();
    ARV.updateGraphProperties();
    ARV.checkPaletteChanged();
    ARV.showGraph(graphName, div);
};

/**
 * The function creates an instance of the <tt>graphType</tt> and renders it to the <tt>div</tt>
 * @param graphType {String} The graph type
 * @param div {Optional} The div id in which the chart is to be rendered. If undefined it is rendered to the div with id "chart"
 * @param {Optional} graphDef This is the JSON that is passed to the Aurora source. If undefined then <tt>ARV.graphDef</tt> is taken.
 */
ARV.showGraph = function(graphType, div, graphDef) {
    $("#chart").html("<img src='css/images/loading.gif' class='loading'/>");
    graph = new AR[ARV.ChartTypeMap[graphType]](graphDef || ARV.graphDef);
    $("#chart").html("");
    graph.render(div || "chart");
};

/**
 * Adds the colors to the according to the palette chosen to the palette tab. The user can
 * add or remove colors from the palette
 */
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

/**
 * The function clears the cahrt area and the "dataDiv" and removes all the "tipsy" elements
 * It also unloads the google map chart if it has been loaded
 */
ARV.reset = function() {
    GUnload();
    $("#chart").css("background-color", "#ffffff");
    $("#dataDiv").html("");
    $(".tipsy").remove();
};

/**
 * The function display/hides the category/measure axis divs according to the chart type selected
 * @param isMap
 */
ARV.toggleParameters = function(isMap) {
    if (isMap) {
        $("#MapAxisSelector").css("display", "inline");
        $("#defaultAxisSelector").css("display", "none");
    } else {
        $("#MapAxisSelector").css("display", "none");
        $("#defaultAxisSelector").css("display", "inline");
    }
};
/**
 *
 * @param chartType
 */
ARV.performActionsBasedOnChart = function(chartType) {
    switch (chartType) {
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
        $("#dataDiv").html(ARV.con[chartType + "ChartOptions"]);
        break;
    default:
        $("#dataDiv").html(ARV.con[chartType + "ChartOptions"]);
        ARV.toggleParameters(false);
    }
};
/**
 * The function adds event listeners to the different dom objects
 */
ARV.addEventListeners = function() {
    // When any delete color button is clicked. Delete the color from the palette
    $(".delColorBtn").live("click", function() {
        var izzy = $(this).prev();
        izzy.prev().remove();
        izzy.remove();
        $(this).remove();
    });
    //Whenever we click any where in the colors div the palette is changed
    $("#colors").live("click", function() {
        ARV.paletteChanged = true;
        ARV.refreshGraph();
    });
    //Whenever add Color button is clicked a color is added to the palette with default color #000000
    $("#addColorBtn").live("click", function() {
        $(this).before('<input value="#000000" class="colorInput colorPicker" size="8" type="text" id="color' + ARV.paletteColorCounter + '"/>');
        $(this).before('<button id="delColor' + (ARV.paletteColorCounter) + '"  class="delColorBtn">x</button>');
        $("#delColor" + (ARV.paletteColorCounter)).button();
        ARV.paletteColorCounter++;
        ARV.initializeColorPicker(ARV.colorPickerCB.chartGenerator);
    });

    //Whenever we change the option in the presetPalette The colors are loaded accordingly
    $("#presetPalette option").click(function() {
        ARV.addColorsDiv();
        ARV.refreshGraph();
    });

    //Use jquery ui for all the buttons
    $("button").button();

    $("#generate").click(function(event) {
        $(".tipsy").remove();
        ARV.modifyJSON();
    });

    //Perform actions when chart type changes
    $("#chartTypes option").click(function() {
        ARV.reset();
        var selectedVal = $("#chartTypes option:selected").attr("value");
        ARV.performActionsBasedOnChart(selectedVal);
        ARV.createSliders(ARV.createSlidersCB.chartGenerator);
        ARV.initializeColorPicker(ARV.colorPickerCB.chartGenerator);

    });

    //Whenever any options changed then refresh the graph
    $("#accordion").change(function() {
        ARV.refreshGraph();
    });
    $("#accordion input").keyup(function() {
        ARV.refreshGraph();
    });
};
/**
 * When the options are changed and the chart type selected is a table, then the function is called
 * Creates the slick grid table with the changed options
 */
ARV.refreshTable = function() {
    var table = $("<div/>").attr("id", "tableDiv");
    var title = $("<label/>").html($("#caption").val()).addClass("tableHeading");
    var div = $("<div/>").attr("id", "tableCont");
    $("#chart").html("");
    table.append(title);
    table.append(div);
    $("#chart").append(table);
    ARV.grid = new Slick.Grid("#tableCont", ARV.TableData, ARV.TableColumns, ARV.gridOptions);
};
/**
 *
 */
ARV.refreshGraph = function() {
    var selectedVal = $("#chartTypes option:selected").attr("value");
    if (selectedVal !== "table") {
        ARV.modifyJSON();
    }

};

/**
 * The initialize function of the chart generator. Populates the palette tab,
 * Makes jquery ui sliders, adds event listeners, triggers event to render chart
 */
ARV.initChartGenerator = function() {
    var palette;
    for (palette in AR.Utility.palettes) {
        var option = $('<option />').val(palette).append(palette);
        if (palette === "Water") {
            option.attr("selected", "selected");
        }
        $('#presetPalette').append(option);
    }
    ARV.createSliders(ARV.createSlidersCB.chartGenerator);
    ARV.addColorsDiv();
    ARV.addEventListeners();
    $("#measureAxisList").chosen().trigger("change");
};