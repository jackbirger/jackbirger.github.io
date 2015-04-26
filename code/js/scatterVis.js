ScatterVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;

    //Margin, width, and height definitions for scatter plot svg
    this.margin = {top: 20, right: 0, bottom: 200, left: 50},
    this.width = 780 - this.margin.left - this.margin.right,
    this.height = 650 - this.margin.top - this.margin.bottom;

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
    .attr("transform", "translate(0," + this.height + ")")

  //g containing the y axis
  this.svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")   //Move y axis 75 to the right: change to constant later


  // filter, aggregate, modify data
  this.wrangleData();

  // call the update method
  this.updateVis();

}



ScatterVis.prototype.wrangleData = function(){
	//console.log("scatter data", this.data)

	// this.data.forEach(function(d){

	// 	console.log("lat", d.latitude);
	// 	console.log("long", d.longitude);

	// })


}


ScatterVis.prototype.updateVis = function(){

	var that = this;





	// this.x.domain(d3.extent(this.data, function(d){return d.latitude}))

	this.x.domain([42.25, 42.45])
	console.log("latitude extents for x-axis", d3.extent(this.data, function(d){return d.latitude}))

	// this.y.domain(d3.extent(this.data, function(d){return d.longitude}))
	this.y.domain([-71.0, -71.2])
	console.log("longitude extents for y-axis", d3.extent(this.data, function(d){return d.longitude}))

  //update axis
  this.svg.select(".x.axis")
    .call(this.xAxis)     

  this.svg.select(".y.axis")
    .call(this.yAxis);


  //Plot circles for scatter plot
  this.circle = this.svg
  						.selectAll("circle")
  						.data(this.data)

 	this.circle_enter = this.circle
 							.enter()
 							.append("circle")
 							.attr("class", "circle")
						   .attr("cx", function(d) {
						        return that.x(d.latitude);
						   })
						   .attr("cy", function(d) {
						         return that.y(d.longitude);
						   })
						   .attr("r", function(d) {
						         return 2;
						   })
						   .style("opacity", .1)



















}
















