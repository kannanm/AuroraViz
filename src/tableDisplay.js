AR.TableDisplay = function(json,container){
	var field;
	var numeric;
	var val;
	var datatype;
	var i = 0;

	this._db = jl.from(json);
	this._container = container;
	this._firstRow = this._db.first();
	this._fields = AR.Utility.getKeys(this._firstRow);
	this._numericFields = [];
	
	for(i =0;i < this._fields.length;i++){
		field = this._fields[i];
		val = this._firstRow[field];
		if(AR.Utility.isNumber(val)){
			this._numericFields.push(field);
		}
	}
	this._tableConfig = new AR.TableConfig(this._db);

};


AR.TableDisplay.prototype.getFields = function(){
	return this._fields;
};

AR.TableDisplay.prototype.getNumericFields = function(){
	return this._numericFields;
};


AR.TableDisplay.prototype.update = function(spec){
	var tableModel = this._tableConfig.build(spec);
	console.log(tableModel);
};

AR.TableConfig = function(db){
	this._db = db;
};

AR.TableConfig.prototype.build = function(spec){
	var rowSpec = spec["rows"];
	var columnSpec = spec["columns"];
	var rows = this._normalizedSetForm(rowSpec);
	var columns = this._normalizedSetForm(columnSpec);
	var tableModel = {"rows":rows,"columns":columns};
	return tableModel;
};

AR.TableConfig.prototype._normalizedSetForm = function(axisSpec){
	var i = 0;
	var field,category;
	var categories =axisSpec["categories"];
	var measures = axisSpec["measures"];
	var algebra = new AR.TableAlgebra();
	
	for(i=0;i < categories.length; i++){
			field = categories[i];
			category = this._db.distinct(field);
			algebra.operand(category); 
	}
	var fullModel = {"categories":categories,"measures":measures,"nst": algebra.nst()};
	return fullModel;
};

AR.TableAlgebra = function(){
	this.operands = [];
};
AR.TableAlgebra.prototype.operand = function(operand){
	this.operands.push(operand);
};

AR.TableAlgebra.prototype.nst = function(){
	return this._cross.apply(this,this.operands.compact());
}


AR.TableAlgebra.prototype._cross = function(){
  return Array.prototype.reduce.call(arguments, function(a, b) {
    var ret = [];
    a.forEach(function(a) {
      b.forEach(function(b) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
};


