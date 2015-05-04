ScatterVis = function(_parentElement, _data, _metaData, _eventHandler){
		this.parentElement = _parentElement;
		this.plotData = _data;
		this.metaData = _metaData;
		this.eventHandler = _eventHandler;

		this.coffeeRestaurants = [];


		//Margin, width, and height definitions for scatter plot svg
		this.margin = {top: 20, right: 50, bottom: 100, left: 70};
		this.width = 800 - this.margin.left - this.margin.right;
		this.height = 687 - this.margin.top - this.margin.bottom;
		//Width x Height: 780x650

		//Initialize the scatter plot visualization
		this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
ScatterVis.prototype.initVis = function(){

	var that = this;

	this.svg = d3.select('#scatter').append("svg")
			.attr("width", this.width + this.margin.left + this.margin.right)
			.attr("height", this.height + this.margin.top + this.margin.bottom)
		.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


	//Define Axis and Scales

	this.x = d3.scale.linear()
		.range([0, this.width]);

	this.y = d3.scale.linear()
		.range([this.height, 0]);

	this.xAxis = d3.svg.axis()
		.scale(this.x)
		.orient("bottom");

	this.yAxis = d3.svg.axis()
		.scale(this.y)
		.orient("left");

	//g containing the x axis
	this.svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (this.height +1) + ")")

	//g containing the y axis
	this.svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0,0)") 

	this.svg.append("g")
			.attr("id", "g-scatter-circles")

	this.svg.append("g")
			.attr("id", "g-scatter-coffee")

	this.svg.append("g")
			.attr("id", "g-scatter-stops")

	this.svg.append("g").append("text")
		.attr("text-anchor", "middle") 
		.attr("transform", "translate("+ -this.margin.left/1.5 +","+(this.height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("longitude");


	this.svg.append("g").append("text")
		.attr("text-anchor", "middle") 
		.attr("transform", "translate("+ (this.width/2) +","+(this.height + this.margin.bottom/2)+")")  // centre below axis
		.text("latitude");


	//Define Legend Material For ScatterPlot Zoom Portion
	this.legend = this.svg.append("g").attr("transform", "translate(0,535)");

	this.legend.append("text")
		.attr("class", "zoom-legend-sm-em")
		.attr("text-anchor", "middle")
		.attr("x", 50)
		.attr("y", 0)
		.text("Restaurants: ");

	this.legend.append("text").attr("class", "zoom-legend-sm-em")
		.attr("text-anchor", "middle")
		.attr("x", 200)
		.attr("y", 0)
		.text("Reviews: ");


	//To be populated in ZoomVis.js	
	this.legend.append("text").attr("id", "zoom-restaurants")
		.attr("class", "legend-sm-sm")
		.attr("text-anchor", "middle")
		.attr("x", 115)
		.attr("y", 0)
		.text("4590");

	this.legend.append("text").attr("id", "zoom-totalReviews")
		.attr("class", "legend-sm-sm")
		.attr("text-anchor", "middle")
		.attr("x", 260)	
		.attr("y", 0)  
		.text("459294");

	// filter, aggregate, modify data
	this.wrangleData();

	// call the update method
	this.updateVis();

}



ScatterVis.prototype.wrangleData = function(){

	//Filter out outlier values (believe they are erroneous values)
	that = this;
	var filter_Data = []

	this.plotData.forEach(function(d){

		if(d.latitude > 42.18 && d.latitude < 42.5 && d.longitude > -71.3 && d.longitude < -70.9){
			filter_Data.push(d);
		}

		if(d.name == "Dunkin' Donuts"){ that.coffeeRestaurants.push(d) }
		else if(d.name == "Starbucks"){ that.coffeeRestaurants.push(d) }

	})

	this.filterData = filter_Data

}



ScatterVis.prototype.updateVis = function(){

	var that = this;


	// this.x.domain(d3.extent(this.data, function(d){return d.latitude}))

	this.x.domain([-71.35, -70.95])
	//(-71.3, -80.9)

	// this.y.domain(d3.extent(this.data, function(d){return d.longitude}))
	this.y.domain([42.18, 42.5])


	//update axis
	this.svg.select(".x.axis")
		.call(this.xAxis)     

	this.svg.select(".y.axis")
		.call(this.yAxis);


	//Plot restaurant data
	g = d3.select('#g-scatter-circles');
	this.circle = g.selectAll("scatter-circle")
				   .data(this.filterData)

	this.circle_enter = this.circle.enter().append("circle")
							 .attr("class", "scatter-circle")
							 .attr("cx", function(d) { return that.x(d.longitude) })
							 .attr("cy", function(d) { return that.y(d.latitude) })
							 .attr("r", function(d) { return 2 });


    // draw T stops							
	g = d3.select('#g-scatter-stops');					 
	var stops = g.selectAll("scatter-stops")
				.data(this.metaData)
				.enter()
				.append("circle")
				.attr("cy", function(d){ return that.y(d.ll[0]) })
				.attr("cx", function(d){ return that.x(d.ll[1]) })
				.attr("class", function(d){ return "scatter-stops " + d.line[0] })
				.attr("r", function(d){ return 3 });							 


	// draw coffee stops
	g = d3.select('#g-scatter-coffee');			
	var coffee = g.selectAll("scatter-coffee")
  				 .data(this.coffeeRestaurants)
  				 .enter()
  				 .append("circle")
  				 .attr("class", function(d){
  				 	if(d.name == "Dunkin' Donuts"){ return "scatter-coffee " + "Starbucks" }
  				 	else if(d.name == "Starbucks"){ return "scatter-coffee " + "Dunkin" }
  				 })
  				 .attr("cx", function(d){
  				 	return that.x(d.longitude)
  				 })
  				 .attr("cy", function(d){
  				 	return that.y(d.latitude)
  				 })
  				 .attr("r", function(d){return 3})



	var brush = this.svg.append("g")
			.attr("class", "brush")
			.call(d3.svg.brush()
				.x(d3.scale.identity().domain([0, this.width]))
				.y(d3.scale.identity().domain([0, this.height]))
				.on("brush", function() {
				
					var extent = d3.event.target.extent();
					that.circle_enter.classed("brush-selected", function(d) {

						if( extent[0][0] <= that.x(d.longitude) && that.x(d.longitude) < extent[1][0]
								&& extent[0][1] <= that.y(d.latitude) && that.y(d.latitude) < extent[1][1] ){
							return true;
						}
						else {
							return false;
						}

					});

					var extent = d3.event.target.extent();
					var extent_invert = [
													[that.x.invert(extent[0][0]), that.x.invert(extent[1][0])],
													[that.y.invert(extent[0][1]), that.y.invert(extent[1][1])]
												]

					//console.log(extent_invert)
					$(that.eventHandler).trigger("selectionChanged", extent_invert)


				}));

				
}


ScatterVis.prototype.filter = function() {

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
	if (all) { this.resize('.scatter-circle', 2) }
	else     { this.resize('.scatter-circle', 0) }

	if (stops) { this.resize('.scatter-stops', 3) }
    else       { this.resize('.scatter-stops', 0) }

	if (coffee) { this.resize('.scatter-coffee', 3) }
	else        { this.resize('.scatter-coffee', 0) }
}


ScatterVis.prototype.resize = function(selector, radius) {
	    d3.selectAll(selector)							 
	        .transition()
	        .duration(0)
			.attr("r", function(d) {return radius });	
}










