
mbtaVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;

    this.initVis();
}

//Initialize circles using metadata
mbtaVis.prototype.initVis = function() {

  var stop_list = [];  //Aggregate data list
  var radius_scale = d3.scale.linear().range([0,60]);
  var circles = d3.selectAll('circle')
  var encode_category='all_cat'; // set this to all categories to start

  dv = new DetailVis('#detailVis', allData, metaData);

  metaData.forEach(function(stop){

     d3.select("#circles").append('circle')
        .attr("cx", stop['x'])
        .attr("cy", stop['y'])
        .attr("r", 10)
        .attr("class", function(){
           if(stop.line.length == 1){
              return stop.line[0];
           } else{
              return stop.line[0] + ' ' + stop.line[1]
           }
        })
        .attr("id", stop["station"])
        .datum(stop);
        

  })

  //Call function to calculate totals
  aggregateTotals()
  }

    //Aggregate the values for count and average ratings
   var aggregateTotals = function(){


     //create blank array of objects containing agregate information for each t-stop
      stop_list = metaData.map(function(d){

        var initialized_cat_count = {}
        var initialized_cat_rating = {}
        var initialized_cat_review = {}

        category_list.forEach(function(category){
          initialized_cat_count[category] = 0
          initialized_cat_rating[category] = 0
          initialized_cat_review[category] = 0
        })

      temp = {  id: d.stop_id,
                line: d.line,
                count:0,
                rating_average:0,
                review_count:0,
                category_count: initialized_cat_count,
                category_avg_rating: initialized_cat_rating,
                category_review_count: initialized_cat_review
             }  

      return temp   

     })


    //////////////////


      //loop through every restaurant and calculate the total numbers per stop
      allData.forEach(function(restaurant){
        stop_list.forEach(function(stop){

          if(restaurant.stop_id == stop.id){
            stop.count += 1;  //total count
            stop.rating_average += restaurant.rating  //total ratings
            stop.review_count += restaurant.review_count

            restaurant.categories.forEach(function(cat){
              if(category_list.indexOf(cat) >= 0){
                  stop.category_count[cat] += 1;
                  stop.category_avg_rating[cat] += restaurant.rating
                  stop.category_review_count[cat] += restaurant.review_count              
              }
            })

          }

        })
      })


      //divide by number of restaurants in the given stop to create averages when necessary
      stop_list.forEach(function(stop){

        //find rating average of total count
        stop.rating_average = stop.rating_average / stop.count;

        //find rating average of each category
        for(var key in stop.category_avg_rating){
          if(stop.category_avg_rating.hasOwnProperty(key)){
            if(!isNaN(stop.category_avg_rating[key] / stop.category_count[key])){ //Ensure no 0/0
              stop.category_avg_rating[key] = stop.category_avg_rating[key] / stop.category_count[key];              
            }
          }
        }        

      })

      console.log("stop list aggregate", stop_list)
  }



  //Function to control highlight of specific lines
  function line_display(){

   var e = document.getElementById("mySelectLine");
   var select_line = e.options[e.selectedIndex].value;

   d3.selectAll('circle').style("opacity", .5)

   var line = d3.selectAll('.' + select_line);

   line.style("opacity", 1);

  }


  //Update the scaling of the circles based on the user selections
  function update_vis(){

   //Check how stop will be encoded by (Count, Avg. Rating,Tot. Review)
   var e = document.getElementById("mySelectOption");
   var encode_stop_by = e.options[e.selectedIndex].value;
   console.log(encode_stop_by)

   //Check for the category that will be displayed
   var f = document.getElementById("mySelectCat");
   encode_category = f.options[f.selectedIndex].value;
   console.log(encode_category)

   //Find the domain for the given selection
   if(encode_stop_by == "count" && encode_category == "all_cat" ){
    radius_scale.domain([0, d3.max(stop_list, function(d){ return d.count })]) 
    plot = "count"
   } else if(encode_stop_by == "average_rating" && encode_category == "all_cat"){
    radius_scale.domain(d3.extent(stop_list, function(d){ return d.rating_average}))
    plot = "rating_average"
   } else if(encode_stop_by == "total_reviews" && encode_category == "all_cat"){
    radius_scale.domain(d3.extent(stop_list, function(d){ return d.review_count}))
    plot = "review_count"
   } else if(encode_stop_by == "count" && encode_category == encode_category){
    radius_scale.domain(d3.extent(stop_list, function(d){ return d.category_count[encode_category] }))    
   } else if(encode_stop_by == "average_rating" && encode_category == encode_category){
    radius_scale.domain(d3.extent(stop_list, function(d){ return d.category_avg_rating[encode_category] }))
   } else if(encode_stop_by == "total_reviews" && encode_category == encode_category){
    radius_scale.domain(d3.extent(stop_list, function(d){ return d.category_review_count[encode_category] }))
   } else {plot = "stop"}


    //Update the visualization
    d3.selectAll('circle').transition().duration(1000).attr("r", function(d){

      var plot_r; //value of plotted radius

      stop_list.forEach(function(stop){
       if(stop.id == d.stop_id){

         if(encode_stop_by == "count" && encode_category == "all_cat" ){
          plot_r = radius_scale(stop["count"])  
         } else if(encode_stop_by == "average_rating" && encode_category == "all_cat"){
          plot_r = radius_scale(stop["rating_average"])
          console.log(stop["rating_average"], plot_r)
         } else if(encode_stop_by == "total_reviews" && encode_category == "all_cat"){
          plot_r = radius_scale(stop["review_count"])
         } else if(encode_stop_by == "count" && encode_category == encode_category){
          plot_r = radius_scale(stop.category_count[encode_category])   
         } else if(encode_stop_by == "average_rating" && encode_category == encode_category){
          plot_r = radius_scale(stop.category_avg_rating[encode_category])   
         } else if(encode_stop_by == "total_reviews" && encode_category == encode_category){
          plot_r = radius_scale(stop.category_review_count[encode_category])   
         } else {plot_r = 10}
       }

      })

      return plot_r
    })
  }