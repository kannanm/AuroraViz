/**
 * @Description The top-level utility functions namespace.
 * @namespace The top-level utility functions namespace, <tt>ARV.Utility</tt>. All the utility  are in this namespace
 */

ARV.Utility = {};
/**
 * A map color picker call back functions
 */
ARV.Utility.colorPickerCB = {
    chartGenerator: function(hex, rgb) {
        ARV.CG.modifyJSON();
    },
    dashboard: function(hex, rgb) {
        ARV.Dashboard.updateSelectedElement();
    }
};
/**
 * A map for create slider callback functions
 */
ARV.Utility.createSlidersCB = {
    chartGenerator: function(event, ui) {
        var sliderID = $(this).attr("id");
        var textID = sliderID.substr(0, sliderID.indexOf("Slider"));
        $("#" + textID).val(ui.value);
        ARV.CG.modifyJSON();
    },
    dashboard: function(event, ui) {
        var sliderID = $(this).attr("id");
        var textID = sliderID.substr(0, sliderID.indexOf("Slider"));
        $("#" + textID).val(ui.value);
        ARV.Dashboard.updateSelectedElement();
    }
};
/**
 * Initialize the color picker
 * @param cb {function} The call back function for the change event
 */
ARV.Utility.initializeColorPicker = function(cb) {
    $(".colorPicker").miniColors({
        change: cb
    });
};

/**
 * Create sliders
 * @param cb {function} The call back function for the slide event
 */
ARV.Utility.createSliders = function(cb) {
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
            slide: cb
        });
        $(this).slider("value", $("#" + textID).val()); /* $( "#"+textID).val($(this).slider( "value" ) ); */
    });
};

/**
 * Convert the rgb color value to hexadecimal value
 * @param rgb {String} The rgb color value e.g. rgb(0,0,0)
 * @returns {String} Returns the hexadecimal notation of the color e.g. #000000
 */

ARV.Utility.rgb2hex = function(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};

/**
 * Convert the matrix angle notation to the degree notation
 * @param matrix {String} The matrix angle notation e.g. matrix(0, 1, -1, 0, 0px, 0px)
 * @returns The angle for the <tt>matrix</tt> notation e.g. 90
 */
ARV.Utility.matrixToDegree = function(matrix) {
    var pat = /^matrix\((-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*)px,\s*(-*\d*.\d*)px\)/;
    matrix = matrix.match(pat);
    if (matrix === null) {
        return 0;
    }
    var sign = matrix[2] !== 0 ? matrix[2] / Math.abs(matrix[2]) : 0;
    var degree = Math.acos(matrix[1]) * 180 / Math.PI;
    return (sign * degree).toFixed(0);
};

/**
 * Return the selected chart type
 * @returns {String}  the selected chart type
 */
ARV.Utility.getSelectedChartType = function() {
    return $("#chartTypes option:selected").attr("value");
};

/**
 * Get the selected option for the select dom element with id attribute equal to <tt>id</tt>
 * @param id The id of the dom element
 * @returns the selected option
 */
ARV.Utility.getSelectedValue = function(id) {
    return $("#" + id + " option:selected").val();
};