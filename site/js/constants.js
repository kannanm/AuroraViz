var ARV = {};

ARV.getChartOptionsHTML = function(chartType) {
    var chartOptionsHTML = {
        bar: [
            '<div class="inline"><label> Type: </label>',
            '<select id="type">',
            '<option value="h">Horizontal</option > ',
            '<option value="v" selected> Vertical </option>',
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
            '<div 	class="inline"><label> Step Graph: </label>',
            '<input type="checkbox" id="isLineStyleStep"></input ></div> <br/>',
            '<label>Dot Size: </label>',
            '<div class="slider" id="dotSizeSlider"></div>',
            '<input size="8" type="text" id="dotSize" value="5" disabled="disabled" /> <br />',
            '<label>Line Width: </label>',
            '<div class="slider" id="lineWidthSlider"></div>',
            '<input size="8" type="text" id="lineWidth" value="2" disabled="disabled" /> <br />',
            '<label>Line Color: </label>',
            '<input value="#2266bb" class="colorPicker" size="8" type="text" id="lineColor" /><br/>',
            '</div>'].join(" "),
       multiLine: [
             '<div 	class="inline"><label> Step Graph: </label>',
             '<input type="checkbox" id="isLineStyleStep"></input ></div> <br/>',
             '<label>Dot Size: </label>',
             '<div class="slider" id="dotSizeSlider"></div>',
             '<input size="8" type="text" id="dotSize" value="2" disabled="disabled" /> <br />',
             '<label>Line Width: </label>',
             '<div class="slider" id="lineWidthSlider"></div>',
             '<input size="8" type="text" id="lineWidth" value="2" disabled="disabled" /> <br />',
             '</div>'].join(" "),
        
        pie: [
            '<label>Radius </label>',
            '<input type="text" id="pieRadius" value="100"   size="5"></input>',
            '</div>'].join(" "),
        bubble: [
            '</div>'].join(" "),
        donut: [
            '<div class="inline"><label>Inner Radius </label>',
            '<input type="text" id="innerRadius" value="100" size="5"></input></div>',
            '<div class="inline"><label>Outer Radius </label>',
            '<input type="text" id="outerRadius" value="50" size="5"></input></div>',
            '</div>'].join(" "),
        area: [
            '<div class="inline"><label> Interpolated </label>',
            '<input type="checkbox" id="interpolated"></input ></div> <br/>',
            '<label>Area Color: </label>',
            '<input value="#1F77B4" class="colorPicker" size="8" type="text" id="areaColor" /><br/>',
            '</div>'].join(" "),
        multiArea: [
              '<div class="inline"><label> Interpolated </label>',
              '<input type="checkbox" id="interpolated"></input ></div> <br/>',
              '</div>'].join(" "),
                   
        tree: [
            '</div>'].join(" "),
        sunburst: [
            '</div>'].join(" "),
        bullet: [
                 '<div class="inline"><label> Bullet Orientation </label>',
                 '<select id="bulletOrientation">',
                 '<option value="left" selected="selected">Left</option>',
                 '<option value="right">Right</option>',
                 '</select></div> <br/>',
                 '<div class="inline"><label> Bullet Orientation </label>',
                 '<select id="markerShape">',
                 '<option value="triangle" selected="selected">Triangle</option>',
                 '<option value="circle">Circle</option>',
                 '<option value="square">Square</option>',
                 '</select></div> <br/>',
                 '<label>Marker Color: </label>',
                 '<input value="#cccccc" class="colorPicker" size="8" type="text" id="markerFillColor" /><br/>',
                 '<label>Measure Color: </label>',
                 '<input value="#cfcfcf" class="colorPicker" size="8" type="text" id="measureFillColor" /><br/>',
                 ].join(" ")
    }[chartType];
    return chartOptionsHTML;
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
    BarChartOptions: ARV.getChartOptionsHTML("bar"),
    MultibarChartOptions: ARV.getChartOptionsHTML("multibar"),
    LineChartOptions: ARV.getChartOptionsHTML("line"),
    MultilineChartOptions: ARV.getChartOptionsHTML("multiLine"),
    PieChartOptions: ARV.getChartOptionsHTML("pie"),
    DonutChartOptions: ARV.getChartOptionsHTML("donut"),
    BubbleChartOptions: ARV.getChartOptionsHTML("bubble"),
    AreaChartOptions: ARV.getChartOptionsHTML("area"),
    MultiAreaChartOptions: ARV.getChartOptionsHTML("multiArea"),
    StackedAreaChartOptions: ARV.getChartOptionsHTML("multiArea"),
    BulletChartOptions: ARV.getChartOptionsHTML("bullet"),
    //treeChartOptions: ARV.getChartOptionsHTML("tree"),
    //sunburstChartOptions: ARV.getChartOptionsHTML("sunburst"),
    BarChartParams: ["barChartTypes"],
    MultibarChartParams: ["mbarChartTypes"],
    LineChartParams: ["lineStep"],
    MultilineChartParams: ["lineStep"],
    PieChartParams: ["pieRadius", "pieAngle", "pieStartAngle", "pieEndAngle"],
    DonutChartParams: ["donutInnerRadius", "donutOuterRadius", "donutAngle"],
    AreaChartParams: ["areaSegmented", "areaInterpolated"],
    commonParams: ["canvasHeight", "canvasWidth", "palette", "horGrid", "verGrid", "chartCaption",
                          "yAxisName", "xAxisName", "toolTip", "showLabels", "showValues"],
    treeChartParams: [],
    bubbleChartParams: [],
    sunBurstChartParams: [],
    goldenRatio: 1.61803399
};
