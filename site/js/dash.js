$(function(){

	var self = this;
	
	self.holder    = $('.ourHolder');
	self.data 	   = self.holder.clone();
	self.filteredData = self.data.find('.item');
	self.searchInput= $('#searchtext');
	self.newchartButton = $('#newchart');
	self.newfileButton = $('#newfile');
	self.newdashButton = $('#newdash');
	self.backButton = $('#goback');
	
	self.newchartOptions = $('#newChartOptions');
	self.newfileOptions = $('#newChartOptions');
	self.newdashOptions = $('#newDashboardOptions');
	self.allOptions = $('.options');
	
	self.initialize = function(){
		self.showSearchList('all',self.setDefaultClick);
	}
	
	self.newchartButton.click(function(){
		self.allOptions.hide();
		self.backButton.show();
		self.newchartOptions.show();
		self.filteredData = self.data.find('.item');
		self.showSearchList('file',self.chooseFile);
	});

    self.show = function(filteredData,callback){
	    self.filteredData = filteredData;


		// call quicksand and assign transition parameters
		self.holder.quicksand(
			filteredData, 
			{duration: 10,easing: 'swing'}, 
			callback
		);				    
	    self.holder.masonry({
		  itemSelector: '.item'
		});
    }
    
    self.setClick = function(type){
		$('.item[data-type='+type+']').click(function(){
			window.location.href = {
					dashboard : "create-dashboard.html",
					file : "chart.html",
					chart : "chart.html"
			}[type];
		});

    }
    self.setDefaultClick = function(){
    	self.setClick('chart');
    	self.setClick('dashboard');
    	self.setClick('file');
    	
    }
    self.chooseFile = function(){
    
    	self.setClick('file');
    }

    
    self.searchList = function(data,searchText,filterType){
	    var searchedList = data;
		searchedList =  data.filter(function(){
			//case insensitive - i
			var regx =	new RegExp(searchText, "i");
			var fileType = $(this).attr('data-type');
			var fileName = $(this).find('>h4').first().text();
			var typePass = (filterType =='all'|| filterType ==fileType);
			var regexPass = !(fileName.search(regx) < 0);
			var space = !searchText.match(/\S/);
			var namePass = (space || regexPass );
			return typePass && namePass;
			
		});
		return searchedList;
    }
    
    self.showSearchList = function(filterType,callback) {
		var searchText = self.searchInput.attr('value');
		filterType = filterType?filterType:'all';
		var	toShow = self.searchList(self.filteredData,searchText,filterType);
		self.show(toShow,callback);
		return false;
	}
    				  
	$('#filterOptions li .filter').click(function(e) {
		self.filteredData = self.data.find('.item');
		$('#filterOptions li').removeClass('active');
		var filterType = $(this).parent().attr('class');
		$(this).parent().addClass('active');
		return self.showSearchList(filterType,self.setDefaultClick);
	});
	  
	$('li .search').click(function(){
		self.showSearchList('all',self.setDefaultClick);
	});

	self.searchInput.keypress(function(e){
		var code= (e.keyCode ? e.keyCode : e.which);
		if (code == 13){
			self.showSearchList('all',self.setDefaultClick);
		};
		return true;
	});

	
	$( "span.search" ).button({
    		icons: {primary: "ui-icon-search"}
    });	
			  
	$( "span.all" ).button({
    });				  

	$( "span.chart" ).button({
    });				  

	$( "span.file" ).button({
    });				  

	$( "span.dashboard").button({
    });

	$( "span.create").button({
    		icons: {primary: "ui-icon-plus"}
    });
	self.initialize();
});

