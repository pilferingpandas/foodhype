var keys = require('../config/panda-config.js');
var GooglePlaces = require('google-places');
var places = new GooglePlaces(keys.googleMap.map);

module.exports = {
  getApiData : function(thisRestaurant, callback ){
    var loc = [thisRestaurant.latitude, thisRestaurant.longitude];
    getGooglePlacesInfo(thisRestaurant.name, loc, callback);
  }
}

var getGooglePlacesInfo = function(currentBizName, loc, callback) {

  console.log('inside google places');
  places.search({keyword: currentBizName, location: loc, radius: '1'}, function(err, response) {
    console.log('there was a response');
    if(err) { console.log('google places error'); console.log(err); return; }
    console.log(response);
    if (response.results.length > 0) {
      // Get details for the first found restaurant
      console.log('found a result');
      places.details({reference: response.results[0].reference}, function(err, response) {
        if(err) { console.log(err); return; }
        console.log('found a business:' + response.result.name);
        if(currentBizName == response.result.name) {
          callback({
            name: response.result.name,
            googlePlacesUrl: response.result.url,
            googlePlacesNumReviews: response.result.user_ratings_total,
            googlePlacesAvgRating: response.result.rating
          });
        } else {
          console.log('didnt find it in google places');
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
