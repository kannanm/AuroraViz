ARV = {};
ARV.TabelDisplayGen = function(){
	var self = this;
	var option;
	var i = 0; 
	
	this.container = $('#container');
	this.selectColumns =  $('#selcolumns');
	this.selectRows =  $('#selrows');
	this.groups =  $('#groups');
	this.orders = $('#orders');
	this.colorMark = $('#colorMark');
	this.sizeMark = $('#sizeMark');
	

	this.tableDisplay = new AR.TableDisplay(sales,self.container);
	this.fields = this.tableDisplay.getFields();
	
	for(i=0;i < this.fields.length; i++){
		option = $('<option />').val(this.fields[i]).append(this.fields[i]);
		$(".chzn-select").append(option);
	}
	$(".chzn-select").chosen();
	
	$('.chzn-select').change(function(){
		var spec = self.buildSpec();
		self.tableDisplay.update(spec);
		
	});

};


ARV.TabelDisplayGen.prototype.buildSpec = function(){
		var spec = {"categories":[],"measures":[],"groups":[],"orders":[],"colorMark":"","sizeMark":""};
		spec["columns"] = this.selectColumns.val();
		spec["rows"] = this.selectRows.val();
		spec["groups"] = this.groups.val();
		spec["orders"] = this.orders.val();
		spec["colorMark"] = this.colorMark.val();
		spec["sizeMark"] = this.sizeMark.val();
		return spec;
};

