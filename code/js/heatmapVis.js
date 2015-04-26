
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

	var valid_categories = [];

	this.stopData.forEach(function(restaurant){
		restaurant.categories.forEach(function(cat){
			if(valid_categories.indexOf(cat) < 0 && category_list.indexOf(cat) >= 0 ){
				valid_categories.push(cat)
			}
		})
	})

	console.log("valid categories", valid_categories)


	//initialize second level
	this.category_level = []
	valid_categories.forEach(function(cat){
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
					nestCat["children"].push({"name":restaurant.name, "size":restaurant.distance});	
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

this.displayData = displayData
/////////////////////////////////////////////////
//Based on http://bl.ocks.org/mbostock/4063530
//////////////////////////////////////////////
// this.diameter = 650,
//     format = d3.format(",d");

// this.pack = d3.layout.pack()
//     .size([this.diameter - 4, this.diameter - 4])
//     .value(function(d) { return d.size; });

// this.svg = d3.select("#packing")
//   .append("g")
//     .attr("transform", "translate(2,2)");


// this.node = this.svg.datum(this.displayData).selectAll(".node")
//   .data(this.pack.nodes)
// .enter().append("g")
//   .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
//   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

// this.node.append("title")
//   .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

// this.node.append("circle")
//   .attr("r", function(d) { return d.r; });

// this.node.filter(function(d) { return !d.children; }).append("text")
//   .attr("dy", ".3em")
//   .style("text-anchor", "middle")
//   .text(function(d) { return d.name.substring(0, d.r / 3); });


// d3.select(self.frameElement).style("height", this.diameter + "px");


////////////////////////
///////////////////////
///////////////////////



var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(this.displayData))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });


// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}


///////////////////////////////////
///////////////////////////////////
//////////////////////////////////

// var width = 960,
//     height = 700,
//     radius = Math.min(width, height) / 2;

// var x = d3.scale.linear()
//     .range([0, 2 * Math.PI]);

// var y = d3.scale.linear()
//     .range([0, radius]);

// var color = d3.scale.category20c();

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

// var partition = d3.layout.partition()
//     .value(function(d) { return d.size; });

// var arc = d3.svg.arc()
//     .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
//     .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
//     .innerRadius(function(d) { return Math.max(0, y(d.y)); })
//     .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

//   var g = svg.selectAll("g")
//       .data(partition.nodes(this.displayData))
//     .enter().append("g");

//   var path = g.append("path")
//     .attr("d", arc)
//     .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
//     .on("click", click);

//   var text = g.append("text")
//     .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
//     .attr("x", function(d) { return y(d.y); })
//     .attr("dx", "6") // margin
//     .attr("dy", ".35em") // vertical-align
//     .text(function(d) { return d.name; });

//   function click(d) {
//     // fade out all text elements
//     text.transition().attr("opacity", 0);

//     path.transition()
//       .duration(750)
//       .attrTween("d", arcTween(d))
//       .each("end", function(e, i) {
//           // check if the animated element's data e lies within the visible angle span given in d
//           if (e.x >= d.x && e.x < (d.x + d.dx)) {
//             // get a selection of the associated text element
//             var arcText = d3.select(this.parentNode).select("text");
//             // fade in the text element and recalculate positions
//             arcText.transition().duration(750)
//               .attr("opacity", 1)
//               .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
//               .attr("x", function(d) { return y(d.y); });
//           }
//       });
//   }


// d3.select(self.frameElement).style("height", height + "px");

// // Interpolate the scales!
// function arcTween(d) {
//   var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
//       yd = d3.interpolate(y.domain(), [d.y, 1]),
//       yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
//   return function(d, i) {
//     return i
//         ? function(t) { return arc(d); }
//         : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
//   };
// }

// function computeTextRotation(d) {
//   return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
// }

 }



//style="background-color: lightblue"



