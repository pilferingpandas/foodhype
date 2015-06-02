//put yelp data here

// Fill me out!
module.exports = {
  getAllRestaurantData : function(callback) {
    // Contact yelp api, get all restaurants in san francisco, then call a callback with them
    
    // callback(allRestaurants);
  },
  testGetTenRestaurants : function(callback) {
    //from server.js

  var yelp = require("yelp").createClient(keys.yelp);

  var returnNum = 10;
  var allBizs;


  // search san francisco for all food restaurants
  yelp.search({term: "food", Location: "San Francisco", limit: returnNum}, function(error, data) {
    if (!error) {

      allBizs = [];

      var biz = data.businesses;


      for (var i = 0; i < biz.length; i++) {
        // once we have a list of restaurants we want to make yelp api requests for each restaurant individually to get more info
        yelp.business( biz[i].id, function(error, business) {

          allBizs.push({
            name: business.name,
            id: business.id,
            address: business.location.address,
            reviewCount: business.review_count,
            rating: business.rating,
            url: business.url,
            longitude : business.location.coordinate.longitude,
            latitude : business.location.coordinate.latitude
          });
          if (allBizs.length === biz.length) {
            callback(allBizs);
          }
        });
      }
    } else {
      console.log('error!');
    }
  });
}
