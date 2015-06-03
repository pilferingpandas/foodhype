var keys = require('../config/panda-config.js');
var instagram = require('instagram-node-lib');
var yelp = require('./yelp.js');
instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

var restaurants = yelp.testGetTenRestaurants(function(restaurantsFromYelp){
     for (var i=0; i<restaurantsFromYelp.length; i++){
        var restaurantName = restaurantsFromYelp[i].name;
        // escape single quotes in the name
        
        var latitude = Math.ceil(restaurantsFromYelp[i].latitude);
        module.exports.getApiData(restaurantName, latitude, console.log)
      }
});


// Fill me out! 
module.exports = {
  getApiData : function(restaurantName, latitude, callback) {
    // Contact the API with thisYelpData, then...
    resName = restaurantName.replace(/'/g, "");
    // join words into one string
    resName = resName.replace(/ /g, "").toLowerCase();
    instagram.tags.recent({ name: resName, 
      complete: function(data){
        var count = 0; 
        var url = null;
        console.log('contacting instagram for', resName)
        
        // iterate through the data array and check if coordinates are the same as yelp cors
        for ( var i=0 ; i<data.length; i++){
              if (data[i].location){
                    if (Math.ceil(data[i].location.latitude) === latitude){
                          //console.log('found');
                          if (count === 0){
                            // url = data[i].link;// this would return instagram profile page
                            // url = data[i].images.standard_resolution.url
                            // for thumbnail
                            url = data[i].images.thumbnail.url
                          }
                          count++;
                    } else {
                      // the location does not match location of restaurant
                      //console.log(data[i].location)
                    }
              }
        }
        var dataFromInstagram = {
          numPics : count,
          url : url
        }
        callback(dataFromInstagram);
    }
    });
  }
}

// format: 
// dataReturnedFromApi.numPics
//   ^ number of pictures
// dataReturnedFromApi.bestPicture
//   ^ url of whatever the best picture is
// dataReturnedFromApi.url
//   ^ url of instagram results (is this possible?)
