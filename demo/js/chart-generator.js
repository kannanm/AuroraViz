ARV.drawGraph = function(){
	$("#chart").html("");
	var graphType = $("select option:selected").attr("value");
	var a = {};
	for(index in ARV.con.commonParams){
		var param =ARV.con.commonParams[index]
		var value = $("#"+param).val();
		$("#chart").append(param + ":" + value +"<br>");
	}
	var chartSpecificParams = ARV.con[graphType+"ChartParams"];
	for(index in chartSpecificParams){
		var param =chartSpecificParams[index];
		var value = $("#"+param).val();
		$("#chart").append(param + ":" + value +"<br>");
	}
};
ARV.getUrlVars = function()
{
	var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}