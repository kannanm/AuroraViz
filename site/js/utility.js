ARV.colorPickerCB = {
		chartGenerator : function(hex,rgb){
			ARV.modifyJSON();
		},
		dashboard: function(hex,rgb){
			ARV.updateSelectedElement();
		}
};
ARV.createSlidersCB = {
		chartGenerator :function(event, ui) {
			var sliderID = $(this).attr("id");
		    var textID = sliderID.substr(0, sliderID.indexOf("Slider"));
            $("#" + textID).val(ui.value);
            ARV.modifyJSON();
        },
        dashboard:function(event, ui){
        	var sliderID = $(this).attr("id");
		    var textID = sliderID.substr(0, sliderID.indexOf("Slider"));
            $("#" + textID).val(ui.value);
        	ARV.updateSelectedElement();
        }
};
ARV.initializeColorPicker = function(cb){
	$(".colorPicker").miniColors({
				change:cb
	});    
};

ARV.createSliders = function(cb) {
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
            slide:cb
        });
        $(this).slider("value", $("#" + textID).val()); /* $( "#"+textID).val($(this).slider( "value" ) ); */
    });
};

ARV.rgb2hex=  function(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};
ARV.matrixToDegree = function(matrix){
	var pat = /^matrix\((-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*),\s*(-*\d*.\d*)px,\s*(-*\d*.\d*)px\)/;
	matrix = matrix.match(pat);
	if(matrix === null ){
		return 0;
	}
	var sign = matrix[2]!=0 ? matrix[2]/Math.abs(matrix[2]) : 0;
	var degree = Math.acos(matrix[1])*180/Math.PI
	return (sign*degree).toFixed(0);
};
