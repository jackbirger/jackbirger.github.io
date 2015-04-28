ScatterVis = function(_parentElement, _data, _metaData, _eventHandler){
    this.parentElement = _parentElement;
    this.plotData = _data;
    this.metaData = _metaData;
    this.eventHandler = _eventHandler;

    //Margin, width, and height definitions for scatter plot svg
    this.margin = {top: 20, right: 50, bottom: 200, left: 80},
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
		.range([this.margin.left, this.width - this.margin.left - this.margin.right]);

	this.y = d3.scale.linear()
		.range([this.height + this.margin.top, this.margin.top]);

  this.xAxis = d3.svg.axis()
  	.scale(this.x)
  	.orient("bottom");

  this.yAxis = d3.svg.axis()
    .scale(this.y)
    .orient("left");

  //g containing the x axis
 	this.svg.append("g")
  	.attr("class", "x axis")
    .attr("transform", "translate(" + -this.margin.left + "," + (this.height + this.margin.top) + ")")

  //g containing the y axis
  this.svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" +0 +"," + 0+")") 

  this.svg.append("g").append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ -50 +","+(this.height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
    .text("longitude");


  this.svg.append("g").append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ ((this.width-this.margin.left-this.margin.right)/2) +","+(this.height+60)+")")  // centre below axis
      .text("latitude");

  // filter, aggregate, modify data
  this.wrangleData();

  // call the update method
  this.updateVis();

}



ScatterVis.prototype.wrangleData = function(){


}



ScatterVis.prototype.updateVis = function(){

	var that = this;


	// this.x.domain(d3.extent(this.data, function(d){return d.latitude}))

	this.x.domain([42.2, 42.5])


	// this.y.domain(d3.extent(this.data, function(d){return d.longitude}))
	this.y.domain([-70.9, -71.3])


  //update axis
  this.svg.select(".x.axis")
    .call(this.xAxis)     

  this.svg.select(".y.axis")
    .call(this.yAxis);


  //Plot circles for scatter plot
  this.circle = this.svg
  						.selectAll("scatter_circle")
  						.data(this.plotData)

 	this.circle_enter = this.circle
 							.enter()
 							.append("circle")
 							.attr("class", "scatter_circle")
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
						   .style("stroke-width", 0)

  var brush = this.svg.append("g")
      .attr("class", "brush")
      .call(d3.svg.brush()
        .x(d3.scale.identity().domain([0, this.width]))
        .y(d3.scale.identity().domain([0, this.height]))
        .on("brush", function() {
          var count = 0
          var extent = d3.event.target.extent();
          that.circle_enter.classed("selected", function(d) {

            if( extent[0][0] <= that.x(d.latitude) && that.x(d.latitude) < extent[1][0]
                && extent[0][1] <= that.y(d.longitude) && that.y(d.longitude) < extent[1][1] ){
              count++;
              return true
            }else{return false}

          });

          console.log("count", count)

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














