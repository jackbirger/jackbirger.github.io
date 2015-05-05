# Food by MBTA

A Final Project for CS171. Spring Term 2015.


### Folder Structure

- __code__

	* __css__     : Stylesheets and glyphs for Chosen.js
	* __images__  : contains the Yelp attribution gif
	* __js__      : All of our JS objects reside here. Also, some includes such as D3 and Chosen.js
	* __scripts__ : Contains our utility scripts for working with the Yelp API and transforming data

- __data__
	
	* __data-3km-scatterplot.json__ : data file for the scatterplot graphic containing data points within a 3km radius of each MBTA train stop with no duplicates
	* __data-500m.json__ : data file for the MBTA graphic containing data points within a 500m radius of each MBTA stop with duplicates (because some restaurants can be within 500m of more than one stop, especially downtown)
	* __data-500m-heatmap.json__ : data file for the MBTA heatmap graphic containing Yelp ranking data for each category per stop
	* __mbta_metadata.json__ : data file containing information about each MBTA train stop

	```javascript

    {
    	"stop_id":101,
    	 "stop_count": 1,
    	 "stop_reviews": 1,
    	 "station":"Alewife Station",
    	 "line":["red"],
    	 "x":640,
    	 "y": 196, "ll":[42.395781, -71.142059]
    },
	```

- __design__