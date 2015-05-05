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

		this.university_list = [
			{ name : "Berklee College of Music", "latitude": 42.346587, "longitude": -71.089388 },
			{ name : "Boston College", "latitude": 42.335553, "longitude": -71.168490 },
			{ name : "Boston University", "latitude": 42.350496, "longitude": -71.105394 },
			{ name : "Bunker Hill Community College", "latitude": 42.375074, "longitude": -71.069829 },
			{ name : "Emerson College", "latitude": 42.352075, "longitude": -71.065722 },
			{ name : "Harvard University", "latitude": 42.376983, "longitude": -71.116644 },
			{ name : "Massachusetts College of Art and Design", "latitude": 42.336824, "longitude": -71.099096 },
			{ name : "Massachusetts Institute of Technology", "latitude": 42.360079, "longitude": -71.094144 },
			{ name : "Northeastern University", "latitude": 42.339803, "longitude": -71.089167 },
			{ name : "Simmons College", "latitude": 42.339039, "longitude": -71.100654 },
			{ name : "Suffolk University", "latitude": 42.358887, "longitude": -71.061770 },
			{ name : "Tufts University", "latitude": 42.407488, "longitude": -71.119028 },
			{ name : "University of Massachusetts Boston", "latitude": 42.312413, "longitude": -71.035900 },
			{ name : "Wentworth Institute of Technology", "latitude": 42.337477, "longitude": -71.095358 },
			{ name : "Wheelock College", "latitude": 42.342192, "longitude": -71.106038 }
		];

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

	this.svg.append("g")
			.attr("id", "g-coffee-labels")

	this.svg.append("g")
			.attr("id", "g-universities")

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

	this.x.domain([-71.3, -70.97])
	this.y.domain([42.18, 42.47])

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
							 .attr("r", function(d) { return 1 });


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


 console.log('here');						
	g = d3.select('#g-universities');					 
	var universities = g.selectAll("scatter-university")
				.data(this.university_list)
				.enter()
				.append("circle")
				.attr("cy", function(d){ console.log(d.longitude); return that.y(d.latitude) })
				.attr("cx", function(d){ return that.x(d.longitude) })
				.attr("class", 'scatter-university')
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
        	zv.drawZoomStops();
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "coffee" && d3.select(this).node().checked) {
        	coffee = true;
        	zv.drawZoomCoffee();
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "universities" && d3.select(this).node().checked) {
        	universities = true;
        }
        else if (d3.select(this).attr("type") == "checkbox" && d3.select(this).attr("name") == "all" && d3.select(this).node().checked) {
        	all = true;
        }
    });

	// update circles accordingly


	if (all) { this.resize('.scatter-circle', 1.5) }
	else     { this.resize('.scatter-circle', 0) }

	if (stops) { this.resize('.scatter-stops', 3) }
    else       { this.resize('.scatter-stops', 0) }

	if (universities) { this.resize('.scatter-university', 4) }
    else              { this.resize('.scatter-university', 0) }

	if (coffee) { 
		this.resize('.scatter-coffee', 3) 
		legend = d3.select('#g-coffee-labels');
		legend.attr("transform", "translate(10,480)")
		    .append('text')
		    .attr('class', 'scatter-coffee-legend')
			.attr("x", 5)	
		    .attr("y", 4)  
		    .text("Starbucks");

		legend
		    .append('circle')
		    .attr('class', 'scatter-coffee-legend')
		    .attr('cx', 0)
		    .attr('cy', 0)
		    .attr('r', 3)
		    .attr('fill', 'green');

		 legend
		    .append('text')
		    .attr('class', 'scatter-coffee-legend')
			.attr("x", 5)	
		    .attr("y", 19)  
		    .text("Dunkin Donuts");

		legend
		    .append('circle')
		    .attr('class', 'scatter-coffee-legend')
		    .attr('cx', 0)
		    .attr('cy', 15)
		    .attr('r', 3)
		    .attr('fill', 'orange')

	}
	else { 
		d3.selectAll(".scatter-coffee-legend").remove();
		this.resize('.scatter-coffee', 0) 
	}
}


ScatterVis.prototype.resize = function(selector, radius) {
	    d3.selectAll(selector)							 
	        .transition()
	        .duration(0)
			.attr("r", function(d) {return radius });	
}










