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

	displayData = wrangleData(stop_id, category, radius);
}

// DetailVis.prototype.wrangleData = function(stop_id, category, radius) {
// 	for (i=0;i<this.data.length; i++) {
// 		if (this.data[i]['stop_id'] == stop_id) {
// 			// do stuff
// 		} 
// }

