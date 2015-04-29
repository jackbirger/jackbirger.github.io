heatmapVis = function(_parentElement, _metaData, _stopList, _heatData){
    this.parentElement = _parentElement;
    this.metaData = _metaData;
    this.stop_list = _stopList;
    this.heatData = _heatData;

    this.svg = d3.select(this.parentElement).append("svg")
        .attr("width", 300)
        .attr("height", 650)
        .attr('id', 'svg-heatmap')
       .append('g')
        .attr('id', 'heat-text');

    this.update();
}

heatmapVis.prototype.update = function(){

    that = this;

	// get fresh data	
	this.wrangleData();

	// create an ordinal scale for the station names
    var yScale = d3.scale.ordinal().rangeRoundBands([0, this.ordered_stations.length*15], .8, 0);
	yScale.domain(this.ordered_stations.map(function(d) { return d.name; }));

	// draw text labels //
	// 
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
    bar.text(function (d) { return d.name + ' (' + d.count + ')'; });

    // exit
    bar.exit().remove(); 


    // draw circles in the color of the line the station is on
    //
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

    // draw a rect to the right of each 
    var rank_rect = g.selectAll(".rank-rect")
        .data(this.ordered_stations); 
        
    rank_rect.enter().append('g').attr('class','dist-map').append('rect')
    			.attr('class', 'rank-rect')
                .attr('width', 60)
                .attr('height', 10)
                .attr('x', 200)
                .attr('y', function(d) { return yScale(d.name); });  

    rank_rect.exit().remove(); 
    
    // create a linear scale for distance 
    dScale = d3.scale.linear().range([0,60]).domain([0,800]);
    //console.log(that.heatData);
    distmaps = d3.selectAll('.dist-map').each( function(d,i){
        //onsole.log(distmaps);
        for (z=0; z<that.heatData.length; z++){

            if (that.heatData[z].stop_id == d.id) {

                distance = that.heatData[z]['distance'];
                distance.forEach(function(item){
                    // add a rect to the current g with an x of dScale
                    d.append('rect')
                        .attr('class', 'dist-rect')
                        .attr('width', 2)
                        .attr('height', 10)
                        .attr('x', function(d) { return 110; })
                        .attr('y', 0);
                });
                break;
            }
        }
    });
    // draw a rect for each to show distance 
    // var distance_rect = g.selectAll(".dist-rect")
    //     .data(this.ordered_stations); 
    
    // distance_rect.enter().append('rect')
    //             .attr('class', 'dist-rect')
    //             .attr('width', 2)
    //             .attr('height', 10)
    //             .attr('x', function(d) { return 170 + 10; })
    //             .attr('y', function(d) { return yScale(d.name); });  

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
					selected_stations.push({id: stop.id, name: stop.name, line: stop.line[0], count: stop["count"]} );
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

	// sort the stations by count
	ordered_stations = selected_stations.sort(compare);

	// slice out stations that fall after 45 on list
	if (ordered_stations.length > 45) {
		this.ordered_stations = ordered_stations.slice(0,44);
	}
	else {
		this.ordered_stations = ordered_stations;
	}

}
