ZoomStat = function(_parentElement, _data, _metaData){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 50, bottom: 100, left: 0, padding:10},
	this.width = 350 - this.margin.left - this.margin.right,
	this.height = 800 - this.margin.top - this.margin.bottom;


	//Initialize the scatter plot visualization
	this.initVis();

}

/**
 * Method that sets up the SVG and the variables
 */
ZoomStat.prototype.initVis = function(){

	var that = this;

	//define svg
	this.svg = d3.select('#zoomStats').append("svg")
		.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom)
	  .append("g")
	  	.attr("id", "zoom-legend")
		.attr("transform", "translate(" + this.margin.left+ "," + this.margin.top + ")");

}



ZoomStat.prototype.wrangleData = function(x_extents, y_extents){

}



ZoomStat.prototype.onSelectionChange = function (plotData, plotStops){

	var that = this

	this.plotData = plotData;
	this.plotStops = plotStops;


	// create an ordinal scale for the station names
	var yScale = d3.scale.ordinal().rangeRoundBands([0, this.plotStops.length*15], .5, 0)
	                               .domain(this.plotStops.map(function(d) { return d.station; }));

	//Select svg that will create legend in
	group = d3.select("#zoom-legend");


	//Data bind for names of stops
	var names = group.selectAll(".station-name")
	    .data(this.plotStops);

	//Create new text labels and assign locations
	names.enter().append("text")
					.attr("class", "station-name")
	                .attr("x", 100)
	                .attr("y", function(d) { return yScale(d.station) + 9; })
	                .attr("font-size", "10px")
	                .attr("font-family", "sans-serif")

	//Assign station names to text elements
	names.text(function(d){ return d.station} );

	//remove extra elements
	names.exit().remove();

	//Data bind for circle elements
	var circle = group.selectAll(".line-circle")
		.data(this.plotStops);


	//Create new circle elements when needed and assign locations
	circle.enter().append("circle")
				.attr("class", "line-circle")
	            .attr('cx', 90)
	            .attr('cy', function(d) { return yScale(d.station) + 6; })               
	            .attr('r', 3);

	//assign attributes to the circles
	circle.attr('stroke', function(d) { return d.line[0]; })
	    .attr('fill', function(d) { return d.line[0]; });


circle.exit().remove()










//this.wrangleData()

// console.log("plotted data:", plotData);
console.log("plotted stops:", plotStops);


}

ZoomStat.prototype.displayData = function (){

var that = this



  var node;



  node = this.svg.datum(this.data).selectAll(".node")
      .data(this.pack.nodes)


  node.enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
 	.append("circle")
      .attr("r", function(d) { return d.r; })   
	.append("title")
      .text(function(d) { return d.name + (d.children ? "" : ": " + that.format(d.size)); })


  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name.substring(0, d.r / 3); });


node.exit().remove()

d3.select(self.frameElement).style("height", this.diameter + "px");




}






