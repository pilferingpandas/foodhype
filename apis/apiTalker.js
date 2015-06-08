var secret = require('../config/panda-config.js');
var yelp = require('./yelp.js');
var gPlaces = require('./googlePlaces.js');
var instagram = require('./inst.js');
var twitter = require('./twitter.js');
var app = require('../server.js')



  // This method checks if all the data is filled out. It's called at
  // the end of every callback.
var checkIfAllApisHaveResponded = function(apiData, callback) {

  console.log(Object.keys(apiData));

  // A piece of api data hasn't come back yet, so return.
  if((apiData.yelpData === undefined)    || (apiData.instagramData === undefined) || 
     // (apiData.twitterData === undefined) || (apiData.googlePlacesData === undefined)) {
     (apiData.twitterData === undefined) ) {
      return;};

  // All the data has come through! Calculate the score,
  var finalScore = secret.algorithm(apiData);

  // Parse the api data 
  var finalData = {
    name: apiData.yelpData.name,
    yelpUrl: apiData.yelpData.yelpUrl,
    twitterUrl: apiData.twitterData.twitterUrl,
    instagramPictureUrl: apiData.instagramData.instagramPictureUrl,
    instagramUrl: apiData.instagramData.urlInstagramProfile,
    gPlacesUrl: null,
    score: finalScore,
    address: apiData.yelpData.address,
    latitude: apiData.yelpData.latitude,
    longitude: apiData.yelpData.longitude
    //more?
  }
  callback(finalData);
}

module.exports = {
  // Fetches all restaurants from yelp.
    // For now, just use testGetTenRestaurants
  contactOtherApis : function(thisRestaurant, callback){
    
    // For each restaurant,
    // allRestaurants.forEach(function(thisRestaurant){


    //Make a new data variable
    var thisRestaurantApiData = { yelpData: thisRestaurant };
    console.log(thisRestaurantApiData);
    // Send off several api calls, each with a callback 
      // checking if the data has been completely filled out.
      // When it has, it sends it to config.js

    twitter.getApiData(thisRestaurant, function(returnedData) {
      thisRestaurantApiData.twitterData = returnedData;
      checkIfAllApisHaveResponded(thisRestaurantApiData, callback);
    });

    // gPlaces.getApiData(thisRestaurant, function(returnedData) {
    //   thisRestaurantApiData.googlePlacesData = returnedData;
    //   checkIfAllApisHaveResponded(thisRestaurantApiData, callback);
    // });

    instagram.getApiData(thisRestaurant.name, thisRestaurant.latitude , function(returnedData) {
      thisRestaurantApiData.instagramData = returnedData;
      checkIfAllApisHaveResponded(thisRestaurantApiData, callback);
    });
    // });
  }
}
