ZoomStat = function(_parentElement, _data, _metaData){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 50, bottom: 100, left: 0, padding:10},
	this.width = 350 - this.margin.left - this.margin.right,
	this.height = 400 - this.margin.top - this.margin.bottom;


	//Initialize the scatter plot visualization
	this.initVis();

	//Make circle pack for all the data to start
	this.plotData = this.data
	this.wrangleData();
	this.makeCirclePack();
}

/**
 * Method that sets up the SVG and the variables
 */
ZoomStat.prototype.initVis = function(){

	var that = this;

	//define svg
	this.svg = d3.select('#zoomStats').append("svg")
		.attr("width", 150)
		.attr("height", this.height + this.margin.top + this.margin.bottom)
	  .append("g")
	  	.attr("id", "zoom-legend")
		.attr("transform", "translate(" + this.margin.left+ "," + this.margin.top + ")");

	this.diameter = 330
	this.format = d3.format(",d");

	this.pack = d3.layout.pack()
	    .size([this.diameter - 4, this.diameter - 4])
	    .value(function(d) { return d.size; });

	var test = d3.select('#circleStats').append("svg");

	this.packing_svg = test
	    .attr("width", this.diameter)
	    .attr("height", this.diameter)
	  .append("g")
	    .attr("transform", "translate(2,2)");

}


ZoomStat.prototype.wrangleData = function(){
	//Wrangle data to find statistics based on the selected extents
	var stats = {count:0, review:0}; // Number of restaurants in the zoomed region
	var all_categories = [];	     // Total list of categories contained in zoomed region
	var all_cat_stats = [];		     // List of restaurant categories and correlating number of restaurants
								     // in each categry in zoomed region
	var topCat = [];	             // Top 5 categories in zoomed region

	this.plotData.forEach(function(d){
		stats["count"]++;
		stats["review"] += d.review_count;
		d.categories.forEach(function(cat){

			if( cat != "American"){	//Remove category American because it double encodes and skews the results inaccurately
				if(all_categories.indexOf(cat) < 0){
						all_categories.push(cat)
						var temp = {'cat': cat, count:1} // This line was throwing an error so i changed it. needs to be revisited
						all_cat_stats.push(temp)
					} else {all_cat_stats[all_categories.indexOf(cat)].count++}

			}

		})	

	})

	//Sort all_cat_stats
	all_cat_stats.sort(function(a,b){
		if(a.count>b.count){
			return -1;
		}
		if(a.count < b.count){
			return 1;
		}
		return 0
	})

	//Populate topCat with a list of the top 5 categories
	if(all_cat_stats.length >= 10){	
		for (i = 0; i < 10; i++) {
	    	topCat[i] = {name: all_cat_stats[i].cat, size: all_cat_stats[i].count}
		}
	} else{
		for (i = 0; i < all_cat_stats.length; i++) {
	    	topCat[i] = {name: all_cat_stats[i].cat, size: all_cat_stats[i].count}
		}
	}


	this.packingData = {"name": "circlepacking", "children":topCat}

    d3.select('#zoom-restaurants').text(stats.count);
    d3.select('#zoom-totalReviews').text(stats.review);

}


ZoomStat.prototype.onSelectionChange = function (plotData, plotStops){

	var that = this

	this.plotData = plotData;		//List of restaurants contained in the extents
	this.plotStops = plotStops;		//List of Stops contianed in the extents


	//If the Train Stops button is selected, call function to display trainstop legend
  d3.selectAll("input").each(function(d) { 
    if (d3.select(this).attr("type") == "radio" && d3.select(this).attr("name") == "stops" && d3.select(this).node().checked) {
			that.makeLegendStops();  	
    }
  });


	//wrangle stops data to find basic stats of zoom region
	this.wrangleData()

	//Create Circle Packing view based on the zoom extents region
  this.makeCirclePack()

}

//Function to create circle packing layout
//Circle packing code based on mbostock (http://bl.ocks.org/mbostock/4063530)
ZoomStat.prototype.makeCirclePack = function (){

  var that = this

    var nodeStringLenth = d3.selectAll("g.node").toString().length; 
    if ( nodeStringLenth > 0) {
        d3.selectAll("g.node")
            .remove();
    }

  var node = this.packing_svg.datum(this.packingData).selectAll(".node")
      .data(this.pack.nodes)

	var node_enter = node.enter().append("g")
	  .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node_enter.append("title")
      .text(function(d) { return d.name + (d.children ? "" : ": " + that.format(d.size)); });


  node_enter.append("circle").attr("class", "packing-circle")
      .attr("r", function(d) { return d.r; })


  node_enter.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .attr('class', 'packing-text')
      .text(function(d) { return d.name.substring(0, d.r / 3); })


d3.select(self.frameElement).style("height", this.diameter + "px");


}


//Function to create the list of stops that are within the zoomed extents
ZoomStat.prototype.makeLegendStops = function (){

	var that = this;

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
	                .attr("x", 10)
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
	            .attr('cx', 4)
	            .attr('cy', function(d) { return yScale(d.station) + 6; })               
	            .attr('r', 3);

	//assign attributes to the circles
	circle.attr('stroke', function(d) { return d.line[0]; })
	    .attr('fill', function(d) { return d.line[0]; });

	//Remove extra elements
	circle.exit().remove()

}