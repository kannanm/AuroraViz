ARV.drawGraph = function() {
    var index, param, value;
    $("#chart").html("");
    var graphType = $("select option:selected").attr("value");
    var a = {};
    for (index = 0; index < ARV.con.commonParams.length; index++) {
        param = ARV.con.commonParams[index];
        value = $("#" + param).val();
        $("#chart").append(param + ":" + value + "<br>");
    }
    var chartSpecificParams = ARV.con[graphType + "ChartParams"];
    for (index = 0; index < chartSpecificParams.length; index++) {
        param = chartSpecificParams[index];
        value = $("#" + param).val();
        $("#chart").append(param + ":" + value + "<br>");
    }
};