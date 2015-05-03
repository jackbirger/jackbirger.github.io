ZoomVis = function(_parentElement, _data, _metaData, _eventHandler2){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;
	this.eventHandler_2 = _eventHandler2;	

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 10, bottom: 10, left: 70, padding:10},
	this.width = 300 - this.margin.left - this.margin.right,
	this.height = 250 - this.margin.top - this.margin.bottom;

	//Initialize the scatter plot visualization
	this.initVis();
	this.showOption = 'none';
}

/**
 * Method that sets up the SVG and the variables
 */
ZoomVis.prototype.initVis = function(){

	var that = this;


	//define svg
	this.svg = d3.select('#scatter-zoom').append("svg")
		.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


	//Define Scales
	this.x = d3.scale.linear()
		.range([2, this.width-2]);

	this.y = d3.scale.linear()
		.range([this.height-2, 2]);

	//Define Axes
	this.xAxis = d3.svg.axis()
		.scale(this.x)
		.orient("bottom");

	  this.yAxis = d3.svg.axis()
		.scale(this.y)
		.orient("left");

	//create rectangle for the zoom view

	this.svg.append("rect").attr("class", "border")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.width)
		.attr("height", this.height)


}


//Filter yelp dataset and the list of stops from the metadata
//so that only consists of the subset of data that is within
//The bounds of the brush select
ZoomVis.prototype.wrangleData = function(x_extents, y_extents){

	var that = this;

	//Data within the zoom extents
	this.plotData = [];

	//Common Restaurants within the zoom extents
	this.commonRestaurants = [];


	this.data.forEach(function(d){

		if( x_extents[0] < d.longitude && d.longitude < x_extents[1]
				&& y_extents[0] > d.latitude && d.latitude > y_extents[1]){

			that.plotData.push(d)

			if(d.name == "Chipotle Mexican Grill"){
				that.commonRestaurants.push(d);
			} else if(d.name == "Dunkin' Donuts"){
				that.commonRestaurants.push(d);
			} else if(d.name == "Starbucks"){
				that.commonRestaurants.push(d);
			} else if(d.name == "Au Bon Pain"){
				that.commonRestaurants.push(d);
			}

		}
	})


	//Filter train stops and store in this.plotStops
	this.plotStops = [];
	this.metaData.forEach(function(d){

		if( x_extents[0] < d.ll[1] && d.ll[1] < x_extents[1]
				&& y_extents[0] > d.ll[0] && d.ll[0] > y_extents[1]){
			
			that.plotStops.push(d)
		}
	})

	//console.log("plotted stops", this.plotData)
	console.log("commonRestaurants", this.commonRestaurants)

}

ZoomVis.prototype.showOption = function(select_options) {
	this.showOption = select_options;
}

ZoomVis.prototype.onSelectionChange = function (x_extents, y_extents){

	var that = this;

	// filter, aggregate, modify data
	this.wrangleData(x_extents, y_extents);

	//might want to move following stuff into new function to neaten up
	if(this.plotData.length > 0){

	this.x.domain([x_extents[0], x_extents[1]])
	this.y.domain([y_extents[1], y_extents[0]])



	//Plot circles for scatter plot
	this.circle = this.svg
		.selectAll(".brush-circles")
		.data(this.plotData)

	this.circle
		.attr("cx", function(d) {
			return that.x(d.longitude);
		})
		.attr("cy", function(d) {
			return that.y(d.latitude);
		})
		.attr("r", function(d) {
			return 2;
		})


	this.circle_enter = this.circle
		.enter()
		.append("circle")	
		.attr("class", "brush-circles")
		.attr("cx", function(d) {
			return that.x(d.longitude);
		})
		.attr("cy", function(d) {
			return that.y(d.latitude);
		})
		.attr("r", function(d) {
			return 2;
		})


	this.circle_exit = this.circle.exit().remove();
	

	if (this.showOption == 'stops') {
			console.log("hereherehere");

		// 	that.drawZoomStops();	  	
 	// }
  //   else if (this.showOption == 'none') {
  //   	console.log('not');
  //   }
	    

			that.drawZoomStops();	
		 	
	    }
	    
	  });

	  d3.selectAll("input").each(function(d) { 
	    if (d3.select(this).attr("type") == "radio" && d3.select(this).attr("name") == "common" && d3.select(this).node().checked) {
			//console.log("hereherehere")
			//that.drawZoomStops();	
			that.drawZoomCommon();  	
	    }
	    
	  });





	$(that.eventHandler_2).trigger("brushChanged", [that.plotData, that.plotStops]);


	} // close to if statement

}



ZoomVis.prototype.drawZoomStops = function(){

	var that = this;

	var stops = this.svg
		.selectAll(".brush-stops")
		.data(this.plotStops)
		// .attr("class", function(d){
		// 	return "brush-stops " + d.line[0];
		// })


	stops
		.attr("cx", function(d){
			return that.x(d.ll[1])
		})
		.attr("cy", function(d){
			return that.y(d.ll[0])
		})
		.attr("r", function(d){return 3})

	var stops_enter = stops
		.enter()
		.append("circle")
		.attr("class", function(d){
			return "brush-stops " + d.line[0];
		})
		.attr("cx", function(d){
			return that.x(d.ll[1])
		})
		.attr("cy", function(d){
			return that.y(d.ll[0])
		})
		.attr("r", function(d){return 3})
		//.style("stroke-width", 2);


	var stops_exit = stops.exit().remove();



}


ZoomVis.prototype.drawZoomCommon = function(){

	console.log("here")


	var that = this;

	var stops = this.svg
		.selectAll(".brush-common")
		.data(this.commonRestaurants)
		.attr("class", function(d){
			if(d.name == "Chipotle Mexican Grill"){
				return "brush-common " + "Chipotle";
			} else if(d.name == "Dunkin' Donuts"){
				return "brush-common " + "Dunkin";
			} else if(d.name == "Starbucks"){
				return "brush-common " + "Starbucks";
			} else if(d.name == "Au Bon Pain"){
				return "brush-common " + "AuBonPain";
			}
		});

	stops
		.attr("cx", function(d){
			return that.x(d.longitude)
		})
		.attr("cy", function(d){
			return that.y(d.latitude)
		})
		.attr("r", function(d){return 3})

	var stops_enter = stops
		.enter()
		.append("circle")
		.attr("class", function(d){
			if(d.name == "Chipotle Mexican Grill"){
				return "brush-common " + "Chipotle";
			} else if(d.name == "Dunkin' Donuts"){
				return "brush-common " + "Dunkin";
			} else if(d.name == "Starbucks"){
				return "brush-common " + "Starbucks";
			} else if(d.name == "Au Bon Pain"){
				return "brush-common " + "AuBonPain";
			}
		})
		.attr("cx", function(d){
			return that.x(d.longitude)
		})
		.attr("cy", function(d){
			return that.y(d.latitude)
		})
		.attr("r", function(d){return 3})


	var stops_exit = stops.exit().remove();
}


