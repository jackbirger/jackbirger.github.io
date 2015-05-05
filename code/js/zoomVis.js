ZoomVis = function(_parentElement, _data, _metaData, _eventHandler2){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;
	this.eventHandler_2 = _eventHandler2;	

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 10, bottom: 10, left: 70, padding:10},
	this.width = 300 - this.margin.left - this.margin.right,
	this.height = 250 - this.margin.top - this.margin.bottom;
	this.padding = 2;

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
		.range([this.padding, this.width-this.padding]);

	this.y = d3.scale.linear()
		.range([this.height-this.padding, this.padding]);

	//Define Axes
	this.xAxis = d3.svg.axis()
		.scale(this.x)
		.orient("bottom");

	  this.yAxis = d3.svg.axis()
		.scale(this.y)
		.orient("left");

	//create border rectangle for the zoom view
	this.svg.append("rect").attr("class", "border")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.width)
		.attr("height", this.height)

	//groups for zoom layout elements
	this.svg.append("g")
			.attr("id", "g-brush-circles")

	this.svg.append("g")
			.attr("id", "g-brush-coffee")

	this.svg.append("g")
			.attr("id", "g-brush-stops")
}


//Filter yelp dataset and the list of stops from the metadata
//so that only consists of the subset of data that is within
//The bounds of the brush select
ZoomVis.prototype.wrangleData = function(x_extents, y_extents){

	var that = this;

	//Data within the brush extents
	this.plotData = [];

	//Coffee shops within the brush extents
	this.coffeeRestaurants = [];

	//Train stops within the brush extents
	this.plotStops = [];


	this.data.forEach(function(d){

		if( x_extents[0] < d.longitude && d.longitude < x_extents[1]
				&& y_extents[0] > d.latitude && d.latitude > y_extents[1]){

			//Create list of restaurants within extents
			that.plotData.push(d)

			//Create list of coffee shops within the extents
			if(d.name == "Dunkin' Donuts"){ that.coffeeRestaurants.push(d) }
			else if(d.name == "Starbucks"){ that.coffeeRestaurants.push(d) }	

		}
	})


	//Populate this.plotStops with train stops in brush extents
	this.metaData.forEach(function(d){

		if( x_extents[0] < d.ll[1] && d.ll[1] < x_extents[1]
				&& y_extents[0] > d.ll[0] && d.ll[0] > y_extents[1]){
			
			that.plotStops.push(d)
		}
	})

	//console.log("plotted stops", this.plotStops)
	// console.log("coffeeRestaurants", this.coffeeRestaurants)
	// console.log("plotData", this.plotData)
}

ZoomVis.prototype.setOption = function(select_options) {
	this.showOption = select_options;
}

ZoomVis.prototype.onSelectionChange = function (x_extents, y_extents){

	var that = this;

	// wrangle data that will be updated in brush zoom
	this.wrangleData(x_extents, y_extents);

	//might want to move following stuff into new function to neaten up
	if(this.plotData.length > 0){

		//Set Scale Domain
		this.x.domain([x_extents[0], x_extents[1]])
		this.y.domain([y_extents[1], y_extents[0]])


		// this.drawZoomRestaurants();
		// this.drawZoomStops();
		// this.drawZoomCoffee();


	
	d3.selectAll("input").each(function(d) { 
        if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "stops" && d3.select(this).node().checked) {
        	that.drawZoomStops();
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "coffee" && d3.select(this).node().checked) {
        	that.drawZoomCoffee();
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "universities" && d3.select(this).node().checked) {
        	console.log("Implement universities")
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "all" && d3.select(this).node().checked) {
        	that.drawZoomRestaurants();
        }
    });
	    


	$(that.eventHandler_2).trigger("brushChanged", [that.plotData, that.plotStops]);


	} // close to if statement

}


//Draws and updates the train stops in the zoom layout
ZoomVis.prototype.drawZoomStops = function(){


	var that = this;

	g = d3.select('#g-brush-stops');

	var stops = g.selectAll(".brush-stops")
		.data(this.plotStops)

	stops
		.attr("cx", function(d){
			return that.x(d.ll[1])
		})
		.attr("cy", function(d){
			return that.y(d.ll[0])
		})
		.attr("r", function(d){return 3})
		.attr("class", function(d){
			return "brush-stops " + d.line[0];
		})

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


	var stops_exit = stops.exit().remove();



}


//Draws and updates the coffee shops in the zoom layout
ZoomVis.prototype.drawZoomCoffee = function(){


	var that = this;

	g = d3.select('#g-brush-coffee');

	var stops = g.selectAll(".brush-coffee")
		.data(this.coffeeRestaurants)
		.attr("class", function(d){
			if(d.name == "Dunkin' Donuts"){ return "brush-coffee " + "Starbucks" }
			else if(d.name == "Starbucks"){ return "brush-coffee " + "Dunkin" }
		})

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
			if(d.name == "Dunkin' Donuts"){ return "brush-coffee " + "Starbucks" }
			else if(d.name == "Starbucks"){ return "brush-coffee " + "Dunkin" }
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


//Draws and updates the Restaurants in the zoom layout
ZoomVis.prototype.drawZoomRestaurants = function(){

	var that = this;

	g = d3.select('#g-brush-circles');

	//Plot circles for scatter plot
	this.circle = g.selectAll(".brush-circles")
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

}

ZoomVis.prototype.filter = function() {

	// set initial variable state to false
	stops = coffee = universities = all = false;

	// build a state machine
	d3.selectAll("input").each(function(d) { 
        if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "stops" && d3.select(this).node().checked) {
        	stops = true;
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "coffee" && d3.select(this).node().checked) {
        	coffee = true;
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "universities" && d3.select(this).node().checked) {
        	universities = true;
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "all" && d3.select(this).node().checked) {
        	all = true;
        }
    });

	// update circles accordingly
	if (all) { this.resize('.brush-circles', 1.5) }
	else     { this.resize('.brush-circles', 0) }

	if (stops) { this.resize('.brush-stops', 3) }
    else       { this.resize('.brush-stops', 0) }

	if (coffee) { this.resize('.brush-coffee', 3) }
	else { this.resize('.brush-coffee', 0) }
}


ZoomVis.prototype.resize = function(selector, radius) {
	    d3.selectAll(selector)							 
	        .transition()
	        .duration(0)
			.attr("r", function(d) {return radius });	
}

