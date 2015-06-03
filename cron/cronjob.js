var secret = require('../config/panda-config.js');
var yelp = require('./yelp.js');
var gPlaces = require('./googlePlaces.js');
var instagram = require('./inst.js');
var twitter = require('./twitter.js');
var app = require('../server.js')



      // This method checks if all the data is filled out. It's called at
      // the end of every callback.
    var checkIfAllApisHaveResponded = function(apiData) {

      // A piece of api data hasn't come back yet, so return.
      if((apiData.yelpData === undefined)    || (apiData.instagramData === undefined) || 
         (apiData.twitterData === undefined) || (apiData.googlePlacesData === undefined)) {
          return;};

      // All the data has come through! Calculate the score,
      var finalScore = secret.algorithm(apiData);

      // Parse the api data 
      var finalData = {
        name: apiData.yelpData.name,
        yelpUrl: undefined,
        instagramPictureUrl: apiData.instagramData.bestPicture,
        score: finalScore,
        address: apiData.yelpData.address,
        latitude: apiData.yelpData.latitude,
        longitude: apiData.yelpData.longitude
        //more?
      }
      // instead of contacting database something should happen here
      // like display restaurant scores
    }

    // Fetches all restaurants from yelp.
      // For now, just use testGetTenRestaurants
    yelp.getAllRestaurantData(function(allRestaurants){
      console.log('getting restaurants from yelp')
      
      // For each restaurant,
      allRestaurants.forEach(function(thisRestaurant){
        //Make a new data variable
        var thisRestaurantApiData = { yelpData: thisRestaurant };
        // Send off several api calls, each with a callback 
          // checking if the data has been completely filled out.
          // When it has, it sends it to config.js

        twitter.getApiData(thisRestaurant, function(returnedData) {
          thisRestaurantApiData.twitterData = returnedData;
          checkIfAllApisHaveResponded(thisRestaurantApiData);
        });

        gPlaces.getApiData(thisRestaurant, function(returnedData) {
          thisRestaurantApiData.googlePlacesData = returnedData;
          checkIfAllApisHaveResponded(thisRestaurantApiData);
        });

        instagram.getApiData(thisRestaurant.name, thisRestaurant.latitude , function(returnedData) {
         //console.log(returnedData);
          thisRestaurantApiData.instagramData = returnedData;
          checkIfAllApisHaveResponded(thisRestaurantApiData);
        });
      });
    });
    


