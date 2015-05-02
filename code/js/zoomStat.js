ZoomStat = function(_parentElement, _data, _metaData){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 50, bottom: 100, left: 70, padding:10},
	this.width = 350 - this.margin.left - this.margin.right,
	this.height = 350 - this.margin.top - this.margin.bottom;

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
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


	//Define Scales
	this.x = d3.scale.linear()
		.range([0, this.width]);

	this.y = d3.scale.linear()
		.range([this.height, 0]);

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
ZoomStat.prototype.wrangleData = function(x_extents, y_extents){


}



ZoomStat.prototype.onSelectionChange = function (plotData, plotStops){


console.log("plotted data:", plotData);
console.log("plotted stops:", plotStops);


}






