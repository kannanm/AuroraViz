/**
 * @Description The top-level chart generator namespace.
 * @namespace The top-level chart generator namespace, <tt>ARV.CG</tt>. All
 *            the functions and fields which are used in chart generation come under this namespace
 */
ARV.CG = {};

/**
 * Counter for the number of palette Colors on the palette tab
 */
ARV.CG.paletteColorCounter = 0;

/**
 * true if the preset palette has been changed, false otherwise
 */
ARV.CG.paletteChanged = false;

/**
 * Creates the JSON <tt>graphDef</tt> for the chart. The aurora source uses
 * <tt>graphDef</tt> to generate chart
 * @param chartType
 * @returns {Object} graphDef
 */

ARV.CG.getData = function(chartType) {
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
ARV.CG.updateStyleProperties = function() {
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
ARV.CG.updateGraphProperties = function() {
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
ARV.CG.checkPaletteChanged = function() {
	var generatorNS = ARV.CG;
    if (generatorNS.paletteChanged) {
        var colors = [];
        $("#colors input").each(function() {
            colors.push($(this).val());
        });
        generatorNS.graphDef.presetPalette = "custom";
        generatorNS.graphDef.paletteColors = colors;
    }
};

/**
 * The function returns the number of measure axis
 * @returns {Number} The number of selected measure axis
 */
ARV.CG.getNumberOfSelectedMeasureAxis = function() {
    var selected = $("#measureAxisList option:selected");
    var noOfSelected = selected.length;
    return noOfSelected;
};

/**
 * The function returns the graph type selected
 * @returns {String} The graph type
 */
ARV.CG.getGraphType = function() {
    var graphType = $("#chartTypes option:selected").attr("value");
    var graphName = graphType + "Graph";
    var noOfSelected = ARV.CG.getNumberOfSelectedMeasureAxis();
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
ARV.CG.modifyJSON = function(div) {
	var generatorNS = ARV.CG;
    var index, param, value;
    var graphName = generatorNS.getGraphType();
    ARV.graphDef = generatorNS.getData(ARV.JsonMap[graphName]);
    generatorNS.updateStyleProperties();
    generatorNS.updateGraphProperties();
    generatorNS.checkPaletteChanged();
    generatorNS.showGraph(graphName, div);
};

/**
 * The function creates an instance of the <tt>graphType</tt> and renders it to the <tt>div</tt>
 * @param graphType {String} The graph type
 * @param div {Optional} The div id in which the chart is to be rendered. If undefined it is rendered to the div with id "chart"
 * @param {Optional} graphDef This is the JSON that is passed to the Aurora source. If undefined then <tt>ARV.graphDef</tt> is taken.
 */
ARV.CG.showGraph = function(graphType, div, graphDef) {
    $("#chart").html("<img src='css/images/loading.gif' class='loading'/>");
    graph = new AR[ARV.ChartTypeMap[graphType]](graphDef || ARV.graphDef);
    $("#chart").html("");
    graph.render(div || "chart");
};

/**
 * Adds the colors to the according to the palette chosen to the palette tab. The user can
 * add or remove colors from the palette
 */
ARV.CG.addColorsDiv = function() {
	var generatorNS = ARV.CG;
    generatorNS.paletteChanged = false;
    var selectedVal = $("#presetPalette option:selected").attr("value");
    var colors = AR.Utility.palettes[selectedVal];
    var colorsDiv = $("#colors");
    colorsDiv.html("");
    for (generatorNS.paletteColorCounter = 0; generatorNS.paletteColorCounter < colors.length; generatorNS.paletteColorCounter++) {
        colorsDiv.append('<input value="' + colors[generatorNS.paletteColorCounter] + '" class="colorInput colorPicker" size="8" type="text" id="color' + generatorNS.paletteColorCounter + '"/>');
        colorsDiv.append('<button id="color' + generatorNS.paletteColorCounter + '"  class="delColorBtn">x</button>');
    }
    colorsDiv.append('<button id="addColorBtn" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></button>');

    ARV.Utility.initializeColorPicker(ARV.Utility.colorPickerCB.chartGenerator);
};

/**
 * The function clears the cahrt area and the "dataDiv" and removes all the "tipsy" elements
 * It also unloads the google map chart if it has been loaded
 */
ARV.CG.reset = function() {
    GUnload();
    $("#chart").css("background-color", "#ffffff");
    $("#dataDiv").html("");
    $(".tipsy").remove();
};

/**
 * The function display/hides the category/measure axis divs according to the chart type selected
 * @param isMap
 */
ARV.CG.toggleParameters = function(isMap) {
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
ARV.CG.performActionsBasedOnChart = function(chartType) {
	var generatorNS = ARV.CG;
    switch (chartType) {
    case "table":
        generatorNS.refreshTable();
        generatorNS.toggleParameters(false);
        break;
    case "select":
        $("#dataDiv").html("Please select a chart");
        generatorNS.toggleParameters(false);
        break;
    case "Map":
        generatorNS.toggleParameters(true);
        $("#dataDiv").html(ARV.con[chartType + "ChartOptions"]);
        break;
    default:
        $("#dataDiv").html(ARV.con[chartType + "ChartOptions"]);
        generatorNS.toggleParameters(false);
    }
};
/**
 * The function adds event listeners to the different dom objects
 */
ARV.CG.addEventListeners = function() {
	var generatorNS = ARV.CG;
    // When any delete color button is clicked. Delete the color from the palette
    $(".delColorBtn").live("click", function() {
        var izzy = $(this).prev();
        izzy.prev().remove();
        izzy.remove();
        $(this).remove();
    });
    //Whenever we click any where in the colors div the palette is changed
    $("#colors").live("click", function() {
        generatorNS.paletteChanged = true;
        generatorNS.refreshGraph();
    });
    //Whenever add Color button is clicked a color is added to the palette with default color #000000
    $("#addColorBtn").live("click", function() {
        $(this).before('<input value="#000000" class="colorInput colorPicker" size="8" type="text" id="color' + generatorNS.paletteColorCounter + '"/>');
        $(this).before('<button id="delColor' + (generatorNS.paletteColorCounter) + '"  class="delColorBtn">x</button>');
        $("#delColor" + (generatorNS.paletteColorCounter)).button();
        generatorNS.paletteColorCounter++;
        ARV.Utility.initializeColorPicker(ARV.Utility.colorPickerCB.chartGenerator);
    });

    //Whenever we change the option in the presetPalette The colors are loaded accordingly
    $("#presetPalette option").click(function() {
        generatorNS.addColorsDiv();
        generatorNS.refreshGraph();
    });

    //Use jquery ui for all the buttons
    $("button").button();

    $("#generate").click(function(event) {
        $(".tipsy").remove();
        generatorNS.modifyJSON();
    });

    //Perform actions when chart type changes
    $("#chartTypes option").click(function() {
        generatorNS.reset();
        var selectedVal = $("#chartTypes option:selected").attr("value");
        generatorNS.performActionsBasedOnChart(selectedVal);
        ARV.Utility.createSliders(ARV.Utility.createSlidersCB.chartGenerator);
        ARV.Utility.initializeColorPicker(ARV.Utility.colorPickerCB.chartGenerator);

    });

    //Whenever any options changed then refresh the graph
    $("#accordion").change(function() {
        generatorNS.refreshGraph();
    });
    $("#accordion input").keyup(function() {
        generatorNS.refreshGraph();
    });
};
/**
 * When the options are changed and the chart type selected is a table, then the function is called
 * Creates the slick grid table with the changed options
 */
ARV.CG.refreshTable = function() {
    var table = $("<div/>").attr("id", "tableDiv");
    var title = $("<label/>").html($("#caption").val()).addClass("tableHeading");
    var div = $("<div/>").attr("id", "tableCont");
    $("#chart").html("");
    table.append(title);
    table.append(div);
    $("#chart").append(table);
    ARV.CG.grid = new Slick.Grid("#tableCont", ARV.DataLoader.TableData, ARV.DataLoader.TableColumns, ARV.DataLoader.gridOptions);
};
/**
 *
 */
ARV.CG.refreshGraph = function() {
    var selectedVal = $("#chartTypes option:selected").attr("value");
    if (selectedVal !== "table") {
        ARV.CG.modifyJSON();
    }

};

/**
 * The initialize function of the chart generator. Populates the palette tab,
 * Makes jquery ui sliders, adds event listeners, triggers event to render chart
 */
ARV.CG.initChartGenerator = function() {
    var palette;
    for (palette in AR.Utility.palettes) {
        var option = $('<option />').val(palette).append(palette);
        if (palette === "Water") {
            option.attr("selected", "selected");
        }
        $('#presetPalette').append(option);
    }
    ARV.Utility.createSliders(ARV.Utility.createSlidersCB.chartGenerator);
    ARV.CG.addColorsDiv();
    ARV.CG.addEventListeners();
    $("#measureAxisList").chosen().trigger("change");
};