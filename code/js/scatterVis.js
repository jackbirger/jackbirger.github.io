ScatterVis = function(_parentElement, _data, _metaData, _eventHandler){
		this.parentElement = _parentElement;
		this.plotData = _data;
		this.metaData = _metaData;
		this.eventHandler = _eventHandler;

		console.log(this.plotData)

		//Margin, width, and height definitions for scatter plot svg
		this.margin = {top: 20, right: 50, bottom: 100, left: 70},
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
			.attr("transform", "translate(0,0)") 

	this.svg.append("g").append("text")
		.attr("text-anchor", "middle") 
		.attr("transform", "translate("+ -this.margin.left/1.5 +","+(this.height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("longitude");


	this.svg.append("g").append("text")
			.attr("text-anchor", "middle") 
			.attr("transform", "translate("+ (this.width/2) +","+(this.height + this.margin.bottom/2)+")")  // centre below axis
			.text("latitude");

	// filter, aggregate, modify data
	this.wrangleData();

	// call the update method
	this.updateVis();

}



ScatterVis.prototype.wrangleData = function(){

	//Filter out outlier values (believe they are erroneous values)

	var filter_Data = []

	this.plotData.forEach(function(d){

		if(d.latitude > 42.18 && d.latitude < 42.5 && d.longitude > -71.3 && d.longitude < -70.9){
			filter_Data.push(d);
		}

	})

	this.filterData = filter_Data


}



ScatterVis.prototype.updateVis = function(){

	var that = this;


	// this.x.domain(d3.extent(this.data, function(d){return d.latitude}))

	this.x.domain([-71.3, -70.9])


	// this.y.domain(d3.extent(this.data, function(d){return d.longitude}))
	this.y.domain([42.18, 42.5])


	//update axis
	this.svg.select(".x.axis")
		.call(this.xAxis)     

	this.svg.select(".y.axis")
		.call(this.yAxis);


	//Plot circles for scatter plot
	this.circle = this.svg
							.selectAll("scatter-circle")
							.data(this.filterData)

	this.circle_enter = this.circle
							.enter()
							.append("circle")
							.attr("class", "scatter-circle")
							 .attr("cx", function(d) {
										return that.x(d.longitude);
							 })
							 .attr("cy", function(d) {
										 return that.y(d.latitude);
							 })
							 .attr("r", function(d) {
										 return 2;
							 })


	var stops = this.svg
							.selectAll("scatter-stops")
							.data(this.metaData)
							.enter()
							.append("circle")
							.attr("class", "scatter-stops")
							.attr("cx", function(d){
								return that.x(d.ll[1])
							})
							.attr("cy", function(d){
								return that.y(d.ll[0])
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

							return true
						}else{return false}

					});

					var extent = d3.event.target.extent();
					var extent_invert = [
													[that.x.invert(extent[0][0]), that.x.invert(extent[1][0])],
													[that.y.invert(extent[0][1]), that.y.invert(extent[1][1])]
												]


					$(that.eventHandler).trigger("selectionChanged", extent_invert)

					// if(that.brush.empty()){
					//  $(that.eventHandler).trigger("selectionChanged", d3.event.target.extent(), , d3.selectAll(".selected"))           
					// }
					// else{$(that.eventHandler).trigger("selectionChanged", d3.event.target.extent(), d3.selectAll(".selected"))}  

				}));


					
}














