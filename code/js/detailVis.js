// '''
// add useful comments here

// '''
DetailVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
}

DetailVis.prototype.update = function(stop_id, category, radius){
	var station;

	for (i=0;i<this.metaData.length; i++) {
		if (this.metaData[i]['stop_id'] == stop_id) {
			station = this.metaData[i]['station'];
			console.log(station);
			break;
		}
	}
	$('#detailVis').html('<div class="location-name">' + station + '</div><div class="restaurants"></div>');

	displayData = this.wrangleData(stop_id, category, radius, station);
	console.log("Display Data", displayData)

	this.displayCirclePacking(displayData, stop_id, category, radius, station);
}


//Wrangle the data for the circle packing function
DetailVis.prototype.wrangleData = function(stop_id, category, radius, station) {

	
	this.category_list = category_list
	var that = this;

	this.stopData =[]

	//Store an array of the restaurants for the selected stop
	for (i=0;i<this.data.length; i++) {
		if (this.data[i]['stop_id'] == stop_id) {
			this.stopData.push(this.data[i])
		} 
	}

	console.log(this.stopData)	//array of restaurants for the given stop


	//initialize second level
	this.category_level = []
	category_list.forEach(function(cat){
		 that.temp = {
			"name": cat,				//The name of the category
			"children": []				//Array holding object with restaurant "name" and the "size" (rating)
		}

		that.category_level.push(that.temp)
	})


	//initialize first level
	this.nested_data = {
		"name": 0,						//The ID of the selected Train Stop
		"children":this.category_level		//Array hoolding object of categories & children
		
	}

	//Populate category level with the correct restaurants
	this.stopData.forEach(function(restaurant){

		restaurant.categories.forEach(function(cat){
			that.category_level.forEach(function(nestCat){
				if(cat == nestCat["name"]){
					nestCat["children"].push({"name":restaurant.name, "size":restaurant.rating});	
				}
			})

		})

	})

	this.nested_data["name"] = station

	//console.log("nester array", this.nested_data)

	return this.nested_data

}


//Create Circle Packing layout
DetailVis.prototype.displayCirclePacking = function(displayData, stop_id, category, radius, station){

/////////////////////////////////////////////////
//Based on http://bl.ocks.org/mbostock/4063530
////////////////////////////////////////////////
var diameter = 1000,
    format = d3.format(",d");

var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.size; });

var svg = d3.select("#circle-packing")
  .append("g")
    .attr("transform", "translate(2,2)");


var node = svg.datum(displayData).selectAll(".node")
  .data(pack.nodes)
.enter().append("g")
  .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

node.append("title")
  .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

node.append("circle")
  .attr("r", function(d) { return d.r; });

node.filter(function(d) { return !d.children; }).append("text")
  .attr("dy", ".3em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.name.substring(0, d.r / 3); });


//d3.select(self.frameElement).style("height", diameter + "px");







}



//style="background-color: lightblue"



