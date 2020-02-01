var keys = require('../config/panda-config.js');
var GooglePlaces = require('google-places');
var places = new GooglePlaces(keys.googleMap.map);
console.log({ places, a: keys.googleMap.map })
module.exports = {
  getApiData : function(thisRestaurant, callback ){
    var loc = [thisRestaurant.latitude, thisRestaurant.longitude];
    getGooglePlacesInfo(thisRestaurant.name, loc, callback);
  }
}

var getGooglePlacesInfo = function(currentBizName, loc, callback) {

  places.search({keyword: currentBizName, location: loc, radius: '1'}, function(err, response) {
    if(err) { console.log('google places error'); console.log(err); return; }
    if (response.results.length > 0) {
      // Get details for the first found restaurant
      places.details({reference: response.results[0].reference}, function(err, response) {
        if(err) { console.log(err); return; }
        if(currentBizName == response.name) {
          callback({
            name: response.name,
            googlePlacesUrl: response.url,
            googlePlacesNumReviews: response.user_ratings_total,
            googlePlacesAvgRating: response.rating
          });
        } else {
          callback({
            name: null,
            googlePlacesUrl: null,
            googlePlacesNumReviews: null,
            googlePlacesAvgRating: null
          });
        }
      });
    }
  });
}
