var keys = require('../config/panda-config.js');
var instagram = require('instagram-node-lib');
var yelp = require('./yelp.js');
instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

// data coming from cronjob.js consisting of one restaurant object retrieved from yelp
module.exports = {
  getApiData : function(restaurantName, latitude, callback) {

    var latitudeFromYelp = Math.ceil(latitude);
    // processing of the name in preparation for calling instagram
    resName = restaurantName.replace(/'/g, "");
    resName = resName.replace(/&/g, "and")
    // join words into one string
    resName = resName.replace(/ /g, "").toLowerCase();
    // call instagram
    instagram.tags.recent({ name: resName, 
      complete: function(data){
        var count = 0; 
        var url = null;
        // console.log(data)
        var urlInstgramProfile = null;
        // iterate through the data array returned from instagram and check if coordinates are the same as yelp cors
        for ( var i=0 ; i<data.length; i++){
              if (data[i].location){
                    if (Math.ceil(data[i].location.latitude) === latitudeFromYelp){
                          //console.log('found');
                          if (count === 0){
                            // return instagram profile page
                            urlInstgramProfile = data[i].link;
                            // url = data[i].images.standard_resolution.url
                            // ur for thumbnail
                            url = data[i].images.thumbnail.url
                          }
                          count++;
                        }
              }
        }
        var dataFromInstagram = {
          numPics : count,
          url : url,
          urlInstgramProfile: urlInstgramProfile
        }
        //console.log(dataFromInstagram)
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
