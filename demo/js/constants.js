var ARV = {};

ARV.getChartOptionsHTML = function(chartType) {
    var commonHTML = ['<div>',
                            '<div class="inline"><label> Show Labels </label>',
                            '<input type="checkbox" checked="checked" id="showLabels"></input ></div> ',
                            '<div class="inline"><label> Show Values </label>',
                            '<input type="checkbox" checked="checked" id="showValues"></input ></div> ',
                            '<hr>'
                        ].join(" ");

    var chartOptionsHTML = {
        bar: [
            '<div class="inline"><label> Type: </label>',
            '<select id="barChartTypes">',
            '<option value="hor">Horizontal</option > ',
            '<option value = "ver" > Vertical </option>',
            '</select></div>',
            '</div>'].join(" "),
        multibar: [
            '<div class="inline"><label> Type: </label>',
            '<select id="mbarChartTypes">',
            '<option value="hor">Horizontal</option > ',
            '<option value = "ver" > Vertical </option>',
            '</select></div>',
            '</div>'].join(" "),    
        line: [
            '<div class="inline"><label> Step Graph: </label>',
            '<input type="checkbox" id="lineStep"></input ></div> ',
            '</div>'].join(" "),
        multiline: [
            '<div class="inline"><label> Step Graph: </label>',
            '<input type="checkbox" id="lineStep"></input ></div> ',
            '</div>'].join(" "),
        pie: [
            '<label>Radius </label>',
            '<input type="text" id="pieRadius"    size="5"></input>',
            '<div class="inline"><label>Angle </label>',
            '<input type="text"    id="pieAngle" size="5"></input>',
            '<div class="inline"><label>Start Angle </label>',
            '<input type="text" id="pieStartAngle"    size="5"></input>',
            '<div class="inline"><label>End Angle </label>',
            '<input type="text"    id="pieEndAngle" size="5"></input>',
            '</div>'].join(" "),
        scatter: [
            '</div>'].join(" "),
        donut: [
            '<div class="inline"><label>Inner Radius </label>',
            '<input type="text" id="donutInnerRadius" size="5"></input></div>',
            '<div class="inline"><label>Outer Radius </label>',
            '<input type="text" id="donutOuterRadius" size="5"></input></div>',
            '<hr>',
            '<div class="inline"><label>Angle </label>',
            '<input type="text"    id="donutAngle" size="5"></input></div>',
            '</div>'].join(" "),
        area: [
            '<div class="inline"><label> Segmented </label>',
            '<input type="checkbox" checked="checked" id="areaSegmented"></input ></div> ',
            '<div class="inline"><label> Interpolated </label>',
            '<input type="checkbox" checked="checked" id="areaInterpolated"></input ></div> ',
            '</div>'].join(" "),
        tree: [
            '</div>'].join(" "),
        sunburst: [
            '</div>'].join(" ")    
    }[chartType];
    return commonHTML + chartOptionsHTML;
};
ARV.con = {
    canvasWidth: "canvasWidth",
    canvasHeight: "canvasHeight",
    palette: "palette",
    horGrid: "horGrid",
    verGrid: "verGrid",
    chartCaption: "chartCaption",
    yAxisName: "yAxisName",
    xAxisName: "xAxisName",
    toolTip: "toolTip",
    barChartOptions: ARV.getChartOptionsHTML("bar"),
    multibarChartOptions: ARV.getChartOptionsHTML("multibar"),
    lineChartOptions: ARV.getChartOptionsHTML("line"),
    multilineChartOptions: ARV.getChartOptionsHTML("multiline"),
    pieChartOptions: ARV.getChartOptionsHTML("pie"),
    donutChartOptions: ARV.getChartOptionsHTML("donut"),
    scatterChartOptions: ARV.getChartOptionsHTML("scatter"),
    areaChartOptions: ARV.getChartOptionsHTML("area"),
    //treeChartOptions: ARV.getChartOptionsHTML("tree"),
    //sunburstChartOptions: ARV.getChartOptionsHTML("sunburst"),
    barChartParams: ["barChartTypes"],
    multibarChartParams: ["mbarChartTypes"],
    lineChartParams: ["lineStep"],
    multilineChartParams: ["lineStep"],
    pieChartParams: ["pieRadius", "pieAngle", "pieStartAngle", "pieEndAngle"],
    donutChartParams: ["donutInnerRadius", "donutOuterRadius", "donutAngle"],
    areaChartParams: ["areaSegmented", "areaInterpolated"],
    commonParams: ["canvasHeight", "canvasWidth", "palette", "horGrid", "verGrid", "chartCaption",
                          "yAxisName", "xAxisName", "toolTip", "showLabels", "showValues"],
    treeChartParams: [],
    scatterChartParams: [],
    sunBurstChartParams: [],
};
