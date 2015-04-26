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

	var that = this;
	var plotData = []

	this.data.forEach(function(d){
        latitude = d.latitude;
        longitude = d.longitude;

        match = 1;
        plotData.forEach(function(e){
            if (e.longitude == longitude && e.latitude == latitude) { match=0; }
        })
        if (match){
            plotData.push(d);
        }

	})

  this.plotData = plotData
	console.log("plotData", plotData)


}



ScatterVis.prototype.updateVis = function(){

	var that = this;


	// this.x.domain(d3.extent(this.data, function(d){return d.latitude}))

	this.x.domain([42.2, 42.5])
	console.log("latitude extents for x-axis", d3.extent(this.data, function(d){return d.latitude}))

	// this.y.domain(d3.extent(this.data, function(d){return d.longitude}))
	this.y.domain([-70.9, -71.3])
	console.log("longitude extents for y-axis", d3.extent(this.data, function(d){return d.longitude}))

  //update axis
  this.svg.select(".x.axis")
    .call(this.xAxis)     

  this.svg.select(".y.axis")
    .call(this.yAxis);


  //Plot circles for scatter plot
  this.circle = this.svg
  						.selectAll("circle")
  						.data(this.plotData)

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
						   .style("opacity", .5)
						   .style("stroke-width", 0)

  var brush = this.svg.append("g")
      .attr("class", "brush")
      .call(d3.svg.brush()
        .x(d3.scale.identity().domain([0, this.width]))
        .y(d3.scale.identity().domain([0, this.height]))
        .on("brush", function() {
          var extent = d3.event.target.extent();
          that.circle_enter.classed("selected", function(d) {

            return extent[0][0] <= that.x(d.latitude) && that.x(d.latitude) < extent[1][0]
                && extent[0][1] <= that.y(d.longitude) && that.y(d.longitude) < extent[1][1];
          });
        }));

          
}

// ScatterVis.prototype.updateVis_2 = function(){

//   var data = d3.range(5000).map(function() {
//     return [Math.random() * this.width, Math.random() * this.width];
//   });

//   var quadtree = d3.geom.quadtree()
//       .extent([[-1, -1], [this.width + 1, this.height + 1]])
//       (data);

//   var brush = d3.svg.brush()
//       .x(d3.scale.identity().domain([0, this.width]))
//       .y(d3.scale.identity().domain([0, this.height]))
//       .extent([[100, 100], [200, 200]])
//       .on("brush", this.brushed);

//   var svg = this.svg

//   svg.selectAll(".node")
//       .data(this.nodes(quadtree))
//     .enter().append("rect")
//       .attr("class", "node")
//       .attr("x", function(d) { return d.x; })
//       .attr("y", function(d) { return d.y; })
//       .attr("width", function(d) { return d.width; })
//       .attr("height", function(d) { return d.height; });

//   var point = svg.selectAll(".point")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "point")
//       .attr("cx", function(d) { return d[0]; })
//       .attr("cy", function(d) { return d[1]; })
//       .attr("r", 4);

//   svg.append("g")
//       .attr("class", "brush")
//       .call(brush);

//   brushed();

// }


// ScatterVis.prototype.brushed = function() {
//   var extent = brush.extent();
//   point.each(function(d) { d.scanned = d.selected = false; });
//   search(quadtree, extent[0][0], extent[0][1], extent[1][0], extent[1][1]);
//   point.classed("scanned", function(d) { return d.scanned; });
//   point.classed("selected", function(d) { return d.selected; });
// }

// // Collapse the quadtree into an array of rectangles.
// ScatterVis.prototype.nodes = function(quadtree) {
//   var nodes = [];
//   quadtree.visit(function(node, x1, y1, x2, y2) {
//     nodes.push({x: x1, y: y1, width: x2 - x1, height: y2 - y1});
//   });
//   return nodes;
// }

// // Find the nodes within the specified rectangle.
// ScatterVis.prototype.search = function(quadtree, x0, y0, x3, y3) {
//   quadtree.visit(function(node, x1, y1, x2, y2) {
//     var p = node.point;
//     if (p) {
//       p.scanned = true;
//       p.selected = (p[0] >= x0) && (p[0] < x3) && (p[1] >= y0) && (p[1] < y3);
//     }
//     return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
//   });
// }














