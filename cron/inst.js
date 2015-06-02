var keys = require('../config/panda-config.js');
var express = require('express');
var app = require('../server.js')
var instagram = require('instagram-node-lib');
var yelp = require('./yelp.js');
instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);



var restaurants = yelp.testGetTenRestaurants(function(restaurantsFromYelp){
 console.log(restaurantsFromYelp[0].name)

 for (var i=0; i<restaurantsFromYelp.length; i++){
    // check instagram for every restaurant (provide name + coordinates)
    // console.log(restaurants[i].name);
    var resName = restaurantsFromYelp[i].name;
    // escape single quotes in the name
    resName = resName.replace(/'/g, "");
    // join words into one string
    resName = resName.replace(/ /g, "");
    resName = resName.toLowerCase();
    var latitude = Math.ceil(restaurantsFromYelp[i].latitude);
    var count;
    var url;
   // console.log('instagram search for', resName)
   instagram.tags.recent({ name: resName, 
     complete: function(data){
      count=0;
    // iterate through the data array and check if coordinates are the same as yelp cors
    for ( var i=0 ; i<data.length; i++){
      
      if (data[i].location){
        if (Math.ceil(data[i].location.latitude) === latitude){
          //console.log('found');
          if (count === 0){
            url = data[i].link;
          }
          count++;
        } else {
          //console.log(data[i].location)
        }
      }
    }
    console.log('found ',count, 'restaurants ', url);
    // return count, url;
  }
});
   
 }

});



// Fill me out!
module.exports = {
  getApiData : function(thisYelpData, callback) {
    // Contact the API with thisYelpData, then...

    callback(dataReturnedFromApi);
  }
}

// format: 
// dataReturnedFromApi.numPics
//   ^ number of pictures
// dataReturnedFromApi.bestPicture
//   ^ url of whatever the best picture is
// dataReturnedFromApi.url
//   ^ url of instagram results (is this possible?)
