ZoomVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;

    //Margin, width, and height definitions for scatter plot svg
    this.margin = {top: 20, right: 0, bottom: 20, left: 50},
    this.width = 350 - this.margin.left - this.margin.right,
    this.height = 350 - this.margin.top - this.margin.bottom;

    //Initialize the scatter plot visualization
    this.initVis();

}

/**
 * Method that sets up the SVG and the variables
 */
ZoomVis.prototype.initVis = function(){

	var that = this;

	this.svg = d3.select('#scatter-zoom').append("svg")
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
    	.attr("transform", "translate(0," + this.height + ")")

	  //g containing the y axis
	  this.svg.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(0,0)")  


  // filter, aggregate, modify data
  this.wrangleData();

  // call the update method


}


ZoomVis.prototype.wrangleData = function(){



}


ZoomVis.prototype.onSelectionChange = function (x_extents, y_extents){

	var that = this;

	this.plotData = [];

	this.data.forEach(function(d){

		if( x_extents[0] <= d.latitude && d.latitude < x_extents[1]
                && y_extents[0] <= d.longitude && d.longitude < y_extents[1]){
			
			that.plotData.push(d)
		}
	})

	console.log("plotData", this.plotData)
	// this.x.domain(d3.extent(this.plotData, function(d){return d.latitude}))
	// this.y.domain(d3.extent(this.plotData, function(d){return d.longitude}))

	this.x.domain([x_extents[0], x_extents[1]])
	this.y.domain([y_extents[0], y_extents[1]])

	//update axis
	this.svg.select(".x.axis")
		.call(this.xAxis);     

  	this.svg.select(".y.axis")
    	.call(this.yAxis);


  	//Plot circles for scatter plot
  	this.circle = this.svg
		.selectAll(".brush-circles")
		.data(this.plotData)


 	this.circle_enter = this.circle
			.enter()
			.append("circle")	
			.attr("class", "brush-circles")
			.attr("cx", function(d) {
	        	return that.x(d.latitude);
	 		})
	  		.attr("cy", function(d) {
	        	return that.y(d.longitude);
	 		})
	  		.attr("r", function(d) {
	        	return 2;
	   		})
	   		.style("opacity", 1)
	   		.style("stroke-width", 1)

	this.circle_exit = this.circle.exit().remove();

}






