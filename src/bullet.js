/**@author : aditya.g*/

AR.BulletGraph = function(graphDef){
	var self = this;
	var bullet, bulletPanel;
	//TODO: Create the following using function generator as there is a minor difference between the two
	self.setVerGridShow = function(status) {
		if (status === true) {
			AR.Graph.prototype.setVerGridShow.apply(self, [self._dimension.width, AR.Utility.scale.linear ]);
		}
	};
	self.setHorGridShow = function(status) {
		if (status === true) {
			AR.Graph.prototype.setHorGridShow.apply(self, [ self._dimension.height, AR.Utility.scale.linear ]);
		}
	};
	
	self.addData = function(data){
		bulletPanel.data(data);
	};
	
	self.setBulletPanelWidth = function(width){
		bulletPanel.width(width || (self._dimension.width-40)/2)
	};
	
	self.setBulletPanelHeight = function(height){
		bulletPanel.height(height || (self._dimension.height -40)/(2* graphDef.data.length));
	};
	
	self.setBulletPanelLeft = function(left){
		bulletPanel.left(left || 100);
	};
	
	self.setOrientation = function(orientation){
		bullet.orient(orientation || "left");
	};
	
	self.setMarkerShape = function(shape){
		bullet.marker.shape(shape || "triangle");
	};
	
	self.setMarkerFillStyle = function(color){
		bullet.marker.fillStyle(color || "white");
	};
	
	self.setMeasuresFillStyle = function(color){
		bullet.measure.fillStyle(color || "#1F77B4");
	};
	
	self.setRangeFillStyle = function(){
		var colors = AR.Utility.getPaletteColors(graphDef);
		bullet.range.fillStyle(function(){
			return colors[this.index % colors.length] ;
		});
	};
	
	AR.Graph.apply(self, [ graphDef ]);
	
	var addBulletPanel = function(){
		bulletPanel = self._panel.add(pv.Panel).margin(20);
		
	};
	
	var setBulletPanelTop = function(){
		bulletPanel.top(function(){
			return this.index*2*(self._dimension.height)/(2* graphDef.data.length) + 40;
		});
	};
	
	var addBullets = function(){
		bullet = bulletPanel.add(pv.Layout.Bullet);
	};

//  The following is an implementation of function generator that creates set<Property> functions. 
//	
//	var props = ["ranges","measures","markers"];
//	var setterFunc = function(){
//		var retObject = {},i,property;
//		for(i =0 ;i<props.length;i++){
//			property = props[i];
//			upcasedProp = property.substring(0, 1).toUpperCase() + property.substring(1);
//			retObject["set"+upcasedProp] = function(){
//				bullet[property](function(d) d[property]);
//			}
//		}
//		retun retObject;
//	};
	
	var setRange = function(){
		 bullet.ranges(function(d) d.ranges);
	};
	
	var setMeasures = function(){
		bullet.measures(function(d) d.measures);
	};
	
	var setMarkers = function(){
		bullet.markers(function(d) d.markers);
	};
	
	var addRangeElement = function(elem){
		bullet.range.add(pv[elem] || pv.Bar);
	};
	
	var addMeasureElement = function(elem){
		bullet.measure.add(pv[elem] || pv.Bar);
	};
	
	var addMarkerElement = function(elem){
		bullet.marker.add(pv[elem] || pv.Dot);
	};
	
	var createRule = function(){
		bullet.tick.add(pv.Rule).anchor("bottom").add(pv.Label).text(bullet.x.tickFormat);
	};
	
	var addLabel = function(){
		if(graphDef.showLabels){
			var labels = bullet.anchor("left").add(pv.Label).textBaseline("bottom").text(function(d) d.title);
			AR.Utility.setLabelProperties(graphDef,labels,true);
			labels.textAlign("right");
		}
	};
	
	var addValues = function(){
		if(graphDef.showValues){
			//TODO write code for functionality
		}
	};
	var setTitleText = function(){
		bullet.title(function(d){
			console.log(this.parent.index);
			return d.toolTipText;
		})
	};
	
	var createBulletChart = function(){
		addBulletPanel();
		self.addData(graphDef.data);
		self.setBulletPanelWidth();
		self.setBulletPanelHeight();
		self.setBulletPanelLeft();
		setBulletPanelTop();
		addBullets();
		self.setOrientation(graphDef.bulletOrientation);
		setRange();
		setMeasures();
		setMarkers();
		addRangeElement();
		addMeasureElement();
		addMarkerElement();
		self.setMarkerShape(graphDef.markerShape);
		self.setMarkerFillStyle(graphDef.markerFillColor);
		self.setMeasuresFillStyle(graphDef.measureFillColor);
		self.setRangeFillStyle();
		createRule();
		addLabel();
		setTitleText();
		AR.Utility.setToolTip(graphDef, bullet, "s");
	};
	createBulletChart();
}
AR.BulletGraph.prototype = AR.extend(AR.Graph);