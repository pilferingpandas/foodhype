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

 //console.log('google places search for '+ currentBizName);

 places.search({keyword: currentBizName, location: loc, radius: '1'}, function(err, response) {
   if(err) { console.log(err); return; }
   //console.log("search: ", response.results);

   if (response.results.length > 0) {
     // get details for the first found restaurant
     places.details({reference: response.results[0].reference}, function(err, response) {
       if(err) { console.log(err); return; }
       //console.log("search details: ", response.result.website);
       //console.log('searching for ' + currentBizName + ' found ' + response.result.name);
       if(currentBizName == response.result.name) {
         //console.log('found it');
         callback({
           name: response.result.name,
           googlePlacesNumReviews: response.result.user_ratings_total,
           googlePlacesAvgRating: response.result.rating
         });
       } else {
         console.log('didnt find it in google places');
         callback(null);
       }
     });
   }

 });
}
