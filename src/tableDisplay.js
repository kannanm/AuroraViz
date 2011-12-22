AR.FieldType={measure:"measure",category:"category"};

AR.TableDisplay = function(json,container){
	var field;
	var type;
	var val;
	var datatype;
	var i = 0;

	this._db = jl.from(json);
	this._container = container;
	this._firstRow = this._db.first();
	this._fields = AR.Utility.getKeys(this._firstRow);
	this._fieldsMeta = [];
	
	for(i =0;i < this._fields.length;i++){
		field = this._fields[i];
		val = this._firstRow[field];
		type = AR.Utility.isNumber(val)?AR.FieldType.measure:AR.FieldType.category;
		this._fieldsMeta[field] = {"type":type};
	}
	this._tableConfig = new AR.TableConfig(this._fieldsMeta,this._db);

};


AR.TableDisplay.prototype.getFields = function(){
	return this._fields;
};

AR.TableDisplay.prototype.update = function(spec){
	var tableModel = this._tableConfig.build(spec);
	console.log(tableModel);
};

AR.TableConfig = function(fieldsMeta,db){
	this._fieldsMeta = fieldsMeta;
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
	var measures = [];
	var categories = [];
	var field,category;
	var algebra = new AR.TableAlgebra();
	
	for(i=0;i < axisSpec.length; i++){
		field = axisSpec[i];
		if(this._fieldsMeta[field].type ==AR.FieldType.measure){
			algebra.measure(field);
		} else{
			category = this._db.distinct(field);
			algebra.category(category); 
		}
	}
	return algebra.nst();
};

AR.TableAlgebra = function(){
	this._measures = [];
	this._categories = [];
};

AR.TableAlgebra.prototype.category = function(field){
	this._categories.push(field); 
};

AR.TableAlgebra.prototype.measure = function(field){
	this._measures.push({"field":field}); 
};

AR.TableAlgebra.prototype.nst = function(){
	var operands = this._categories.compact();
	var measureOperands = this._measures.compact();
	operands = measureOperands.length>0 ?	operands.push(measureOperands):operands;
	return this._cross.apply(this,operands);
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


