heatmapVis = function(_parentElement, _data, _metaData, _stopList){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.stop_list = _stopList;

    this.svg = d3.select(this.parentElement).append("svg")
        .attr("width", 300)
        .attr("height", 620)
        .attr('id', 'svg-heatmap')
       .append('g')
        .attr('id', 'heat-text');

    this.update();
}

heatmapVis.prototype.update = function(){

	// get fresh data	
	this.wrangleData();

	// create an ordinal scale for the station names
    var yScale = d3.scale.ordinal().rangeRoundBands([0, this.ordered_stations.length*15], .8, 0);
	yScale.domain(this.ordered_stations.map(function(d) { return d.name; }));

	// select and join
    var g = d3.select('#heat-text');
    var bar = g.selectAll(".station-name")
        .data(this.ordered_stations);

    // enter
    bar.enter().append('text')
    			.attr("class", "station-name")
                .attr("x", 10)
                .attr("y", function(d) { return yScale(d.name) + 9; })
                .attr("font-size", "10px")
                .attr("font-family", "sans-serif")

    // update
    bar.text(function (d) { return d.name; });

    // exit
    bar.exit().remove(); 

    // do the same for the circles
    var circ = g.selectAll(".line-circle")
        .data(this.ordered_stations);

    circ.enter().append('circle')
    			.attr('class', 'line-circle')
                .attr('cx', 4)
                .attr('cy', function(d) { return yScale(d.name) + 6; })               
                .attr('r', 3);
                
    circ.attr('stroke', function(d) { return d.line; })
        .attr('fill', function(d) { return d.line; });

    circ.exit().remove();
}

heatmapVis.prototype.wrangleData = function() {

	//Check for the category that will be displayed
	var f = document.getElementById("mySelectCat");
	encode_category = f.options[f.selectedIndex].value;
    selected_stations = [];  // all of the individual data to determine max and min

	this.metaData.forEach(function(d) {

	    tot_r = 0; // total number of restaurants to display in the legend

		this.stop_list.forEach(function(stop){
			if (stop.id == d.stop_id){
				if (encode_category == "all_cat" ){
					tot_r  += stop["count"];  
					selected_stations.push({id: stop.id, name: stop.name, line: stop.line[0], count: cnt} );
				} 
				else if (encode_category == encode_category){
					var cnt = stop.category_count[encode_category];
					tot_r   += cnt; 
					if (cnt>0) {
						selected_stations.push({id: stop.id, name: stop.name, line: stop.line[0], count: cnt} );
					}				  
				} 
			}
		});

	});

	function compare(a,b) {
		if (a.count < b.count)
			return 1;
		if (a.count > b.count)
			return -1;
		return 0;
	}

	this.ordered_stations = selected_stations.sort(compare);
}
