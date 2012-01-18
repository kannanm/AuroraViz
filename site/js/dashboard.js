/**
 * @Description The top-level dashboard namespace.
 * @namespace The top-level dashboard namespace, <tt>ARV.Dashboard</tt>. All
 *            the functions related to the dashboard view are in this namespace
 */
ARV.Dashboard = {};

// TODO replace this and get data from server
ARV.Dashboard.GraphData = {
	r1 : {
		"graphType" : "BarGraph",
		"style" : {
			"captionSize" : "20",
			"captionColor" : "#000000",
			"chartFillColor" : "#FFFFFF",
			"horAxisLabelColor" : "#000000",
			"horAxisLabelSize" : "12",
			"horAxisColor" : "#CCCCCC",
			"horAxisThickness" : "2",
			"verAxisLabelColor" : "#000000",
			"verAxisLabelSize" : "12",
			"verAxisColor" : "#CCCCCC",
			"verAxisThickness" : "2",
			"verGridShow" : true,
			"verGridColor" : "#CCCCCC",
			"verGridLabelShow" : false,
			"verGridThickness" : "1",
			"horGridShow" : true,
			"horGridColor" : "#CCCCCC",
			"horGridLabelShow" : true,
			"horGridThickness" : "1"
		},
		"caption" : "Profit (Yearly)",
		"yAxisName" : "",
		"xAxisName" : "",
		"width" : 600,
		"height" : 400,
		"type" : "v",
		"toolTip" : true,
		"showLabels" : true,
		"showValues" : true,
		"labelFontSize" : "15",
		"labelFontColor" : "#000000",
		"labelRotateAngle" : "0",
		"palette" : "presetPalette",
		"paletteColors" : [],
		"presetPalette" : "Water",
		"isLineStyleStep" : false,
		"pieRadius" : "100",
		"dotSize" : "5",
		"lineWidth" : "2",
		"lineColor" : "#000000",
		"outerRadius" : "100",
		"innerRadius" : "50",
		"interpolated" : false,
		"segmented" : false,
		"areaColor" : "#1F77B4",
		"showLegends" : true,
		"categories" : [ {
			"category" : [ {
				"label" : "LG"
			}, {
				"label" : "Samsung"
			}, {
				"label" : "Philips"
			}, {
				"label" : "GE"
			} ]
		} ],
		"dataset" : [ {
			"seriesname" : "sales",
			"data" : [ {
				"value" : 41
			}, {
				"value" : 24
			}, {
				"value" : 20
			}, {
				"value" : 55
			} ]
		}, {
			"seriesname" : "revenue",
			"data" : [ {
				"value" : 22
			}, {
				"value" : 12
			}, {
				"value" : 15
			}, {
				"value" : 34
			} ]
		}, {
			"seriesname" : "profit",
			"data" : [ {
				"value" : 10
			}, {
				"value" : 20
			}, {
				"value" : 7
			}, {
				"value" : 25
			} ]
		} ]
	},
	r2 : {
		"graphType" : "PieGraph",
		"style" : {
			"captionSize" : "20",
			"captionColor" : "#000000",
			"chartFillColor" : "#FFFFFF",
			"horAxisLabelColor" : "#000000",
			"horAxisLabelSize" : "12",
			"horAxisColor" : "#CCCCCC",
			"horAxisThickness" : "0",
			"verAxisLabelColor" : "#000000",
			"verAxisLabelSize" : "12",
			"verAxisColor" : "#CCCCCC",
			"verAxisThickness" : "0",
			"verGridShow" : false,
			"verGridColor" : "#CCCCCC",
			"verGridLabelShow" : false,
			"verGridThickness" : "1",
			"horGridShow" : false,
			"horGridColor" : "#CCCCCC",
			"horGridLabelShow" : true,
			"horGridThickness" : "1"
		},
		"caption" : "Profit (Yearly)",
		"yAxisName" : "",
		"xAxisName" : "",
		"width" : 600,
		"height" : 400,
		"type" : "v",
		"toolTip" : true,
		"showLabels" : true,
		"showValues" : true,
		"labelFontSize" : "26",
		"labelFontColor" : "#000000",
		"labelRotateAngle" : "0",
		"palette" : "presetPalette",
		"paletteColors" : [],
		"presetPalette" : "Water",
		"isLineStyleStep" : false,
		"pieRadius" : "150",
		"dotSize" : "5",
		"lineWidth" : "2",
		"lineColor" : "#000000",
		"outerRadius" : "100",
		"innerRadius" : "50",
		"interpolated" : false,
		"segmented" : false,
		"areaColor" : "#1F77B4",
		"showLegends" : false,
		"data" : [ {
			"value" : 10,
			"label" : "LG"
		}, {
			"value" : 20,
			"label" : "Samsung"
		}, {
			"value" : 7,
			"label" : "Philips"
		}, {
			"value" : 25,
			"label" : "GE"
		} ]
	},
	r3 : {
		"graphType" : "StackedAreaGraph",
		"style" : {
			"captionSize" : "10",
			"captionColor" : "#000000",
			"canvasFillColor" : "#FFFFFF",
			"canvasBorderColor" : "#CCCCCC",
			"canvasBorderThickness" : "0",
			"chartFillColor" : "#FFFFFF",
			"horAxisLabelColor" : "#000000",
			"horAxisLabelSize" : "0",
			"horAxisColor" : "#CCCCCC",
			"horAxisThickness" : "0",
			"verAxisLabelColor" : "#000000",
			"verAxisLabelSize" : "0",
			"verAxisColor" : "#CCCCCC",
			"verAxisThickness" : "0",
			"verGridShow" : true,
			"verGridColor" : "#CCCCCC",
			"verGridLabelShow" : false,
			"verGridThickness" : "1",
			"horGridShow" : true,
			"horGridColor" : "#CCCCCC",
			"horGridLabelShow" : true,
			"horGridThickness" : "1"
		},
		"caption" : "Profit (Yearly)",
		"yAxisName" : "Amount (in billions)",
		"xAxisName" : "Years",
		"width" : "600",
		"height" : "400",
		"type" : "v",
		"toolTip" : true,
		"showLabels" : true,
		"showValues" : true,
		"labelFontSize" : "12",
		"labelFontColor" : "#000000",
		"labelRotateAngle" : "0",
		"palette" : "presetPalette",
		"paletteColors" : [],
		"presetPalette" : "Sulphide",
		"isLineStyleStep" : false,
		"pieRadius" : "200",
		"dotSize" : "2",
		"lineWidth" : "2",
		"lineColor" : "#000000",
		"outerRadius" : "200",
		"innerRadius" : "100",
		"interpolated" : false,
		"segmented" : true,
		"areaColor" : "#1F77B4",
		"categories" : [ {
			"category" : [ {
				"label" : "Hardware"
			}, {
				"label" : "Software"
			}, {
				"label" : "Service"
			}, {
				"label" : "HR"
			} ]
		} ],
		"dataset" : [ {
			"seriesname" : "Domestic",
			"color" : "8EAC41",
			"data" : [ {
				"value" : "84"
			}, {
				"value" : "207"
			}, {
				"value" : "116"
			}, {
				"value" : "100"
			} ]
		}, {
			"seriesname" : "International",
			"color" : "607142",
			"data" : [ {
				"value" : "116"
			}, {
				"value" : "237"
			}, {
				"value" : "83"
			}, {
				"value" : "90"
			} ]
		} ]
	}
};

/**
 * An Object to hold the original Graph data JSON. When the graph is resized
 * then the graph width and height change. Thus a backup object
 */
ARV.Dashboard.originalGraphData = {};

// TODO heading and label can be combined to one as we can resize the label and
// size is the only
// difference between them
/**
 * An array of editable text elements.
 */
ARV.Dashboard.editableTextElements = [ "heading", "description", "label" ];
ARV.Dashboard.setPosition = function(elem, position) {
	elem.css("position", "absolute");
	elem.css("top", position.top);
	elem.css("left", position.left);
};

/**
 * Sets the size of the <tt>div</tt> with width equal to <tt>width</tt> and
 * height equal to <tt>height</tt>
 * 
 * @param div
 *            {Object} The element whose size is to be set
 * @param width
 *            {Number} the width
 * @param height
 *            {Number the height
 */
ARV.Dashboard.setSize = function(div, width, height) {
	div.css("width", width + 20);
	div.css("height", height + 20);
};

/**
 * An object which has the default position of any element that is added. With
 * top equal to zero and left equal to zero its the top-left corner
 */
ARV.Dashboard.defaultPosition = {
	top : "0",
	left : "0"
};

/**
 * It is a map of component name to the functions that creates and return an
 * appropriate dom element for the component
 */
ARV.Dashboard.getComponent = {
	heading : function() {
		return $("<label/>").addClass("heading").addClass("component").html("Double Click to edit");
	},
	description : function() {
		return $("<p/>").addClass("description").addClass("component").html("Double Click to edit");
	},
	label : function() {
		return $("<label/>").addClass("label").addClass("component").html("Double Click to edit");
	},
	report : function() {

	}

};

/**
 * Map to hold the component names
 */
ARV.Dashboard.components = {
	heading : "heading",
	description : "description",
	label : "label"
};

/**
 * Makes the report/chart resizable.
 */
ARV.Dashboard.setReportResizable = function() {
	$(".report").resizable({
		aspectRatio : true,
		ghost : true,
		stop : function(event, ui) {
			var containerID = $(this).attr("id");
			var graphDef = ARV.Dashboard.originalGraphData[containerID].graphDef;
			graphDef.width = ui.size.width;
			graphDef.height = ui.size.height;
			$(this).html("");
			ARV.CG.showGraph(graphDef.graphType, containerID, graphDef);
			// TODO: Following is a cheap hack to make the report resizable
			// again. Change it
			$('#saveBtn').trigger('click');
			$('#editBtn').trigger('click');
		}

	});
};

/**
 * Removes the parent of the <tt>component</tt>
 * 
 * @param component
 *            the component whose parent is to be removed
 */
ARV.Dashboard.removeComponentParent = function(component) {
	$(component).parent().remove();
};

/**
 * Adds the text component i.e. heading, label or a description field
 * 
 * @param componentClass
 *            {string} The class of the component which can be label, heading or
 *            description
 * @param type
 *            {string} type of the component which can be textbox or text area
 * @param [oldComponent]
 *            {Object} Optional field if given it means that the the new
 *            component to be added will be the clone of the
 *            <tt>oldComponent</tt>
 * @param [position]
 *            {Object} The position of the <tt>oldComponent</tt>. So the new
 *            component to be added will be added in the same position
 */
ARV.Dashboard.addTextComponents = function(componentClass, type, oldComponent, position) {
	var component, dashNS = ARV.Dashboard;
	if (oldComponent) {
		component = $(oldComponent).clone().addClass("component");
		oldComponent.remove();
	} else {
		component = dashNS.getComponent[componentClass]();
	}
	$(component).inLineEditor({
		'event' : 'dblclick',
		'onblur' : 'save',
		'submit' : 'Done',
		'cancel' : 'Undo',
		'remove' : 'Delete',
		'toolTip' : 'Double Click to edit',
		'removeHandler' : function() {
			$(this).parent().remove();
		},
		'type' : type
	});
	var div = $("<div/>").addClass("draggable").addClass("element-container").append(component);
	if (position) {
		dashNS.setPosition(div, position);
		dashNS.setPosition(component, dashNS.defaultPosition);
		$(component).css("position", "relative");
	}
	$("#dashboardEditor").append(div);
	$(".draggable").draggable({
		containment : "parent"
	});

};

/**
 * Sets the value of <tt>ARV.selectedElement</tt> equal to <tt>elem</tt>.
 * 
 * @param elem
 *            The selected element
 */
ARV.Dashboard.setSelected = function(elem) {
	ARV.Dashboard.selectedElement = elem;
};

// TODO Instead of adding and removing the options again and again We can toggle
// the visibility
/**
 * Map of the component vs the html string for the options of the component
 */
ARV.Dashboard.options = {
	text : [ '<label>Size: </label>', '<div class="slider" id="textSizeSlider"></div>', '<input size="8" type="text" id="textSize" value="10" disabled="disabled" /> <br />',
			'<label>Angle: </label>', '<div class="slider" id="textRotateAngleSlider"></div>',
			'<input size="8" type="text" id="textRotateAngle" value="0" disabled="disabled" /> <br />', '<label>Color: </label>',
			'<input value="#000000" class="colorPicker" size="8" type="text" id="textColor" /><br/>', ].join(" "),
	report : [ '<button id="deleteReport">Delete</button>', ].join(" "),
};

/**
 * Inserts the dom elements for editing options. Checks if the selected element
 * is a report or not and then populates the editing options accordingly
 */
ARV.Dashboard.populateOptions = function() {
	var dashNS = ARV.Dashboard;
	var isReport = $(dashNS.selectedElement).is(".report");
	var html = isReport ? dashNS.options.report : dashNS.options.text;
	$("#options").html(html);
	$("button").button();
	ARV.Utility.initializeColorPicker(ARV.Utility.colorPickerCB.dashboard);
	ARV.Utility.createSliders(ARV.Utility.createSlidersCB.dashboard);
};

/**
 * Sets the values in the editing options equal to the property values of the
 * selected element
 */
ARV.Dashboard.setOptionsValues = function() {
	var dashNS = ARV.Dashboard;
	var elem = dashNS.selectedElement;
	var color = ARV.Utility.rgb2hex($(elem).css("color"));
	var size = parseInt($(elem).css("font-size"), 10);
	var angle = ARV.Utility.matrixToDegree($(elem).css("-moz-transform"));
	$("#textColor").val(color);
	$("#textSize").val(size);
	$("#textSizeSlider").slider("value", size);
	$("#textRotateAngle").val(angle);
	$("#textRotateAngleSlider").slider("value", angle);
};

/**
 * Removes the styling of the selected element
 */
ARV.Dashboard.removeSelectedElemStyling = function() {
	$(".selected").each(function() {
		$(this).removeClass("selected");
	});
};

/**
 * Sets the color of the <tt>elem</tt> equal to <tt>color</tt>
 * 
 * @param elem
 *            {Object} The object whose color is to be set
 * @param color
 *            {string} The color to be set
 */
ARV.Dashboard.setColor = function(elem, color) {
	$(elem).css("color", color);
};

/**
 * Sets the angle of the <tt>elem</tt> equal to <tt>angle</tt>
 * 
 * @param elem
 *            {Object} The object whose angle is to be set
 * @param angle
 *            {string} The angle to be set
 */
ARV.Dashboard.setTextAngle = function(elem, angle) {
	$(elem).css("-webkit-transform", "rotate(" + angle + "deg)");
	$(elem).css("-moz-transform", "rotate(" + angle + "deg)");
	$(elem).css("-ms-transform", "rotate(" + angle + "deg)");
	$(elem).css("-o-transform", "rotate(" + angle + "deg)");
	$(elem).css("transform", "rotate(" + angle + "deg)");
};

/**
 * Sets the size of the <tt>elem</tt> equal to <tt>size</tt> in px
 * 
 * @param elem
 *            {Object} The object whose size is to be set
 * @param size
 *            The size in px
 */
ARV.Dashboard.setTextSize = function(elem, size) {
	$(elem).css("font-size", size + "px");
};

/**
 * Update the styling of the selected element from the values in the editing
 * options
 */
ARV.Dashboard.updateSelectedElement = function() {
	var dashNS = ARV.Dashboard;
	dashNS.setColor(dashNS.selectedElement, $("#textColor").val());
	dashNS.setTextAngle(dashNS.selectedElement, $("#textRotateAngle").val());
	dashNS.setTextSize(dashNS.selectedElement, $("#textSize").val());
};

/**
 * Map of the key code to the function which moves the component in appropriate
 * direction
 */
ARV.Dashboard.moveMap = {
	37 : function(elem, pos) {
		$(elem).css("left", pos.left - 1);
	},
	38 : function(elem, pos) {
		$(elem).css("top", pos.top - 1);
	},
	39 : function(elem, pos) {
		$(elem).css("left", pos.left + 1);
	},
	40 : function(elem, pos) {
		$(elem).css("top", pos.top + 1);
	},
};

/**
 * Move the <tt>component</tt> in appropriate direction, according to the
 * <tt>key</tt> pressed
 * 
 * @param component
 *            The element to be moved
 * @param key
 *            The key pressed
 */
ARV.Dashboard.moveComponent = function(component, key) {
	var parent = $(component).parent();
	var position = $(parent).position();
	ARV.Dashboard.moveMap[key](parent, position);
};

/**
 * A counter to hold the no. of reports on the dashboard
 */
ARV.Dashboard.noOfReports = 0;

/**
 * Initialize function for the dashboard
 */
ARV.Dashboard.initDashboard = function() {
	var dashNS = ARV.Dashboard;
	// initialize menu bar with jquery ui
	$("#addReports").menubar();

	// initialize button with jquery ui
	$("button").button();

	// Click handle if the add TextField button is clicked
	$("#addTextField").click(function() {
		dashNS.addTextComponents(dashNS.components.label, "textBox");
	});

	// Click handle if the add Heading button is clicked
	$("#addHeading").click(function() {
		dashNS.addTextComponents(dashNS.components.heading, "textBox");
	});

	// Click handle if the add Description button is clicked
	$("#addDesciption").click(function() {
		dashNS.addTextComponents(dashNS.components.description, "textArea");
	});

	// Click handle if the add Report button is clicked
	$("#addReports li ul li").click(function() {
		var containerID = "report" + (dashNS.noOfReports);
		var id = $(this).children(":first").attr("id");
		var svgContainer = $("<div/>").addClass("component").attr("id", containerID).addClass("report");
		var div = $("<div/>").addClass("element-container").addClass("draggable").append(svgContainer);
		var graphType = dashNS.GraphData[id].graphType;
		$("#dashboardEditor").append(div);
		ARV.CG.showGraph(graphType, containerID, dashNS.GraphData[id]);
		$(".draggable").draggable({
			containment : "parent"
		});
		dashNS.originalGraphData[containerID] = {
			height : div.height(),
			width : div.width(),
			graphDef : dashNS.GraphData[id]
		};
		dashNS.setReportResizable();
		dashNS.noOfReports += 1;
	});

	// Click handle if any of the components is clicked. It stylize it and adds
	// the options menu
	$(".component").live("click", function() {
		dashNS.removeSelectedElemStyling();
		$(this).addClass("selected");
		dashNS.setSelected($(this));
		dashNS.populateOptions();
		dashNS.setOptionsValues();
	});

	// Makes the components editable if Edit button is clicked
	$("#editBtn").click(function() {
		var index = 0;
		for (index = 0; index < dashNS.editableTextElements.length; index++) {
			$("." + dashNS.editableTextElements[index]).each(function() {
				var componentClass = dashNS.editableTextElements[index];
				var type = componentClass === dashNS.components.description ? "textArea" : "textBox";
				dashNS.addTextComponents(componentClass, type, $(this), $(this).position());
			});
		}
		$(".report").each(function() {
			var div = $("<div/>").addClass("element-container").addClass("draggable").append($(this));
			$(this).addClass("component");
			$("#dashboardEditor").append(div);
			dashNS.setPosition(div, $(this).position());
			dashNS.setPosition($(this), dashNS.defaultPosition);
			$(this).css("position", "relative");
			$(".draggable").draggable({
				containment : "parent"
			});
			dashNS.setReportResizable();
		});
		// TODO stylize disabled button
		$(this).attr("disabled", "disabled");
	});

	$(".delComponentBtn").live("click", function() {
		var parent = $(this).parent();
		$(parent).remove();

	});

	// Makes all the components non editable if the save button is clicked
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
			var graphDef = dashNS.originalGraphData[containerID].graphDef;
			ARV.CG.showGraph(graphDef.graphType, containerID, graphDef);
		});
		dashNS.removeSelectedElemStyling();
	});
	$("#deleteReport").live("click", function() {
		dashNS.removeComponentParent(dashNS.selectedElement);
	});
	$(document).keydown(function(event) {
		if (event.keyCode === 46) {
			event.preventDefault();
			dashNS.removeComponentParent(dashNS.selectedElement);
		}
		// TODO implement it using dragabble somehow as the containment is not
		// being set i.e. it is moving out of the dashboardEditor
		// else if (event.keyCode >= 37 && event.keyCode <= 41) {
		// event.preventDefault();
		// ARV.moveComponent(ARV.selectedElement,event.keyCode);
		// }
	});
};