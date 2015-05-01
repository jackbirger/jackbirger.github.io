	
mbtaVis = function(_parentElement, _data, _metaData, _stopList){
    this.parentElement  = _parentElement;
    this.data           = _data;
    this.metaData       = _metaData;
    this.stop_list      = _stopList;
	this.radius_scale   = d3.scale.linear().range([7,75]);
	this.review_scale   = d3.scale.linear().range([7,75]);
	var encode_category ='all_cat'; // set this to all categories to start

	// create a tooltip for each node
	tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) { return d.station + "<div class='tip-details'>Restaurants: " + d.stop_count + "<br/>Reviews: " + d.stop_reviews + "</div>" });
	var svg = d3.select('#mbta_svg');
	svg.call(tip); 

	// draw the initial circles
	metaData.forEach(function(stop){

	 d3.select("#cat-circles").append('circle')
	    .attr("cx", stop['x'])
	    .attr("cy", stop['y'])
	    .attr("r", 10)
	    .attr("class", "mbta-circle")
	    .attr("id", stop["station"])
	    .datum(stop);	

	 d3.select("#review-circles").append('circle')
	    .attr("cx", stop['x'])
	    .attr("cy", stop['y'])
	    .attr("r", 5)
	    .attr("class", "review-circle")
	    .attr("id", stop["station"])
	    .datum(stop)
	    .on('mouseover', tip.show )
	    .on('mouseout', tip.hide)	      
	 })

    this.update();
 }


mbtaVis.prototype.update = function(){
	stop_list = this.stop_list;
	radius_scale = this.radius_scale;
	review_scale = this.review_scale;

	//Check for the category that will be displayed
	var f = document.getElementById("mySelectCat");
	encode_category = f.options[f.selectedIndex].value;
	// console.log(encode_category)

	//Find the domain for the given selection
	if(encode_category == "all_cat" ){
		radius_scale.domain([0, d3.max(stop_list, function(d){ return d.count })]);
		review_scale.domain([0, d3.max(stop_list, function(d){ return d.review_count })]);
	} 
	else {
		radius_scale.domain(d3.extent(stop_list, function(d){ return d.category_count[encode_category] }));   
		review_scale.domain(d3.extent(stop_list, function(d){ return d.category_review_count[encode_category] }));  
	} 


	/*
		Change circle size to reflect total number of restaurants
		for the given type selected (or all if default selection)
	*/

    tot_r = 0; // total number of restaurants to display in the legend
    tot_a = [];  // all of the individual data to determine max and min

    d3.selectAll('.mbta-circle').transition().duration(500).attr("r", function(d){

      var plot_r; //value of plotted radius
      var cnt;

      stop_list.forEach(function(stop){

      	if (stop.id == d.stop_id){

			if (encode_category == "all_cat" ){
				cnt = stop["count"]
				plot_r = cnt ? radius_scale(cnt) : 0;

				tot_r  += cnt;  
				tot_a.push(cnt);
			} 
			else if (encode_category == encode_category){
				cnt = stop.category_count[encode_category];
				plot_r  = cnt ? radius_scale(cnt) : 0;
				tot_r   += cnt; 
				if (cnt>0) {
					tot_a.push(cnt);
				}				  
			} 
			d.stop_count = cnt;
        }

      })

      //console.log(d);
      return plot_r;

    })


    // update the legend

    var max = Math.max.apply(Math, tot_a);
    d3.select('#total-restaurants').text(tot_r);
    d3.select('#total-max').text(max);


	/*
		Change circle size to reflect total number of restaurants
		for the given type selected (or all if default selection)
	*/


    rev_r = 0; // total number of restaurants to display in the legend
    rev_a = [];  // all of the individual data to determine max and min

    d3.selectAll('.review-circle')
    			.transition()
    			.duration(500)   			
    			.attr("r", function(d){

      var plot_r; //value of plotted radius
      var review_count;

      stop_list.forEach(function(stop){

      	if (stop.id == d.stop_id){

			if (encode_category == "all_cat" ){
				cnt = stop["count"];
				plot_r = cnt ? review_scale(stop["review_count"]) : 0;

				rev_r  += stop["review_count"];  
				rev_a.push(stop["review_count"]);
				review_count = stop["review_count"];
			} 
			else if (encode_category == encode_category){
				cnt = stop.category_review_count[encode_category];
				plot_r  = cnt ? review_scale(cnt) : 0;
				rev_r   += cnt; 
				if (cnt>0) {
					rev_a.push(cnt);
				}	
				review_count = cnt;			  
			} 
			d.stop_reviews = review_count;
        }

      })

      return plot_r;

    });
 

    // update the legend

    var max = Math.max.apply(Math, rev_a);
    d3.select('#reviews-total').text(rev_r);
    d3.select('#reviews-max').text(max);




}


























