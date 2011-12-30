ARV = {};
ARV.TabelDisplayGen = function(){
	var self = this;
	var option;
	var i = 0; 
	
	
	this.container = $('#container');
	this.categoryColumns =  $('#catcolumns');
	this.categoryRows =  $('#catrows');
	this.measureColumns =  $('#meacolumns');
	this.measureRows =  $('#mearows');
	
	this.groups =  $('#groups');
	this.orders = $('#orders');
	this.colorMark = $('#colorMark');
	this.sizeMark = $('#sizeMark');
	

	this.tableDisplay = new AR.TableDisplay(cars,self.container);
	this.fields = this.tableDisplay.getFields();
	this.numfields = this.tableDisplay.getNumericFields();

	option = $('<option />').val("###Auto###").append("Auto");
	$(".auto").append(option);
	
	for(i=0;i < this.fields.length; i++){
		option = $('<option />').val(this.fields[i]).append(this.fields[i]);
		$(".fields").append(option);
	}
	
	for(i=0;i < this.numfields.length; i++){
		option = $('<option />').val(this.numfields[i]).append(this.numfields[i]);
		$(".numfields").append(option);
	}

	$(".chzn-select").chosen();
	
	$('.chzn-select').change(function(){
		try{
			var spec = self.buildSpec();
			self.tableDisplay.update(spec);
		}catch(e){
			//do nothing.
		}
		
	});

};


ARV.TabelDisplayGen.prototype.buildSpec = function(){
		var spec = {};
		spec["columns"] = {"categories":this.categoryColumns.val(),"measures":this.measureColumns.val()}
		spec["rows"] = {"categories":this.categoryRows.val(),"measures":this.measureRows.val()}
		spec["groups"] = this.groups.val();
		spec["orders"] = this.orders.val();
		spec["colorMark"] = this.colorMark.val();
		spec["sizeMark"] = this.sizeMark.val();
		return spec;
};

